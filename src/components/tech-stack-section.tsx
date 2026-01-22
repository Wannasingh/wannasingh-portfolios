"use client";
import { useEffect, useState } from "react";
import { Code2, Database, Layout, Server, Settings, Terminal, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { supabase, SkillCategory, Skill } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";
import { 
  SiOracle, SiPostgresql, SiDatabricks, SiApachespark, SiVeritas, 
  SiNodedotjs, SiDotnet, SiOpenapiinitiative, SiGraphql, SiRedis, SiDocker,
  SiReact, SiNextdotjs, SiTypescript, SiFramer, SiRedux, SiTailwindcss
} from "react-icons/si";
import { MdSecurity } from "react-icons/md"; // Using Material design shield for Data Guard if SiShield not available

// Helper to map icon string name to Lucide component (for Categories)
const CategoryIconMap: { [key: string]: any } = {
  Database: Database,
  Server: Server,
  Code2: Code2,
  Layout: Layout,
  Settings: Settings,
  Terminal: Terminal,
  Cpu: Cpu,
};

// Helper to map string keys to React Icons (for Skills)
// We use a fallback if the key isn't found
const SkillIconMap: { [key: string]: any } = {
  SiOracle: SiOracle,
  SiPostgresql: SiPostgresql,
  SiDatabricks: SiDatabricks,
  SiApachespark: SiApachespark,
  SiVeritas: SiVeritas,
  SiShield: MdSecurity, // Fallback for "Data Guard"
  SiNodedotjs: SiNodedotjs,
  SiDotnet: SiDotnet,
  SiOpenapiinitiative: SiOpenapiinitiative,
  SiGraphql: SiGraphql,
  SiRedis: SiRedis,
  SiDocker: SiDocker,
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiFramer: SiFramer,
  SiRedux: SiRedux,
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
             const CategoryIcon = category.icon_name && CategoryIconMap[category.icon_name] ? CategoryIconMap[category.icon_name] : Code2;
             
             return (
             <motion.div
                key={category.id || idx}
                whileHover={{ y: -5 }}
                className={`flex flex-col p-6 rounded-xl border ${category.class_name} transition-all`}
             >
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-background shadow-sm">
                      <CategoryIcon className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                   {category.skills.map(skill => {
                      const SkillIcon = skill.icon_key && SkillIconMap[skill.icon_key] ? SkillIconMap[skill.icon_key] : null;
                      return (
                        <span key={skill.id} className="flex items-center gap-2 px-3 py-1.5 bg-background/50 border border-black/5 dark:border-white/10 rounded-md text-sm font-medium hover:bg-background/80 transition-colors">
                            {SkillIcon && <SkillIcon className="w-4 h-4" />}
                            {skill.name}
                        </span>
                      );
                   })}
                </div>
             </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
