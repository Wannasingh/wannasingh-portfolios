import { secureJsonResponse } from '@/app/lib/api-utils';
import { NextRequest } from 'next/server';
import { verifyJWT } from '@/app/lib/auth-utils';

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get('session');
  if (!sessionCookie) {
    return secureJsonResponse({ user: null });
  }

  const payload = verifyJWT(sessionCookie.value);
  if (!payload) {
    return secureJsonResponse({ user: null });
  }

  return secureJsonResponse({ user: { email: payload.email } });
}
