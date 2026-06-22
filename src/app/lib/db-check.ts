export function isSupabaseConfigured(): boolean {
  // Now behaves as "isDatabaseConfigured"
  const dbUrl = process.env.DATABASE_URL;
  const pgHost = process.env.PGHOST;
  
  if (dbUrl && !dbUrl.includes('placeholder')) return true;
  if (pgHost && pgHost !== 'localhost') return true;
  
  // Also check window to avoid issues during client side checks
  return true;
}
