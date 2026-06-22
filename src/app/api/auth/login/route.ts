import { NextRequest, NextResponse } from 'next/server';
import { executeDbQuery } from '@/app/lib/db-executor';
import { signJWT } from '@/app/lib/auth-utils';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log('[Login Route] Login attempt for:', email);

    // 1. Check if email is in admin_emails table
    const { data: adminRecord, error: dbError } = await executeDbQuery({
      table: 'admin_emails',
      action: 'select',
      filters: [{ type: 'eq', field: 'email', value: email }],
      singleFlag: true,
    });

    if (dbError) {
      console.error('[Login Route] DB Select Error:', dbError);
    }

    if (!adminRecord) {
      return NextResponse.json({ error: 'Unauthorized: Email is not registered as admin' }, { status: 401 });
    }

    // 2. Check password hash from database
    const storedHash = adminRecord.password_hash;
    if (!storedHash) {
      return NextResponse.json({ error: 'Unauthorized: Password is not configured for this admin' }, { status: 401 });
    }

    const { verifyPassword } = await import('@/app/lib/auth-utils');
    const isPasswordValid = verifyPassword(password, storedHash);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // 3. Create session cookie
    const token = signJWT({ email });
    const response = NextResponse.json({
      user: { email },
      message: 'Login successful',
    });

    // Set secure httpOnly cookie
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
