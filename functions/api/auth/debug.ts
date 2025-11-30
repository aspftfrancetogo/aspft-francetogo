// Temporary debug endpoint
export async function onRequestGet(context: any) {
  const { env } = context;
  
  const allowedUsers = (env.ALLOWED_GITHUB_USERS || '').split(',').map((u: string) => u.trim());
  
  return new Response(JSON.stringify({
    configuredUsers: allowedUsers,
    rawValue: env.ALLOWED_GITHUB_USERS,
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}
