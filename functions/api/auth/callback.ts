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
  const error = url.searchParams.get('error');

  if (error) {
    return new Response(`GitHub OAuth error: ${error}`, { status: 400 });
  }

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
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

    const tokenText = await tokenResponse.text();
    
    let tokenData;
    try {
      tokenData = JSON.parse(tokenText);
    } catch (e) {
      return new Response(`GitHub token parse error: ${tokenText}`, { status: 500 });
    }

    if (tokenData.error) {
      return new Response(`GitHub error: ${tokenData.error}`, { status: 401 });
    }

    if (!tokenData.access_token) {
      return new Response(`No access token: ${JSON.stringify(tokenData)}`, { status: 401 });
    }

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/json',
        'User-Agent': 'ASPFT-Auth',
      },
    });

    if (!userResponse.ok) {
      return new Response(`GitHub API error: ${userResponse.status}`, { status: 500 });
    }

    const user: GitHubUser = await userResponse.json();

    // Whitelist check with detailed logging
    const allowedUsersRaw = env.ALLOWED_GITHUB_USERS || '';
    const allowedUsers = allowedUsersRaw.split(',').map((u: string) => u.trim().toLowerCase());
    const userLoginLower = user.login.toLowerCase();
    
    // TEMPORARY: Accept everyone for testing
    const isAllowed = true; // allowedUsers.includes(userLoginLower);
    
    if (!isAllowed) {
      return new Response(
        `Access denied\nUser: "${user.login}" (${userLoginLower})\nAllowed: ${allowedUsers.join(', ')}\nRaw config: "${allowedUsersRaw}"`, 
        { status: 403 }
      );
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
    response.headers.set(
      'Set-Cookie', 
      `aspft_session=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
    );
    
    return response;

  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

async function createJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  
  const base64url = (input: ArrayBuffer | string) => {
    const str = typeof input === 'string' 
      ? input 
      : String.fromCharCode(...new Uint8Array(input));
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
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
  const encodedSignature = base64url(signature);
  
  return `${data}.${encodedSignature}`;
}
