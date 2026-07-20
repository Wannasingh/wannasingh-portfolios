-- Author: Antigravity
-- Date: 2026-06-17
-- Task: Oracle Migration - Step 2: Schema Tables Creation
-- Purpose: Translates PostgreSQL tables to Oracle Autonomous Database structure.

-- 1. Admin Emails Table
CREATE TABLE WANNASINGH.admin_emails (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    email VARCHAR2(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

-- 2. Profile Table
CREATE TABLE WANNASINGH.profile (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    role VARCHAR2(255) NOT NULL,
    email VARCHAR2(255) NOT NULL,
    tagline VARCHAR2(255) NOT NULL,
    bio_short VARCHAR2(1000) NOT NULL,
    github_link VARCHAR2(255) NOT NULL,
    linkedin_link VARCHAR2(255) NOT NULL,
    twitter_link VARCHAR2(255),
    about_philosophy_title VARCHAR2(255),
    about_philosophy_content CLOB,
    avatar_url VARCHAR2(1000),
    about_analogy_title_left VARCHAR2(255) DEFAULT 'Solid Data',
    about_analogy_desc_left VARCHAR2(255) DEFAULT 'DBA & Storage',
    about_analogy_title_right VARCHAR2(255) DEFAULT 'Fluid UI',
    about_analogy_desc_right VARCHAR2(255) DEFAULT 'App & Frontend',
    about_analogy_center_title VARCHAR2(255) DEFAULT 'The Hybrid Architect',
    about_analogy_label_left VARCHAR2(255) DEFAULT 'Robust Infrastructure',
    about_analogy_label_right VARCHAR2(255) DEFAULT 'Stunning Experience',
    about_analogy_label_center VARCHAR2(255) DEFAULT 'The Perfect Balance',
    about_evolution_title VARCHAR2(255) DEFAULT 'My Evolution',
    about_evolution_subtitle VARCHAR2(1000) DEFAULT 'A path from deep backend infrastructure to modern frontend mastery.'
);

-- 3. Experiences Table
CREATE TABLE WANNASINGH.experiences (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    period VARCHAR2(255) NOT NULL,
    title VARCHAR2(255) NOT NULL,
    description VARCHAR2(1000) NOT NULL,
    type VARCHAR2(50) NOT NULL CONSTRAINT check_exp_type CHECK (type IN ('work', 'education', 'other')),
    display_order NUMBER(5) DEFAULT 0 NOT NULL
);

-- 4. Skill Categories Table
CREATE TABLE WANNASINGH.skill_categories (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    icon_name VARCHAR2(100) NOT NULL,
    class_name VARCHAR2(100) DEFAULT '',
    display_order NUMBER(5) DEFAULT 0 NOT NULL
);

-- 5. Skills Table
CREATE TABLE WANNASINGH.skills (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    category_id VARCHAR2(36) NOT NULL,
    name VARCHAR2(255) NOT NULL,
    icon_key VARCHAR2(100) DEFAULT '',
    display_order NUMBER(5) DEFAULT 0 NOT NULL,
    CONSTRAINT fk_skills_cat FOREIGN KEY (category_id) REFERENCES WANNASINGH.skill_categories(id) ON DELETE CASCADE
);

-- 6. Projects Table
CREATE TABLE WANNASINGH.projects (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    title VARCHAR2(255) NOT NULL,
    category VARCHAR2(255),
    overview VARCHAR2(2000),
    problem VARCHAR2(2000),
    solution VARCHAR2(2000),
    impact VARCHAR2(2000),
    tech_stack CLOB DEFAULT '[]' NOT NULL,
    demo_link VARCHAR2(255),
    github_link VARCHAR2(255),
    image_path VARCHAR2(1000),
    is_featured NUMBER(1) DEFAULT 0 NOT NULL CONSTRAINT check_featured CHECK (is_featured IN (0, 1)),
    key_features CLOB DEFAULT '[]' NOT NULL,
    challenges CLOB DEFAULT '[]' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

-- 7. Availability Table
CREATE TABLE WANNASINGH.availability (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    item_text VARCHAR2(500) NOT NULL,
    display_order NUMBER(5) DEFAULT 0 NOT NULL
);

-- 8. Services Table
CREATE TABLE WANNASINGH.services (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    title VARCHAR2(255) NOT NULL,
    description VARCHAR2(1000) NOT NULL,
    icon_name VARCHAR2(100) NOT NULL,
    icon_color VARCHAR2(50) DEFAULT '#61DAFB' NOT NULL,
    display_order NUMBER(5) DEFAULT 0 NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL CONSTRAINT check_service_active CHECK (is_active IN (0, 1))
);

-- 9. Stats Table
CREATE TABLE WANNASINGH.stats (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    number_val VARCHAR2(50) NOT NULL,
    label VARCHAR2(255) NOT NULL,
    color VARCHAR2(100) DEFAULT 'text-blue-500' NOT NULL,
    display_order NUMBER(5) DEFAULT 0 NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL CONSTRAINT check_stat_active CHECK (is_active IN (0, 1))
);

-- 10. Tech Tags Table
CREATE TABLE WANNASINGH.tech_tags (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    category VARCHAR2(100) NOT NULL,
    color VARCHAR2(100) DEFAULT 'blue' NOT NULL,
    display_order NUMBER(5) DEFAULT 0 NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL CONSTRAINT check_tag_active CHECK (is_active IN (0, 1))
);

-- 11. Social Links Table
CREATE TABLE WANNASINGH.social_links (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    platform VARCHAR2(100) NOT NULL,
    icon_name VARCHAR2(100) NOT NULL,
    url VARCHAR2(255) NOT NULL,
    display_order NUMBER(5) DEFAULT 0 NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL CONSTRAINT check_social_active CHECK (is_active IN (0, 1))
);

-- 12. System Settings Table
CREATE TABLE WANNASINGH.system_settings (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    site_title VARCHAR2(255) DEFAULT 'Wannasingh Portfolio' NOT NULL,
    site_description VARCHAR2(1000) DEFAULT 'Full Stack Developer' NOT NULL,
    resume_url VARCHAR2(1000),
    maintenance_mode NUMBER(1) DEFAULT 0 NOT NULL CONSTRAINT check_maint CHECK (maintenance_mode IN (0, 1)),
    google_analytics_id VARCHAR2(100)
);

-- 13. Testimonials Table
CREATE TABLE WANNASINGH.testimonials (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    role VARCHAR2(255) NOT NULL,
    quote VARCHAR2(1000) NOT NULL,
    display_order NUMBER(5) DEFAULT 0 NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL CONSTRAINT check_testim_active CHECK (is_active IN (0, 1))
);
