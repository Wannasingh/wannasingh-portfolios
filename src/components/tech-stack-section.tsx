"use client";
import { useEffect, useState } from "react";
import { Code2, Database, Layout, Server, Settings, Terminal, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { supabase, SkillCategory, Skill } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";

// Helper to map icon string name to Lucide component
const IconMap: { [key: string]: any } = {
  Database: Database,
  Server: Server,
  Code2: Code2,
  Layout: Layout,
  Settings: Settings,
  Terminal: Terminal,
  Cpu: Cpu,
};

export default function TechStackSection() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      // Fetch categories with nested skills, ordered by display_order
      const { data, error } = await supabase
        .from('skill_categories')
        .select(`
          *,
          skills (*)
        `)
        .order('display_order', { ascending: true });
        
      if (error) {
        console.error("Error fetching skills:", error);
      } else {
        // Sort individual skills within categories locally just to be safe/easy
        const sortedData = data?.map((cat: any) => ({
            ...cat,
            skills: cat.skills.sort((a: Skill, b: Skill) => a.display_order - b.display_order)
        })) || [];
        setCategories(sortedData);
      }
      setLoading(false);
    }
    fetchSkills();
  }, []);

  if (loading) {
     return (
        <section className="py-24" id="skills">
            <div className="container mx-auto px-4 md:px-6 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        </section>
     );
  }

  return (
    <section className="py-24" id="skills">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
          Technical Arsenal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, idx) => {
             const IconComponent = category.icon_name && IconMap[category.icon_name] ? IconMap[category.icon_name] : Code2;
             
             return (
             <motion.div
                key={category.id || idx}
                whileHover={{ y: -5 }}
                className={`flex flex-col p-6 rounded-xl border ${category.class_name} transition-all`}
             >
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-background shadow-sm">
                      <IconComponent className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                   {category.skills.map(skill => (
                      <span key={skill.id} className="px-3 py-1 bg-background/50 border border-black/5 dark:border-white/10 rounded-md text-sm font-medium">
                         {skill.name}
                      </span>
                   ))}
                </div>
             </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
