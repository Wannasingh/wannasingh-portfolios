import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/app/lib/auth-utils';

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get('session');
  if (!sessionCookie) {
    return NextResponse.json({ user: null });
  }

  const payload = verifyJWT(sessionCookie.value);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: { email: payload.email } });
}
