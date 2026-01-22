import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  tagline: string;
  bio_short: string;
  github_link: string;
  linkedin_link: string;
  twitter_link?: string;
  about_philosophy_title?: string;
  about_philosophy_content?: string;
}

export interface Experience {
  id: string;
  period: string;
  title: string;
  description: string;
  type: 'work' | 'education' | 'other';
  display_order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon_name: string;
  class_name: string;
  display_order: number;
  skills: Skill[]; // For nested fetching
}

export interface Skill {
  id: string;
  category_id: string;
  name: string;
  icon_key: string;
  display_order: number;
}

export interface Project {
  id: string;
  title: string;
  category?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  tech_stack: string[];
  demo_link: string;
  github_link: string;
  image_path: string;
  is_featured: boolean;
  key_features?: string[];
  challenges?: string[];
  created_at: string;
}

export interface Availability {
  id: string;
  item_text: string;
  display_order: number;
}

export interface Stat {
  id: string;
  number: string;
  label: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

export interface TechTag {
  id: string;
  name: string;
  category: string;
  color: string;
  display_order: number;
  is_active: boolean;
}
