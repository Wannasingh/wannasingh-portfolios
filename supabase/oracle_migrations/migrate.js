// Author: Antigravity
// Date: 2026-06-17
// Task: Oracle Migration - Step 3: Migration script
// Purpose: Fetch data from Supabase and migrate it to Oracle Autonomous Database dbprod.

const { createClient } = require('@supabase/supabase-js');
const oracledb = require('oracledb');
const fs = require('fs');
const path = require('path');

// Manually parse .env if exists to avoid installing dotenv
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const index = trimmed.indexOf('=');
      if (index !== -1) {
        const key = trimmed.substring(0, index).trim();
        const value = trimmed.substring(index + 1).trim();
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const walletLocation = '/Users/haru/oracle-26-ai/dbprod/Wallet_dbprod';
const connectString = `(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-singapore-1.oraclecloud.com))(connect_data=(service_name=g94de3106e89f07_dbprod_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))`;

async function getOracleConnection(user, password) {
  const walletPassword = process.env.ORACLE_WALLET_PASSWORD || process.env.ORACLE_ADMIN_PASSWORD;
  return await oracledb.getConnection({
    user,
    password,
    connectString,
    walletLocation,
    walletPassword
  });
}

async function runSQLFile(conn, filePath) {
  console.log(`Executing SQL file: ${filePath}`);
  const sql = fs.readFileSync(filePath, 'utf8');
  // Split statements by semicolon, avoiding splitting inside triggers/functions (simple split for DDL statements)
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    try {
      await conn.execute(statement);
    } catch (err) {
      if (err.message.includes('ORA-01918') || err.message.includes('ORA-00942')) {
        // Ignore user/table does not exist errors during drops if any
        console.warn(`Warning executing statement: ${err.message}`);
      } else {
        throw err;
      }
    }
  }
  await conn.commit();
}

async function migrateTable(oracleConn, tableName, oracleTableName, mapper) {
  console.log(`Migrating table ${tableName} -> ${oracleTableName}...`);
  
  // 1. Fetch from Supabase
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    throw new Error(`Failed to fetch from Supabase table ${tableName}: ${error.message}`);
  }
  
  console.log(`Fetched ${data.length} records from Supabase.`);
  if (data.length === 0) return;

  // 2. Insert into Oracle
  for (const row of data) {
    const mappedRow = mapper(row);
    const keys = Object.keys(mappedRow);
    const columns = keys.join(', ');
    const binds = keys.map((_, i) => `:${i + 1}`).join(', ');
    const sql = `INSERT INTO WANNASINGH.${oracleTableName} (${columns}) VALUES (${binds})`;
    
    try {
      await oracleConn.execute(sql, Object.values(mappedRow));
    } catch (err) {
      console.error(`Error inserting into ${oracleTableName}:`, err.message);
      console.error('Row data:', mappedRow);
      throw err;
    }
  }
  
  await oracleConn.commit();
  console.log(`Successfully migrated ${data.length} records to ${oracleTableName}.`);
}

// Convert arrays/booleans to Oracle format
const toNumBool = (val) => (val ? 1 : 0);
const toJsonString = (val) => (Array.isArray(val) ? JSON.stringify(val) : '[]');

