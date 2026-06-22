/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
// ponytail: mock supabase client to route all queries and operations locally to Next.js API endpoints

class QueryBuilder {
  table: string;
  actions: Array<{ type: string; args: unknown[] }> = [];

  constructor(table: string) {
    this.table = table;
  }

  select(...args: unknown[]) { this.actions.push({ type: 'select', args }); return this; }
  insert(...args: unknown[]) { this.actions.push({ type: 'insert', args }); return this; }
  update(...args: unknown[]) { this.actions.push({ type: 'update', args }); return this; }
  delete(...args: unknown[]) { this.actions.push({ type: 'delete', args }); return this; }
  eq(...args: unknown[]) { this.actions.push({ type: 'eq', args }); return this; }
  order(...args: unknown[]) { this.actions.push({ type: 'order', args }); return this; }
  single(...args: unknown[]) { this.actions.push({ type: 'single', args }); return this; }
  limit(...args: unknown[]) { this.actions.push({ type: 'limit', args }); return this; }

  // Promise-like
  async then(
    onfulfilled?: (value: { data: any; error: any; count?: number }) => any,
    onrejected?: (reason: any) => any
  ): Promise<any> {
    try {
      // Fetch via Next.js API endpoint.
      // We use absolute URL on server if needed, but relative URL works at runtime.
      // At build time, we wrap in try-catch to prevent build failures.
      const baseUrl = typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') : '';
      const res = await fetch(`${baseUrl}/api/db-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: this.table, actions: this.actions }),
        next: { revalidate: 0 } // disable cache
      });
      const data = (await res.json()) as { data: any; error: any; count?: number };
      if (onfulfilled) return onfulfilled(data as any);
      return data;
    } catch (err) {
      if (onrejected) return onrejected(err);
      // Fallback response instead of throwing to prevent build crash
      const fallback = { data: null, error: err };
      if (onfulfilled) return onfulfilled(fallback as any);
      return fallback;
    }
  }
}

export const supabase = {
  from(table: string) {
    return new QueryBuilder(table);
  },
  auth: {
    async getUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (!res.ok) return { data: { user: null }, error: null };
        const data = await res.json();
        return { data: { user: data.user }, error: null };
      } catch (err) {
        return { data: { user: null }, error: err };
      }
    },
    async signInWithPassword({ email, password }: Record<string, string>) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
          const errData = await res.json();
          return { data: null, error: new Error(errData.message || 'Login failed') };
        }
        const data = await res.json();
        return { data, error: null };
      } catch (err) {
        return { data: null, error: err };
      }
    },
    async signOut() {
      await fetch('/api/auth/logout', { method: 'POST' });
      return { error: null };
    }
  },
  storage: {
    from(bucket: string) {
      return {
        async upload(filePath: string, file: File, options?: any) {
          try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('path', filePath);
            formData.append('bucket', bucket);
            const res = await fetch('/api/storage/upload', {
              method: 'POST',
              body: formData
            });
            if (!res.ok) {
              const err = await res.json();
              return { data: null, error: new Error(err.message || 'Upload failed') };
            }
            const data = await res.json();
            return { data: { path: data.path }, error: null };
          } catch (err) {
            return { data: null, error: err };
          }
        },
        async remove(paths: string[]) {
          try {
            const res = await fetch('/api/storage/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paths, bucket })
            });
            if (!res.ok) {
              return { error: new Error('Delete failed') };
            }
            return { error: null };
          } catch (err) {
            return { error: err };
          }
        },
        getPublicUrl(path: string) {
          return { data: { publicUrl: `/uploads/${bucket}/${path}` } };
        },
        async list(folder: string, options?: any) {
          try {
            const res = await fetch(`/api/storage/list?bucket=${bucket}&folder=${folder}`);
            if (!res.ok) {
              return { data: null, error: new Error('List failed') };
            }
            const data = await res.json();
            return { data, error: null };
          } catch (err) {
            return { data: null, error: err };
          }
        }
      };
    }
  }
};

// Original interface types
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
