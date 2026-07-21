import { Pool } from 'pg';
import { projects } from '../src/data/projects';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    console.log(`Read ${projects.length} projects from local projects file.`);
    
    // 1. Delete the placeholder/generic projects from the previous step to clean up
    const placeholders = [
      'E-commerce Platform',
      'Task Management App',
      'AI-Powered Chatbot',
      'Fitness Tracking Mobile App'
    ];
    
    console.log('Cleaning up old placeholder projects from database...');
    for (const title of placeholders) {
      await pool.query('DELETE FROM public.projects WHERE title = $1', [title]);
    }
    
    // 2. Insert or update the new real desktop projects
    for (const proj of projects) {
      console.log(`Processing project: "${proj.name}"...`);
      
      const checkRes = await pool.query('SELECT id FROM public.projects WHERE title = $1', [proj.name]);
      
      const category = proj.name.includes("Oracle") || proj.name.includes("OCI") ? "Oracle & Cloud Infrastructure"
                       : proj.name.includes("master-data") || proj.name.includes("MDM") ? "Database & Enterprise"
                       : proj.name.includes("ETL") || proj.name.includes("ELT") ? "Data Engineering"
                       : proj.name.includes("Lab") || proj.name.includes("DevOps") ? "DevOps & Infrastructure"
                       : proj.name.includes("widget") || proj.name === "note-app" ? "Mobile App"
                       : "Full Stack App";
                       
      const solutionText = proj.solutions.join('\n');
      
      // Select appropriate image path or defaults
      const imagePath = proj.imagePath;
      const isFeatured = proj.name.includes("Oracle") || proj.name.includes("master-data") || proj.name.includes("ETL") || proj.name.includes("e-commerce");

      if (checkRes.rows.length > 0) {
        console.log(`Project "${proj.name}" already exists. Updating...`);
        await pool.query(
          `UPDATE public.projects 
           SET category = $1, overview = $2, tech_stack = $3, key_features = $4, 
               challenges = $5, solution = $6, github_link = $7, demo_link = $8, 
               image_path = $9, is_featured = $10
           WHERE title = $11`,
          [
            category,
            proj.overview,
            proj.technologies,
            proj.keyFeatures,
            proj.challenges,
            solutionText,
            proj.githubLink,
            proj.demoLink,
            imagePath,
            isFeatured,
            proj.name
          ]
        );
      } else {
        console.log(`Inserting new project "${proj.name}"...`);
        await pool.query(
          `INSERT INTO public.projects 
           (title, category, overview, tech_stack, key_features, challenges, solution, github_link, demo_link, image_path, is_featured)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            proj.name,
            category,
            proj.overview,
            proj.technologies,
            proj.keyFeatures,
            proj.challenges,
            solutionText,
            proj.githubLink,
            proj.demoLink,
            imagePath,
            isFeatured
          ]
        );
      }
    }
    console.log('Database project seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await pool.end();
  }
}

run();