async function main() {
  const adminPassword = process.env.ORACLE_ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('Please set ORACLE_ADMIN_PASSWORD environment variable to run user creation.');
    process.exit(1);
  }

  let adminConn;
  try {
    console.log('Connecting to Oracle dbprod as ADMIN...');
    adminConn = await getOracleConnection('ADMIN', adminPassword);
    console.log('Connected.');
    
    // Execute User creation DDL
    const userSqlPath = path.join(__dirname, '01_create_user.sql');
    await runSQLFile(adminConn, userSqlPath);
    console.log('User WANNASINGH created successfully.');
  } catch (err) {
    console.error('Error in ADMIN setup:', err.message);
    process.exit(1);
  } finally {
    if (adminConn) {
      await adminConn.close();
    }
  }

  let userConn;
  try {
    console.log('Connecting to Oracle dbprod as WANNASINGH...');
    userConn = await getOracleConnection('WANNASINGH', '***REMOVED***');
    console.log('Connected.');

    // Execute Schema creation DDL
    const tablesSqlPath = path.join(__dirname, '02_create_tables.sql');
    await runSQLFile(userConn, tablesSqlPath);
    console.log('Tables created successfully.');

    // Migrations mapping and execution
    await migrateTable(userConn, 'admin_emails', 'admin_emails', (r) => ({
      id: r.id,
      email: r.email,
      created_at: new Date(r.created_at)
    }));

    await migrateTable(userConn, 'profile', 'profile', (r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      email: r.email,
      tagline: r.tagline,
      bio_short: r.bio_short,
      github_link: r.github_link,
      linkedin_link: r.linkedin_link,
      twitter_link: r.twitter_link || null,
      about_philosophy_title: r.about_philosophy_title || null,
      about_philosophy_content: r.about_philosophy_content || null,
      avatar_url: r.avatar_url || null,
      about_analogy_title_left: r.about_analogy_title_left,
      about_analogy_desc_left: r.about_analogy_desc_left,
      about_analogy_title_right: r.about_analogy_title_right,
      about_analogy_desc_right: r.about_analogy_desc_right,
      about_analogy_center_title: r.about_analogy_center_title,
      about_analogy_label_left: r.about_analogy_label_left,
      about_analogy_label_right: r.about_analogy_label_right,
      about_analogy_label_center: r.about_analogy_label_center,
      about_evolution_title: r.about_evolution_title,
      about_evolution_subtitle: r.about_evolution_subtitle
    }));

    await migrateTable(userConn, 'experiences', 'experiences', (r) => ({
      id: r.id,
      period: r.period,
      title: r.title,
      description: r.description,
      type: r.type,
      display_order: r.display_order
    }));

    await migrateTable(userConn, 'skill_categories', 'skill_categories', (r) => ({
      id: r.id,
      name: r.name,
      icon_name: r.icon_name,
      class_name: r.class_name || '',
      display_order: r.display_order
    }));

    await migrateTable(userConn, 'skills', 'skills', (r) => ({
      id: r.id,
      category_id: r.category_id,
      name: r.name,
      icon_key: r.icon_key || '',
      display_order: r.display_order
    }));

    await migrateTable(userConn, 'projects', 'projects', (r) => ({
      id: r.id,
      title: r.title,
      category: r.category || null,
      overview: r.overview || null,
      problem: r.problem || null,
      solution: r.solution || null,
      impact: r.impact || null,
      tech_stack: toJsonString(r.tech_stack),
      demo_link: r.demo_link || '',
      github_link: r.github_link || '',
      image_path: r.image_path || '',
      is_featured: toNumBool(r.is_featured),
      key_features: toJsonString(r.key_features),
      challenges: toJsonString(r.challenges),
      created_at: new Date(r.created_at)
    }));

    await migrateTable(userConn, 'availability', 'availability', (r) => ({
      id: r.id,
      item_text: r.item_text,
      display_order: r.display_order
    }));

    await migrateTable(userConn, 'services', 'services', (r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      icon_name: r.icon_name,
      icon_color: r.icon_color || '#61DAFB',
      display_order: r.display_order,
      is_active: toNumBool(r.is_active)
    }));

    await migrateTable(userConn, 'stats', 'stats', (r) => ({
      id: r.id,
      number_val: r.number,
      label: r.label,
      color: r.color || 'text-blue-500',
      display_order: r.display_order,
      is_active: toNumBool(r.is_active)
    }));

    await migrateTable(userConn, 'tech_tags', 'tech_tags', (r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      color: r.color || 'blue',
      display_order: r.display_order,
      is_active: toNumBool(r.is_active)
    }));

    await migrateTable(userConn, 'social_links', 'social_links', (r) => ({
      id: r.id,
      platform: r.platform,
      icon_name: r.icon_name,
      url: r.url,
      display_order: r.display_order,
      is_active: toNumBool(r.is_active)
    }));

    await migrateTable(userConn, 'system_settings', 'system_settings', (r) => ({
      id: r.id,
      site_title: r.site_title,
      site_description: r.site_description,
      resume_url: r.resume_url,
      maintenance_mode: toNumBool(r.maintenance_mode),
      google_analytics_id: r.google_analytics_id || ''
    }));

    await migrateTable(userConn, 'testimonials', 'testimonials', (r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      quote: r.quote,
      display_order: r.display_order,
      is_active: toNumBool(r.is_active)
    }));

    console.log('Migration finished successfully!');
  } catch (err) {
    console.error('Error during migration:', err.message);
    process.exit(1);
  } finally {
    if (userConn) {
      await userConn.close();
    }
  }
}

main();
