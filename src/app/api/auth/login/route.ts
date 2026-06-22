import { executeQuery } from '@/app/lib/db';
import { fetchSecrets } from '@/app/lib/vault';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 1. Fetch valid passwords from Vault/Environment
    const secrets = await fetchSecrets();
    const adminPassword = secrets.ORACLE_PASSWORD || process.env.ORACLE_PASSWORD;

    if (!password || password !== adminPassword) {
      return NextResponse.json({ message: 'Invalid credentials (password mismatch)' }, { status: 401 });
    }

    // 2. Check if email exists in Oracle WANNASINGH.admin_emails table
    const sql = 'SELECT email FROM WANNASINGH.admin_emails WHERE email = :email';
    const rows = await executeQuery<{ EMAIL: string }>(sql, [email]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Unauthorized access: email not in admin list' }, { status: 401 });
    }

    // 3. Create session response with cookie
    const response = NextResponse.json({ user: { email } });
    
    // Set cookie (HTTPOnly, secure, path=/)
    response.cookies.set('wannasingh_session', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return response;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Login API error:', msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
