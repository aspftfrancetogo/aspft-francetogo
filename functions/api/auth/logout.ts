// Cloudflare Pages Function - Logout
export async function onRequestGet(context: any) {
  const response = Response.redirect(new URL(context.request.url).origin, 302);
  response.headers.set('Set-Cookie', 'aspft_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
  return response;
}
