// Cloudflare Pages Function - GitHub OAuth Callback
interface GitHubUser {
  login: string;
  email: string;
  name: string;
  avatar_url: string;
}

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return new Response('No token', { status: 401 });
    }

    // Get user
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'User-Agent': 'ASPFT',
      },
    });

    const user: GitHubUser = await userResponse.json();

    // Check whitelist
    const allowed = (env.ALLOWED_GITHUB_USERS || '').split(',').map((u: string) => u.trim().toLowerCase());
    if (!allowed.includes(user.login.toLowerCase())) {
      return new Response(`Access denied: ${user.login}`, { status: 403 });
    }

    // Create JWT
    const payload = {
      username: user.login,
      name: user.name || user.login,
      email: user.email || '',
      avatar: user.avatar_url,
      exp: Math.floor(Date.now() / 1000) + 86400,
    };

    const jwt = await createJWT(payload, env.JWT_SECRET);

    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${url.origin}/?authenticated=true`,
        'Set-Cookie': `aspft_session=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`,
      },
    });

  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

// Fixed JWT creation
async function createJWT(payload: any, secret: string): Promise<string> {
  const enc = new TextEncoder();
  
  // Base64URL encode
  const b64url = (data: Uint8Array) => {
    let str = '';
    data.forEach(byte => str += String.fromCharCode(byte));
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  };
  
  const header = b64url(enc.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const data = `${header}.${body}`;
  
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const signature = b64url(new Uint8Array(sig));
  
  return `${data}.${signature}`;
}
