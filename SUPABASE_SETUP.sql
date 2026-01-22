-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- ⚠️ WARNING: THIS SCRIPT WILL DROP EXISTING TABLES
-- ==========================================

-- 1. Profile / Site Config Table
DROP TABLE IF EXISTS public.profile CASCADE;
CREATE TABLE public.profile (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    tagline TEXT,
    bio_short TEXT,
    github_link TEXT,
    linkedin_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.profile (name, role, email, tagline, bio_short, github_link, linkedin_link)
VALUES (
    'Wannasingh Khan', 
    'Full Stack Developer + Oracle DBA', 
    'wannasingh.khan@gmail.com',
    'Architecting Robust Data. Building Modern Apps.',
    'I dont just write code; I design the infrastructure that powers it. Bridging the gap between complex Oracle database tuning and responsive React interfaces.',
    'https://github.com/Wannasingh',
    'https://linkedin.com/in/wannasingh'
);

-- 2. Experiences (Timeline) Table
DROP TABLE IF EXISTS public.experiences CASCADE;
CREATE TABLE public.experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    period TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT CHECK (type IN ('work', 'education', 'other')),
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.experiences (period, title, description, type, display_order)
VALUES 
    ('2020 - 2024', 'The Foundation (Oracle DBA)', 'Managing enterprise data at North Bangkok University. Learning the hard truths about query costs, indexing strategies, and data integrity.', 'work', 1),
    ('2024 - 2025', 'The Bridge (Full Stack)', 'TechUp Bootcamp. Translating database logic into API endpoints (Node.js) and consuming them with React/Next.js. The "Aha!" moment where infrastructure met interface.', 'education', 2),
    ('Current', 'The Hybrid Engineer', 'Building performance-critical applications where milliseconds matter. Leveraging "Explain Plan" intuition to write better "useEffect" hooks.', 'work', 3);

-- 3. Skill Categories Table
DROP TABLE IF EXISTS public.skills CASCADE;
DROP TABLE IF EXISTS public.skill_categories CASCADE;

CREATE TABLE public.skill_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    icon_name TEXT, -- Lucide icon name for the category header (generic)
    class_name TEXT, 
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.skill_categories (id, name, icon_name, class_name, display_order)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Database Powerhouse', 'Database', 'bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-300', 1),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Modern Backend', 'Server', 'bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-300', 2),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Frontend Engineering', 'Code2', 'bg-purple-500/5 border-purple-500/20 text-purple-700 dark:text-purple-300', 3);

-- 4. Skills Table
CREATE TABLE public.skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID REFERENCES public.skill_categories(id),
    name TEXT NOT NULL,
    icon_key TEXT, -- The key for react-icons (e.g., 'SiOracle', 'SiReact')
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Skills with Real Icon Keys (using 'Si' prefix from Simple Icons commonly found in react-icons/si)
INSERT INTO public.skills (category_id, name, icon_key, display_order)
VALUES 
    -- Database Powerhouse
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Oracle 19c/21c', 'SiOracle', 1),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PostgreSQL', 'SiPostgresql', 2),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PL/SQL Tuning', 'SiDatabricks', 3), -- No exact PL/SQL icon, using Databricks or similar DB icon or generic
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Data Guard', 'SiShield', 4), -- Generic shield for security/guard
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'RMAN Backup', 'SiVeritas', 5), -- Conceptual
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Partitioning', 'SiApachespark', 6), -- Conceptual

    -- Modern Backend
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Node.js', 'SiNodedotjs', 1),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'C# .NET Core', 'SiDotnet', 2),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'RESTful APIs', 'SiOpenapiinitiative', 3),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'GraphQL', 'SiGraphql', 4),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Redis', 'SiRedis', 5),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Docker & CI/CD', 'SiDocker', 6),

    -- Frontend Engineering
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'React.js', 'SiReact', 1),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Next.js', 'SiNextdotjs', 2),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'TypeScript', 'SiTypescript', 3),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Tailwind CSS', 'SiTailwindcss', 4),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Framer Motion', 'SiFramer', 5),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'State Management', 'SiRedux', 6);

-- 5. Projects Table
DROP TABLE IF EXISTS public.projects CASCADE;
CREATE TABLE public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    problem TEXT,
    solution TEXT,
    impact TEXT,
    overview TEXT,
    tech_stack TEXT[],
    demo_link TEXT,
    github_link TEXT,
    image_path TEXT,
    is_featured BOOLEAN DEFAULT false,
    key_features TEXT[], 
    challenges TEXT[], 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.projects (title, category, problem, solution, impact, tech_stack, demo_link, github_link, is_featured)
