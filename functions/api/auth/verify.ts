// Cloudflare Pages Function - Verify Session
export async function onRequestGet(context: any) {
  const { request, env } = context;
  
  const cookie = request.headers.get('Cookie');
  const match = cookie?.match(/aspft_session=([^;]+)/);
  
  if (!match) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload = await verifyJWT(match[1], env.JWT_SECRET);
    
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
    
  } catch (error: any) {
    return new Response(JSON.stringify({ authenticated: false, error: error.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function verifyJWT(token: string, secret: string): Promise<any> {
  const [header, body, sig] = token.split('.');
  if (!header || !body || !sig) throw new Error('Malformed token');
  
  const enc = new TextEncoder();
  const data = `${header}.${body}`;
  
  // Decode base64url
  const b64decode = (str: string) => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return Uint8Array.from(atob(str), c => c.charCodeAt(0));
  };
  
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  
  const sigData = b64decode(sig);
  const valid = await crypto.subtle.verify('HMAC', key, sigData, enc.encode(data));
  
  if (!valid) throw new Error('Invalid signature');
  
  const dec = new TextDecoder();
  return JSON.parse(dec.decode(b64decode(body)));
}
