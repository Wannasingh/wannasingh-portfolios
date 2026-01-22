-- ==============================================================================
-- RLS REPAIR SCRIPT (v2 - Fixed Idempotency)
-- ISSUE: Admin updates show "Success" but data doesn't change.
-- FIX:   Add policies to allow Authenticated Users (Admins) to INSERT/UPDATE/DELETE.
-- NOTE:  This script drops existing policies first to prevent "already exists" errors.
-- ==============================================================================

-- 1. Profile
DROP POLICY IF EXISTS "Allow authenticated update on profile" ON public.profile;
CREATE POLICY "Allow authenticated update on profile" ON public.profile FOR UPDATE USING (auth.role() = 'authenticated');

-- 2. Experiences
DROP POLICY IF EXISTS "Allow authenticated insert on experiences" ON public.experiences;
DROP POLICY IF EXISTS "Allow authenticated update on experiences" ON public.experiences;
DROP POLICY IF EXISTS "Allow authenticated delete on experiences" ON public.experiences;

CREATE POLICY "Allow authenticated insert on experiences" ON public.experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on experiences" ON public.experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on experiences" ON public.experiences FOR DELETE USING (auth.role() = 'authenticated');

-- 3. Skill Categories
DROP POLICY IF EXISTS "Allow authenticated insert on skill_categories" ON public.skill_categories;
DROP POLICY IF EXISTS "Allow authenticated update on skill_categories" ON public.skill_categories;
DROP POLICY IF EXISTS "Allow authenticated delete on skill_categories" ON public.skill_categories;

CREATE POLICY "Allow authenticated insert on skill_categories" ON public.skill_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on skill_categories" ON public.skill_categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on skill_categories" ON public.skill_categories FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Skills
DROP POLICY IF EXISTS "Allow authenticated insert on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow authenticated update on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow authenticated delete on skills" ON public.skills;

CREATE POLICY "Allow authenticated insert on skills" ON public.skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on skills" ON public.skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on skills" ON public.skills FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Projects
DROP POLICY IF EXISTS "Allow authenticated insert on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated update on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated delete on projects" ON public.projects;

CREATE POLICY "Allow authenticated insert on projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on projects" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Availability
DROP POLICY IF EXISTS "Allow authenticated insert on availability" ON public.availability;
DROP POLICY IF EXISTS "Allow authenticated update on availability" ON public.availability;
DROP POLICY IF EXISTS "Allow authenticated delete on availability" ON public.availability;

CREATE POLICY "Allow authenticated insert on availability" ON public.availability FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on availability" ON public.availability FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on availability" ON public.availability FOR DELETE USING (auth.role() = 'authenticated');

-- 7. System Settings
DROP POLICY IF EXISTS "Allow authenticated insert on system_settings" ON public.system_settings;
DROP POLICY IF EXISTS "Allow authenticated update on system_settings" ON public.system_settings;

CREATE POLICY "Allow authenticated insert on system_settings" ON public.system_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on system_settings" ON public.system_settings FOR UPDATE USING (auth.role() = 'authenticated');