VALUES 
    (
        'Financial Data Warehouse Migration',
        'Enterprise System',
        'Legacy reporting took 20+ minutes to generate, causing business delays.',
        'Redesigned Oracle schema with partitioning, implemented materialized views, and built a Next.js dashboard with cached API routes.',
        '95% reduction in report generation time (20m -> 45s).',
        ARRAY['Oracle 19c', 'PL/SQL', 'Next.js', 'Node.js'],
        '#',
        '#',
        true
    ),
    (
        'Real-time Logistics Tracker',
        'Full Stack App',
        'Delivery drivers faced sync issues in low-connectivity areas, corrupting database records.',
        'Implemented an offline-first architecture with local SQLite sync to a central Postgres DB, handled via a robust Node.js API.',
        'Zero data loss during beta testing with 50+ drivers.',
        ARRAY['React Native', 'Postgres', 'Node.js', 'Redis'],
        '#',
        '#',
        true
    ),
    (
        'E-Commerce Inventory Sync',
        'API Integration',
        'Overselling items due to race conditions in the checkout flow.',
        'Utilized database row-level locking and transaction isolation levels to Ensure consistency.',
        'Eliminated overselling incidents completely during Black Friday traffic.',
        ARRAY['Next.js', 'Oracle Cloud', 'Stripe API', 'C# .NET'],
        '#',
        '#',
        true
    );

INSERT INTO public.projects (title, overview, tech_stack, key_features, challenges, is_featured, demo_link, github_link, image_path)
VALUES 
    (
        'E-commerce Platform',
        'A fully-featured e-commerce platform with a responsive design, secure payment processing, and real-time inventory management.',
        ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API', 'Docker'],
        ARRAY['User authentication and authorization', 'Product catalog with search and filter functionality', 'Shopping cart and wishlist management', 'Secure checkout process with Stripe integration', 'Admin dashboard', 'Real-time inventory updates'],
        ARRAY['Implementing real-time inventory updates', 'Ensuring secure handling of payment info', 'Optimizing database queries'],
        false,
        'https://your-ecommerce-demo.com',
        'https://github.com/yourusername/e-commerce-platform',
        '/assets/1.png'
    ),
    (
        'Task Management App',
        'A collaborative task management application with real-time updates and team collaboration features.',
        ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'React Query'],
        ARRAY['User authentication with role-based access', 'Real-time task updates', 'Drag-and-drop organization', 'Team collaboration', 'Task commenting'],
        ARRAY['Implementing real-time updates', 'Designing intuitive UI', 'Managing complex state'],
        false,
        'https://your-task-app-demo.com',
        'https://github.com/yourusername/task-management-app',
        '/assets/2.png'
    ),
    (
        'AI-Powered Chatbot',
        'An intelligent chatbot leveraging natural language processing to provide customer support and information retrieval.',
        ARRAY['Python', 'Flask', 'TensorFlow', 'NLTK', 'React', 'Docker'],
        ARRAY['NL understanding', 'Knowledge base integration', 'Multi-language support', 'Context maintenance'],
        ARRAY['High accuracy in intent classification', 'Maintaining context'],
        false,
        'https://your-chatbot-demo.com',
        'https://github.com/yourusername/ai-chatbot',
        '/assets/3.png'
    ),
    (
        'Fitness Tracking Mobile App',
        'A comprehensive mobile application for tracking workouts, nutrition, and health metrics with personalized insights.',
        ARRAY['React Native', 'Redux', 'Node.js', 'MongoDB', 'GraphQL', 'AWS'],
        ARRAY['Customizable workout plans', 'Nutrition tracking', 'Wearable integration', 'Progress visualization'],
        ARRAY['Data accuracy across devices', 'Offline mode syncing', 'Battery optimization'],
        false,
        'https://your-fitness-app-demo.com',
        'https://github.com/yourusername/fitness-tracker-app',
        '/assets/4.png'
    );

-- 6. Availability Options Table
DROP TABLE IF EXISTS public.availability CASCADE;
CREATE TABLE public.availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_text TEXT NOT NULL,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.availability (item_text, display_order)
VALUES 
    ('Full-time Frontend / Full Stack roles', 1),
    ('Database Migration & Optimization Consulting', 2),
    ('Complex Web Application Development', 3);

-- Policies
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skill_categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on availability" ON public.availability FOR SELECT USING (true);
