import { supabase } from "./supabase";

// Client สำหรับ admin (ใช้ตัวเดียวกับ client ทั่วไปเพื่อไม่ให้ session ชนกัน)
export const supabaseAdmin = supabase;

// Helper function เช็คว่าเป็น admin หรือไม่
export async function isAdmin() {
  const { data: { user } } = await supabaseAdmin.auth.getUser();
  
  if (!user) return false;
  
  const { data } = await supabaseAdmin
    .from('admin_emails')
    .select('email')
    .eq('email', user.email || '')
    .single();
  
  return !!data;
}

// Helper function สำหรับ protected routes
export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
}
