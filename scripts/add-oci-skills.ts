import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    console.log('Seeding OCI / Oracle specific skills...');
    
    const dbCategoryId = '9a8c7b6c-1122-3344-5566-778899aabbcc'; // Database & Oracle
    
    const ociSkills = [
      { name: 'OCI Infrastructure', icon_key: 'SiOracle', display_order: 5 },
      { name: 'OCI Virtual Cloud Network (VCN)', icon_key: 'SiShield', display_order: 6 },
      { name: 'Oracle DB Migration', icon_key: 'SiOracle', display_order: 7 },
      { name: 'OCI Autonomous Database', icon_key: 'SiOracle', display_order: 8 }
    ];
    
    for (const skill of ociSkills) {
      console.log(`Checking skill: "${skill.name}"...`);
      const checkRes = await pool.query(
        'SELECT id FROM public.skills WHERE name = $1 AND category_id = $2', 
        [skill.name, dbCategoryId]
      );
      
      if (checkRes.rows.length > 0) {
        console.log(`Skill "${skill.name}" already exists. Updating order...`);
        await pool.query(
          'UPDATE public.skills SET display_order = $1 WHERE id = $2',
          [skill.display_order, checkRes.rows[0].id]
        );
      } else {
        console.log(`Inserting new skill "${skill.name}"...`);
        await pool.query(
          'INSERT INTO public.skills (name, icon_key, category_id, display_order) VALUES ($1, $2, $3, $4)',
          [skill.name, skill.icon_key, dbCategoryId, skill.display_order]
        );
      }
    }
    
    console.log('OCI / Oracle skills successfully seeded!');
  } catch (err) {
    console.error('Error seeding OCI skills:', err);
  } finally {
    await pool.end();
  }
}

run();
