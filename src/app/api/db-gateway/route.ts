import { NextRequest, NextResponse } from 'next/server';
import { executeDbQuery, QueryDescription } from '@/app/lib/db-executor';
import { verifyJWT } from '@/app/lib/auth-utils';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as QueryDescription;
    if (!body || !body.table || !body.action) {
      return NextResponse.json({ error: 'Invalid query request parameter' }, { status: 400 });
    }

    // Determine if query requires admin authorization
    const isRead = body.action === 'select';
    
    const ADMIN_ONLY_TABLES = ['admin_emails', 'system_settings'];
    const requiresAuth = !isRead || ADMIN_ONLY_TABLES.includes(body.table);
    
    if (requiresAuth) {
      // Check auth cookie for write or sensitive operations
      const sessionCookie = req.cookies.get('session');
      if (!sessionCookie) {
        return NextResponse.json({ error: 'Unauthorized: No session cookie' }, { status: 401 });
      }

      const payload = verifyJWT(sessionCookie.value);
      if (!payload) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
      }
    }

    const result = await executeDbQuery(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('db-gateway endpoint error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
