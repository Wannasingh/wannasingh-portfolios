import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('wannasingh_session');
    
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: { email: sessionCookie.value } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ user: null, message: msg }, { status: 500 });
  }
}
