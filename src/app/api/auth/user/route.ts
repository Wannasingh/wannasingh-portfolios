import { secureJsonResponse } from '@/app/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('wannasingh_session');
    
    if (!sessionCookie || !sessionCookie.value) {
      return secureJsonResponse({ user: null }, { status: 401 });
    }

    return secureJsonResponse({ user: { email: sessionCookie.value } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return secureJsonResponse({ user: null, message: msg }, { status: 500 });
  }
}
