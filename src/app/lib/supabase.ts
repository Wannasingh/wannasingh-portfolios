import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type สำหรับ Project
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Type สำหรับ Stats
export interface Stat {
  id: string;
  number: string;
  label: string;
  color: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Type สำหรับ Service
export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  icon_color: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Type สำหรับ Tech Tag
export interface TechTag {
  id: string;
  name: string;
  category: string;
  color: string;
  icon_name?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
