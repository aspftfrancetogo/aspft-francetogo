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
    return new Response('Failed to get access token', { status: 401 });
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
  const allowedUsers = (env.ALLOWED_GITHUB_USERS || '').split(',');
  if (!allowedUsers.includes(user.login)) {
    return new Response('Unauthorized user', { status: 403 });
  }

  // Create session JWT
  const sessionData = {
    username: user.login,
    name: user.name,
    email: user.email,
    avatar: user.avatar_url,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
  };

  const jwt = await createJWT(sessionData, env.JWT_SECRET);

  // Redirect with cookie
  const response = Response.redirect(`${url.origin}/?authenticated=true`, 302);
  response.headers.set('Set-Cookie', `aspft_session=${jwt}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);
  
  return response;
}

async function createJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));
  
  return `${data}.${encodedSignature}`;
}
