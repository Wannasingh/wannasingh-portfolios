import { secureJsonResponse } from '@/app/lib/api-utils';

export async function POST() {
  const response = secureJsonResponse({ message: 'Logged out successfully' });
  response.cookies.delete('session');
  return response;
}
