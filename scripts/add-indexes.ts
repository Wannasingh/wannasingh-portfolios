import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    console.log('Starting database indexing performance tuning...');
    
    const queries = [
      'CREATE INDEX IF NOT EXISTS idx_skills_category_id ON public.skills(category_id)',
      'CREATE INDEX IF NOT EXISTS idx_skills_display_order ON public.skills(display_order)',
      'CREATE INDEX IF NOT EXISTS idx_experiences_display_order ON public.experiences(display_order)',
      'CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON public.projects(is_featured)',
      'CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC)',
      'CREATE INDEX IF NOT EXISTS idx_skill_categories_display_order ON public.skill_categories(display_order)'
    ];
    
    for (const sql of queries) {
      console.log(`Executing: "${sql}"`);
      await pool.query(sql);
    }
    
    console.log('Database performance indexes created successfully!');
  } catch (err) {
    console.error('Error creating database indexes:', err);
  } finally {
    await pool.end();
  }
}

run();
