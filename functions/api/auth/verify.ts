// Cloudflare Pages Function - Verify JWT Session
export async function onRequestGet(context: any) {
  const { request, env } = context;
  
  const cookie = request.headers.get('Cookie');
  const sessionMatch = cookie?.match(/aspft_session=([^;]+)/);
  
  if (!sessionMatch) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const jwt = sessionMatch[1];
  
  try {
    const payload = await verifyJWT(jwt, env.JWT_SECRET);
    
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return new Response(JSON.stringify({ authenticated: false, error: 'Expired' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      authenticated: true, 
      user: {
        username: payload.username,
        name: payload.name,
        email: payload.email,
        avatar: payload.avatar,
      }
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ authenticated: false, error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function verifyJWT(token: string, secret: string): Promise<any> {
  const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
  
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  
  const signature = Uint8Array.from(atob(encodedSignature), c => c.charCodeAt(0));
  const valid = await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(data));
  
  if (!valid) throw new Error('Invalid signature');
  
  return JSON.parse(atob(encodedPayload));
}
