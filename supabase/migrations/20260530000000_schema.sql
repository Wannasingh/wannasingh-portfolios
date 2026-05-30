-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Admin helper function based on signed JWT claims
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(auth.jwt() ->> 'email', '') IN (
    'wannasingh.khan@gmail.com',
    'sarankhtn@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profile table
CREATE TABLE public.profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    tagline TEXT NOT NULL,
    bio_short TEXT NOT NULL,
    github_link TEXT NOT NULL,
    linkedin_link TEXT NOT NULL,
    twitter_link TEXT,
    about_philosophy_title TEXT,
    about_philosophy_content TEXT
);

-- 2. Experiences table
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('work', 'education', 'other')),
    display_order INTEGER NOT NULL DEFAULT 0
);

-- 3. Skill Categories table
CREATE TABLE public.skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    class_name TEXT NOT NULL DEFAULT '',
    display_order INTEGER NOT NULL DEFAULT 0
);

-- 4. Skills table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon_key TEXT NOT NULL DEFAULT '',
    display_order INTEGER NOT NULL DEFAULT 0
);

-- 5. Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    overview TEXT,
    problem TEXT,
    solution TEXT,
    impact TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    demo_link TEXT NOT NULL DEFAULT '',
    github_link TEXT NOT NULL DEFAULT '',
    image_path TEXT NOT NULL DEFAULT '',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    key_features TEXT[] NOT NULL DEFAULT '{}',
    challenges TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Availability table
CREATE TABLE public.availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_text TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- 7. Services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    icon_color TEXT NOT NULL DEFAULT '#61DAFB',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- 8. Stats table
CREATE TABLE public.stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number TEXT NOT NULL,
    label TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT 'text-blue-500',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- 9. Tech Tags table
CREATE TABLE public.tech_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT 'blue',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- 10. Social Links table
CREATE TABLE public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- 11. System Settings table
CREATE TABLE public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_title TEXT NOT NULL DEFAULT 'Wannasingh Portfolio',
    site_description TEXT NOT NULL DEFAULT 'Full Stack Developer',
    resume_url TEXT NOT NULL DEFAULT '',
    maintenance_mode BOOLEAN NOT NULL DEFAULT false,
    google_analytics_id TEXT NOT NULL DEFAULT ''
);

-- 12. Testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    quote TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create Policies for public SELECT
CREATE POLICY "Allow public read profile" ON public.profile FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read experiences" ON public.experiences FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read skill_categories" ON public.skill_categories FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read skills" ON public.skills FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read availability" ON public.availability FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read stats" ON public.stats FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read tech_tags" ON public.tech_tags FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read social_links" ON public.social_links FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read system_settings" ON public.system_settings FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read testimonials" ON public.testimonials FOR SELECT TO public USING (true);

-- Create Policies for admin ALL actions (writes/updates/deletes)
CREATE POLICY "Allow admin write profile" ON public.profile FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write experiences" ON public.experiences FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write skill_categories" ON public.skill_categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write skills" ON public.skills FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write projects" ON public.projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write availability" ON public.availability FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write services" ON public.services FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write stats" ON public.stats FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write tech_tags" ON public.tech_tags FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write social_links" ON public.social_links FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write system_settings" ON public.system_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Allow admin write testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
