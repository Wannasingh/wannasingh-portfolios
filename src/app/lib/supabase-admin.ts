import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client สำหรับ admin (ใช้ auth)
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper function เช็คว่าเป็น admin หรือไม่
export async function isAdmin() {
  const { data: { user } } = await supabaseAdmin.auth.getUser();
  
  if (!user) return false;
  
  const adminEmails = [
    'wannasingh.khan@gmail.com',
    'sarankhtn@gmail.com'
  ];
  
  return adminEmails.includes(user.email || '');
}

// Helper function สำหรับ protected routes
export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
}
