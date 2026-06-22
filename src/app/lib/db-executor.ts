/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from './pg-client';

const ALLOWED_TABLES = [
  'profile',
  'experiences',
  'skill_categories',
  'skills',
  'projects',
  'availability',
  'services',
  'stats',
  'tech_tags',
  'social_links',
  'system_settings',
  'testimonials',
  'admin_emails',
];

export interface QueryDescription {
  table: string;
  action: 'select' | 'insert' | 'update' | 'delete';
  selectFields?: string;
  filters?: Array<{ type: 'eq'; field: string; value: any }>;
  orders?: Array<{ field: string; ascending: boolean }>;
  limitCount?: number;
  singleFlag?: boolean;
  data?: any; // For insert/update
}

export async function executeDbQuery(desc: QueryDescription): Promise<{ data: any; error: any }> {
  try {
    if (!ALLOWED_TABLES.includes(desc.table)) {
      throw new Error(`Unauthorized table access: ${desc.table}`);
    }

    // Special handling for nested skill_categories fetching: select("*, skills (*)")
    if (desc.table === 'skill_categories' && desc.selectFields?.includes('skills')) {
      const catsRes = await query('SELECT * FROM public.skill_categories ORDER BY display_order ASC');
      const skillsRes = await query('SELECT * FROM public.skills ORDER BY display_order ASC');
      
      const categories = catsRes.rows;
      const skills = skillsRes.rows;
      
      const combined = categories.map((cat) => ({
        ...cat,
        skills: skills.filter((s: any) => s.category_id === cat.id),
      }));
      
      return { data: combined, error: null };
    }

    let sql = '';
    const params: any[] = [];

    if (desc.action === 'select') {
      const selectFields = desc.selectFields && desc.selectFields !== '*' ? desc.selectFields : '*';
      // Sanitize fields (only allow alphanumerics, commas, spaces, stars, underscores)
      if (!/^[a-zA-Z0-9_*,\s]+$/.test(selectFields)) {
        throw new Error('Invalid select fields');
      }

      sql = `SELECT ${selectFields} FROM public.${desc.table}`;
      
      if (desc.filters && desc.filters.length > 0) {
        const filterClauses: string[] = [];
        for (const f of desc.filters) {
          if (f.type === 'eq') {
            if (!/^[a-zA-Z0-9_]+$/.test(f.field)) throw new Error('Invalid filter field');
            params.push(f.value);
            filterClauses.push(`${f.field} = $${params.length}`);
          }
        }
        if (filterClauses.length > 0) {
          sql += ` WHERE ${filterClauses.join(' AND ')}`;
        }
      }

      if (desc.orders && desc.orders.length > 0) {
        const orderClauses = desc.orders.map((o) => {
          if (!/^[a-zA-Z0-9_]+$/.test(o.field)) throw new Error('Invalid order field');
          return `${o.field} ${o.ascending ? 'ASC' : 'DESC'}`;
        });
        sql += ` ORDER BY ${orderClauses.join(', ')}`;
      }

      if (desc.limitCount) {
        sql += ` LIMIT ${desc.limitCount}`;
      }

      const res = await query(sql, params);
      
      if (desc.singleFlag) {
        return { data: res.rows[0] || null, error: null };
      }
      return { data: res.rows, error: null };
    } 
    
    if (desc.action === 'insert') {
      const record = Array.isArray(desc.data) ? desc.data[0] : desc.data;
      if (!record) throw new Error('No data provided for insert');

      const keys = Object.keys(record);
      // Sanitize keys
      for (const key of keys) {
        if (!/^[a-zA-Z0-9_]+$/.test(key)) throw new Error('Invalid insert field name');
      }

      const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');
      const values = keys.map((k) => record[k]);

      sql = `INSERT INTO public.${desc.table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
      const res = await query(sql, values);
      
      return { data: Array.isArray(desc.data) ? res.rows : res.rows[0], error: null };
    } 
    
    if (desc.action === 'update') {
      const record = desc.data;
      if (!record) throw new Error('No data provided for update');
      if (!desc.filters || desc.filters.length === 0) {
        throw new Error('UPDATE requires at least one filter to prevent mass update');
      }

      const keys = Object.keys(record);
      for (const key of keys) {
        if (!/^[a-zA-Z0-9_]+$/.test(key)) throw new Error('Invalid update field name');
      }

      const setClauses: string[] = [];
      for (const k of keys) {
        params.push(record[k]);
        setClauses.push(`${k} = $${params.length}`);
      }

      sql = `UPDATE public.${desc.table} SET ${setClauses.join(', ')}`;

      if (desc.filters && desc.filters.length > 0) {
        const filterClauses: string[] = [];
        for (const f of desc.filters) {
          if (f.type === 'eq') {
            if (!/^[a-zA-Z0-9_]+$/.test(f.field)) throw new Error('Invalid filter field');
            params.push(f.value);
            filterClauses.push(`${f.field} = $${params.length}`);
          }
        }
        if (filterClauses.length > 0) {
          sql += ` WHERE ${filterClauses.join(' AND ')}`;
        }
      }

      sql += ' RETURNING *';
      const res = await query(sql, params);
      return { data: res.rows[0] || null, error: null };
    } 
    
    if (desc.action === 'delete') {
      if (!desc.filters || desc.filters.length === 0) {
        throw new Error('DELETE requires at least one filter to prevent mass deletion');
      }
      sql = `DELETE FROM public.${desc.table}`;

      if (desc.filters && desc.filters.length > 0) {
        const filterClauses: string[] = [];
        for (const f of desc.filters) {
          if (f.type === 'eq') {
            if (!/^[a-zA-Z0-9_]+$/.test(f.field)) throw new Error('Invalid filter field');
            params.push(f.value);
            filterClauses.push(`${f.field} = $${params.length}`);
          }
        }
        if (filterClauses.length > 0) {
          sql += ` WHERE ${filterClauses.join(' AND ')}`;
        }
      }

      sql += ' RETURNING *';
      const res = await query(sql, params);
      return { data: res.rows, error: null };
    }

    throw new Error(`Unsupported action: ${desc.action}`);
  } catch (err: any) {
    console.error('Database query execution failed', err);
    return { data: null, error: { message: err.message || 'Database error' } };
  }
}
