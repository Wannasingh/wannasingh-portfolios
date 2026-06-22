import { supabase } from './api-client';

export const supabaseAdmin = supabase;

export async function isAdmin() {
  const { data: { user } } = await supabaseAdmin.auth.getUser();
  return !!user;
}

export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
}
