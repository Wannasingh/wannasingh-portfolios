import { QueryDescription } from './db-executor';
import { uploadImage, deleteImage } from './storage-utils';

export interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  tagline: string;
  bio_short: string;
  github_link: string;
  linkedin_link: string;
  twitter_link?: string;
  about_philosophy_title?: string;
  about_philosophy_content?: string;
  avatar_url?: string;
  about_analogy_title_left?: string;
  about_analogy_desc_left?: string;
  about_analogy_title_right?: string;
  about_analogy_desc_right?: string;
  about_analogy_center_title?: string;
  about_analogy_label_left?: string;
  about_analogy_label_right?: string;
  about_analogy_label_center?: string;
  about_evolution_title?: string;
  about_evolution_subtitle?: string;
}

export interface Experience {
  id: string;
  period: string;
  title: string;
  description: string;
  type: 'work' | 'education' | 'other';
  display_order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon_name: string;
  class_name: string;
  display_order: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  category_id: string;
  name: string;
  icon_key: string;
  display_order: number;
}

export interface Project {
  id: string;
  title: string;
  category?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  tech_stack: string[];
  demo_link: string;
  github_link: string;
  image_path: string;
  is_featured: boolean;
  key_features?: string[];
  challenges?: string[];
  created_at: string;
}

export interface Availability {
  id: string;
  item_text: string;
  display_order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  icon_color: string;
  display_order: number;
  is_active: boolean;
}

export interface Stat {
  id: string;
  number: string;
  label: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

export interface TechTag {
  id: string;
  name: string;
  category: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

interface SelectOptions {
  count?: 'exact' | 'planned' | 'estimated';
  head?: boolean;
}

class QueryBuilder {
  private desc: QueryDescription;
  private headFlag = false;

  constructor(table: string) {
    this.desc = {
      table,
      action: 'select',
      filters: [],
      orders: [],
    };
  }

  select(fields = '*', options?: SelectOptions) {
    this.desc.selectFields = fields;
    if (options?.head) {
      this.headFlag = true;
      this.desc.limitCount = 0; // Don't return actual data rows if head-only check
    }
    return this;
  }

  eq(field: string, value: any) {
    this.desc.filters = this.desc.filters || [];
    this.desc.filters.push({ type: 'eq', field, value });
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.desc.orders = this.desc.orders || [];
    this.desc.orders.push({ field, ascending: options?.ascending !== false });
    return this;
  }

  limit(num: number) {
    this.desc.limitCount = num;
    return this;
  }

  single() {
    this.desc.singleFlag = true;
    return this;
  }

  insert(data: any) {
    this.desc.action = 'insert';
    this.desc.data = data;
    return this;
  }

  update(data: any) {
    this.desc.action = 'update';
    this.desc.data = data;
    return this;
  }

  delete() {
    this.desc.action = 'delete';
    return this;
  }

  async execute() {
    let result: { data: any; error: any };
    
    if (typeof window === 'undefined') {
      // Server-side: run directly against Postgres pool
      const { executeDbQuery } = await import('./db-executor');
      result = await executeDbQuery(this.desc);
    } else {
      // Client-side: call generic DB gateway route
      try {
        const res = await fetch('/api/db-gateway', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.desc),
        });
        if (!res.ok) {
          const errData = await res.json();
          result = { data: null, error: { message: errData.error || 'Request failed' } };
        } else {
          result = await res.json();
        }
      } catch (err: any) {
        result = { data: null, error: { message: err.message || 'Network error' } };
      }
    }

    // Adapt type signature for select count/head features
    if (this.desc.action === 'select') {
      const dataArr = Array.isArray(result.data) ? result.data : result.data ? [result.data] : [];
      return {
        data: this.headFlag ? null : result.data,
        error: result.error,
        count: dataArr.length,
      };
    }

    return result;
  }

  // Standard thenable interface to support direct await
  async then(onfulfilled: (value: any) => any, onrejected?: (reason: any) => any) {
    try {
      const result = await this.execute();
      return onfulfilled(result);
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }
}

export const supabase = {
  from: (table: string) => {
    return new QueryBuilder(table);
  },
  storage: {
    from: (bucket: string) => ({
      upload: async (filePath: string, file: File, options?: any) => {
        try {
          const folder = bucket === 'portfolio-assets' ? 'portfolio-assets' : 'projects';
          // Upload file via wrapper which handles client/server check
          const url = await uploadImage(file, folder);
          return { data: { path: filePath, publicUrl: url }, error: null };
        } catch (err: any) {
          return { data: null, error: err };
        }
      },
      getPublicUrl: (filePath: string) => {
        const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || 'https://media.wannasingh.dev';
        const folder = bucket === 'portfolio-assets' ? 'portfolio-assets' : 'projects';
        // Note: files uploaded in projects have custom paths, but portfolio-assets goes directly under its prefix.
        // We match how getPublicUrl is expected to resolve based on the bucket/filePath.
        return {
          data: {
            publicUrl: `${cdnUrl}/Pictures/${folder}/${filePath}`,
          },
        };
      },
      remove: async (filePaths: string[]) => {
        try {
          for (const path of filePaths) {
            const folder = bucket === 'portfolio-assets' ? 'portfolio-assets' : 'projects';
            const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || 'https://media.wannasingh.dev';
            await deleteImage(`${cdnUrl}/Pictures/${folder}/${path}`);
          }
          return { data: filePaths, error: null };
        } catch (err: any) {
          return { data: null, error: err };
        }
      },
    }),
  },
  auth: {
    getUser: async () => {
      if (typeof window === 'undefined') {
        const { headers } = await import('next/headers');
        const reqHeaders = await headers();
        const cookieHeader = reqHeaders.get('cookie') || '';
        const match = cookieHeader.match(/session=([^;]+)/);
        if (!match) return { data: { user: null }, error: null };
        const { verifyJWT } = await import('./auth-utils');
        const payload = verifyJWT(match[1]);
        if (!payload) return { data: { user: null }, error: null };
        return { data: { user: { email: payload.email } }, error: null };
      } else {
        try {
          const res = await fetch('/api/auth/me');
          if (!res.ok) return { data: { user: null }, error: null };
          const data = await res.json();
          return { data: { user: data.user }, error: null };
        } catch {
          return { data: { user: null }, error: null };
        }
      }
    },
    signInWithPassword: async ({ email, password }: any) => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const body = await res.json();
        if (!res.ok) return { data: {}, error: { message: body.error || 'Login failed' } };
        return { data: { user: body.user }, error: null };
      } catch (err: any) {
        return { data: {}, error: { message: err.message || 'Login failed' } };
      }
    },
    signOut: async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
        return { error: null };
      } catch (err: any) {
        return { error: { message: err.message || 'Logout failed' } };
      }
    },
  },
};
