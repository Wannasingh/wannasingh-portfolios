import { db } from './api-client';

export const dbAdmin = db;

export async function isAdmin() {
  const { data: { user } } = await dbAdmin.auth.getUser();
  return !!user;
}

export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
}
