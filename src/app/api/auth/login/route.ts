import { secureJsonResponse } from '@/app/lib/api-utils';
import { NextRequest } from 'next/server';
import { executeDbQuery } from '@/app/lib/db-executor';
import { signJWT } from '@/app/lib/auth-utils';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return secureJsonResponse({ error: 'Email and password are required' }, { status: 400 });
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
      return secureJsonResponse({ error: 'Unauthorized: Email is not registered as admin' }, { status: 401 });
    }

    // 2. Check password hash from database
    const storedHash = adminRecord.password_hash;
    if (!storedHash) {
      return secureJsonResponse({ error: 'Unauthorized: Password is not configured for this admin' }, { status: 401 });
    }

    const { verifyPassword } = await import('@/app/lib/auth-utils');
    const isPasswordValid = verifyPassword(password, storedHash);
    
    if (!isPasswordValid) {
      return secureJsonResponse({ error: 'Invalid password' }, { status: 401 });
    }

    // 3. Create session cookie
    const token = signJWT({ email });
    const response = secureJsonResponse({
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
  } catch (err: unknown) {
    console.error('Login error:', err);
    return secureJsonResponse({ error: 'Internal server error' }, { status: 500 });
  }
}
