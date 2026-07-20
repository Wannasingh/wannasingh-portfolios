-- Seed data for Wannasingh Portfolio

-- 0. Seed Admin Emails
INSERT INTO public.admin_emails (id, email) VALUES
('d1111111-1111-2222-3333-444455556666', 'wannasingh.khan@gmail.com'),
('d2222222-1111-2222-3333-444455556666', 'sarankhtn@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- 1. Seed Profile
INSERT INTO public.profile (
    id,
    name,
    role,
    email,
    tagline,
    bio_short,
    github_link,
    linkedin_link,
    twitter_link,
    about_philosophy_title,
    about_philosophy_content,
    avatar_url,
    about_analogy_title_left,
    about_analogy_desc_left,
    about_analogy_title_right,
    about_analogy_desc_right,
    about_analogy_center_title,
    about_analogy_label_left,
    about_analogy_label_right,
    about_analogy_label_center,
    about_evolution_title,
    about_evolution_subtitle
) VALUES (
    '8c9c0b11-a20c-4033-b924-c189b7cfcdfa',
    'Wannasingh',
    'Full Stack Developer & Oracle DBA',
    'wannasingh.khan@gmail.com',
    'Fast Learning. Data Centric. Full Stack Agile.',
    'I graduated with First Class Honors in Business English before mastering Full-Stack Engineering and Oracle DBA administrations. This unique hybrid skillset allows me to combine business logic, database performance, and modern interfaces.',
    'https://github.com/wannasingh',
    'https://linkedin.com/in/wannasingh',
    'https://twitter.com/wannasingh',
    'The Adaptability Superpower',
    'My journey is defined by rapid adaptation. Stepping from a First Class Honors degree in International Business English into the deep technical waters of Oracle DBA (19c/21c EE) and Full-Stack Engineering was a challenge I met with speed and precision. At Prem Group Engineering, I manage core database operations—fine-tuning FRA, IMPDP data pumps, index optimization, and SQL execution plans—while building mission-critical business software like Master Data Management and Debt Restructuring portals. I do not just write code; I bridge communication gaps and solve complex system requirements with lightning learning speed.',
    '/images/profile.jpg',
    'Oracle DBA',
    '19c/21c EE & Tuning',
    'Full-Stack Dev',
    'React, Node, Web Apps',
    'The Hybrid Architect',
    'FRA, IMPDP, SQL Tuning',
    'MDM & Debt Systems',
    'Fast Learning, Solid Execution',
    'My Evolution',
    'Bridging communication, database systems, and full-stack software.'
) ON CONFLICT (id) DO NOTHING;

-- 2. Seed System Settings
INSERT INTO public.system_settings (
    id,
    site_title,
    site_description,
    resume_url,
    maintenance_mode,
    google_analytics_id
) VALUES (
    'd83fc70c-255d-4f38-9588-e9f0e1f37e44',
    'Wannasingh Portfolio',
    'Full Stack Developer & Oracle DBA Portfolio website',
    '',
    false,
    ''
) ON CONFLICT (id) DO NOTHING;

-- 3. Seed Stats
INSERT INTO public.stats (id, number, label, color, display_order, is_active) VALUES
('b2382c73-455b-4861-bf96-5cb39a1fe182', '8+', 'Years of Database Architecture', 'text-blue-500', 1, true),
('c860c213-9eb1-4648-912f-48d6cb7f8d16', '20+', 'Successful Enterprise Projects', 'text-cyan-500', 2, true),
('f731a57c-2b28-48b4-be71-cf0b9f913d8c', '100%', 'Query Performance Gain', 'text-emerald-500', 3, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Services (Advantage Cards)
INSERT INTO public.services (id, title, description, icon_name, icon_color, display_order, is_active) VALUES
('a838df22-4521-4f81-8cb4-22d76813fa21', 'Database Architecture', 'Design, optimization, PL/SQL tuning, and clustering for Oracle and PostgreSQL.', 'SiOracle', '#f80000', 1, true),
('b84cf223-9522-48a2-9e2b-f8c6eb7f8121', 'Full Stack Development', 'Robust backend APIs in Node.js/.NET coupled with responsive Next.js frontend interfaces.', 'FaReact', '#61dafb', 2, true),
('c84ef334-1c23-48b5-bb2a-f8c6eb7f8144', 'System Optimisation', 'Bottleneck diagnosis, query restructuring, caching configurations, and infrastructure tuning.', 'IoLogoJavascript', '#f7df1e', 3, true)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Skill Categories
INSERT INTO public.skill_categories (id, name, icon_name, class_name, display_order) VALUES
('9a8c7b6c-1122-3344-5566-778899aabbcc', 'Database & Oracle', 'Database', 'border-blue-500/20', 1),
('9b8c7b6c-2233-4455-6677-8899aabbccdd', 'Backend & API', 'Server', 'border-purple-500/20', 2),
('9c8c7b6c-3344-5566-7788-99aabbccddee', 'Frontend', 'Layout', 'border-green-500/20', 3)
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Skills
INSERT INTO public.skills (id, category_id, name, icon_key, display_order) VALUES
-- Database category
('a1a2a3a4-1111-2222-3333-444455556666', '9a8c7b6c-1122-3344-5566-778899aabbcc', 'Oracle 21c', 'SiOracle', 1),
('b1b2b3b4-1111-2222-3333-444455556666', '9a8c7b6c-1122-3344-5566-778899aabbcc', 'PostgreSQL', 'SiPostgresql', 2),
('c1c2c3c4-1111-2222-3333-444455556666', '9a8c7b6c-1122-3344-5566-778899aabbcc', 'PL/SQL Tuning', '', 3),
('d1d2d3d4-1111-2222-3333-444455556666', '9a8c7b6c-1122-3344-5566-778899aabbcc', 'Data Guard', 'SiShield', 4),
-- Backend category
('e1e2e3e4-2222-3333-4444-555566667777', '9b8c7b6c-2233-4455-6677-8899aabbccdd', 'Node.js', 'SiNodedotjs', 1),
('f1f2f3f4-2222-3333-4444-555566667777', '9b8c7b6c-2233-4455-6677-8899aabbccdd', 'GraphQL', 'SiGraphql', 2),
('d2d2d2d2-2222-3333-4444-555566667777', '9b8c7b6c-2233-4455-6677-8899aabbccdd', 'Redis', 'SiRedis', 3),
('d3d3d3d3-2222-3333-4444-555566667777', '9b8c7b6c-2233-4455-6677-8899aabbccdd', 'Docker', 'SiDocker', 4),
-- Frontend category
('e1e1e1e1-3333-4444-5555-666677778888', '9c8c7b6c-3344-5566-7788-99aabbccddee', 'React', 'SiReact', 1),
('e2e2e2e2-3333-4444-5555-666677778888', '9c8c7b6c-3344-5566-7788-99aabbccddee', 'Next.js', 'SiNextdotjs', 2),
('e3e3e3e3-3333-4444-5555-666677778888', '9c8c7b6c-3344-5566-7788-99aabbccddee', 'TypeScript', 'SiTypescript', 3),
('e4e4e4e4-3333-4444-5555-666677778888', '9c8c7b6c-3344-5566-7788-99aabbccddee', 'Tailwind CSS', 'SiTailwindcss', 4)
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Experiences
INSERT INTO public.experiences (id, period, title, description, type, display_order) VALUES
('b3c3d3e3-1111-2222-3333-444455556666', '2024 - Present', 'Full-Stack Developer & Oracle DBA', 'Oversee full DBA operations at Prem Group Engineering, installing and managing Oracle 19c/21c EE databases, configuring Flash Recovery Areas (FRA), performing high-speed IMPDP migrations, and optimizing indexes/queries for high availability. Simultaneously architected full-stack enterprise systems, including a Master Data Management (MDM) system and a Debt Restructuring program.', 'work', 1),
('c3d3e3f3-1111-2222-3333-444455556666', '2024', 'Full-Stack Developer Trainee', 'Completed intensive software engineering bootcamp at TechUp. Mastered modern web development patterns, API structures, React, Next.js, Node.js, and database optimization, demonstrating high learning agility and rapid technical adaptation.', 'work', 2),
('d3e3f3a3-1111-2222-3333-444455556666', '2020 - 2024', 'B.A. in International Business English', 'Graduated with First Class Honors from North Bangkok University. Developed professional English communications, business logic, and analytical problem-solving skills, building a strong foundation for technical consulting and collaboration.', 'education', 3)
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Projects
INSERT INTO public.projects (
    id,
    title,
    category,
    overview,
    problem,
    solution,
    impact,
    tech_stack,
    demo_link,
    github_link,
    image_path,
    is_featured,
    key_features,
    challenges
) VALUES
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Enterprise HR System Migration',
    'Database & Infrastructure',
    'Migrating a legacy HR system containing thousands of personnel records from unindexed storage to a partitioned modern Oracle schema.',
    'Legacy system experienced 30-second delays during peak loads due to locks and lack of index caching.',
    'Redesigned schemas, introduced range partitioning on key transaction tables, and rewrote Oracle packages.',
    'Reduced query latency by 99%, bringing page response times down to under 200ms.',
    ARRAY['Oracle 21c', 'PL/SQL', 'Docker', 'Next.js', 'TypeScript'],
    '#',
    '#',
    '',
    true,
    ARRAY['Table Partitioning', 'PL/SQL Refactoring', 'Materialized Views'],
    ARRAY['High concurrency locking during migrations']
),
(
    'f1e2d3c4-b5a6-9f8e-7d6c-5b4a3f2e1d0c',
    'Real-time Analytics Dashboard',
    'Full Stack App',
    'A high-performance monitoring interface displaying business KPI streams dynamically.',
    'Operations teams had to wait hours for backend calculations to update dashboard metrics.',
    'Wired Next.js layout using server-sent event (SSE) channels, with Redis acting as a cache layer above Postgres database.',
    'Information refreshes instantly, allowing teams to react to metrics within seconds.',
    ARRAY['Next.js', 'React', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
    '#',
    '#',
    '',
    true,
    ARRAY['Server-Sent Events', 'Redis Caching', 'Interactive Charts'],
    ARRAY['Synchronizing cache state during database spikes']
)
ON CONFLICT (id) DO NOTHING;

-- 9. Seed Availability Items
INSERT INTO public.availability (id, item_text, display_order) VALUES
('a2b3c4d5-1111-2222-3333-444455556666', 'Full-time employment roles', 1),
('b3c4d5e6-1111-2222-3333-444455556666', 'Consulting & architectural audits', 2),
('c4d5e6f7-1111-2222-3333-444455556666', 'Database bottleneck analysis projects', 3)
ON CONFLICT (id) DO NOTHING;

-- 10. Seed Tech Tags
INSERT INTO public.tech_tags (id, name, category, color, display_order, is_active) VALUES
('a1a1a1a1-1111-2222-3333-444455556666', 'Oracle DB', 'Database', 'red', 1, true),
('a2a2a2a2-1111-2222-3333-444455556666', 'PostgreSQL', 'Database', 'blue', 2, true),
('a3a3a3a3-1111-2222-3333-444455556666', 'PL/SQL', 'Database', 'orange', 3, true),
('a4a4a4a4-1111-2222-3333-444455556666', 'Next.js', 'Frontend', 'cyan', 4, true),
('a5a5a5a5-1111-2222-3333-444455556666', 'React', 'Frontend', 'blue', 5, true),
('a6a6a6a6-1111-2222-3333-444455556666', 'Node.js', 'Backend', 'green', 6, true),
('a7a7a7a7-1111-2222-3333-444455556666', 'Redis', 'Backend', 'red', 7, true),
('a8a8a8a8-1111-2222-3333-444455556666', 'Docker', 'DevOps', 'blue', 8, true)
ON CONFLICT (id) DO NOTHING;

-- 11. Seed Social Links
INSERT INTO public.social_links (id, platform, icon_name, url, display_order, is_active) VALUES
('c1a1a1a1-1111-2222-3333-444455556666', 'GitHub', 'FaGithub', 'https://github.com/wannasingh', 1, true),
('c2a2a2a2-1111-2222-3333-444455556666', 'LinkedIn', 'FaLinkedin', 'https://linkedin.com/in/wannasingh', 2, true),
('c3a3a3a3-1111-2222-3333-444455556666', 'Twitter', 'FaSquareXTwitter', 'https://twitter.com/wannasingh', 3, true)
ON CONFLICT (id) DO NOTHING;
