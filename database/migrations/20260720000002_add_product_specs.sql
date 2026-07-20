-- Author: Haru_Wannasingh
-- Date: 2026-07-20
-- Task: Add product specs columns to projects table
-- Purpose: Support database specs rendering in the industrial portfolio design

ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS latency TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS throughput TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS blueprint_path TEXT DEFAULT '';
