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
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return new Response('Failed to get access token: ' + JSON.stringify(tokenData), { status: 401 });
    }

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/json',
      },
    });

    const user: GitHubUser = await userResponse.json();

    // Whitelist check
    const allowedUsers = (env.ALLOWED_GITHUB_USERS || '').split(',').map((u: string) => u.trim());
    if (!allowedUsers.includes(user.login)) {
      return new Response(`Unauthorized user: ${user.login}. Allowed: ${allowedUsers.join(', ')}`, { status: 403 });
    }

    // Create session JWT
    const sessionData = {
      username: user.login,
      name: user.name || user.login,
      email: user.email || '',
      avatar: user.avatar_url,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    };

    const jwt = await createJWT(sessionData, env.JWT_SECRET);

    // Redirect with cookie
    const response = Response.redirect(`${url.origin}/?authenticated=true`, 302);
    response.headers.set('Set-Cookie', `aspft_session=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`);
    
    return response;
  } catch (error: any) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}

// Fixed JWT creation for Cloudflare Workers
async function createJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  
  // Use proper base64url encoding
  const base64url = (str: string) => {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };
  
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  
  const data = `${encodedHeader}.${encodedPayload}`;
  const encoder = new TextEncoder();
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const encodedSignature = base64url(String.fromCharCode(...new Uint8Array(signature)));
  
  return `${data}.${encodedSignature}`;
}
