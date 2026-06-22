import fs from 'fs';

// Load env files automatically using native Node.js feature (Node v20.6+)
if (fs.existsSync('.env.local')) {
  process.loadEnvFile('.env.local');
} else if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) {
    console.error('Usage: npx tsx scripts/hash-admin-password.ts <email> <password>');
    process.exit(1);
  }

  try {
    const { hashPassword } = await import('../src/app/lib/auth-utils');
    const { query } = await import('../src/app/lib/pg-client');

    const hash = hashPassword(password);
    await query('UPDATE public.admin_emails SET password_hash = $1 WHERE email = $2', [hash, email]);
    console.log(`Password hash successfully set for ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to hash and update password:', error);
    process.exit(1);
  }
}

main();
