// Cloudflare Pages Function - GitHub OAuth Login
export async function onRequestGet(context: any) {
  const { env } = context;

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set('redirect_uri', `${new URL(context.request.url).origin}/api/auth/callback`);
  githubAuthUrl.searchParams.set('scope', 'read:user user:email');
  githubAuthUrl.searchParams.set('state', crypto.randomUUID());

  return Response.redirect(githubAuthUrl.toString(), 302);
}
