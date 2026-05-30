"use client";
import { useEffect, useState } from "react";
import { Code2, Database, Layout, Server, Settings, Terminal, Cpu, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { supabase, SkillCategory, Skill } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";
import {
  SiOracle, SiPostgresql, SiDatabricks, SiApachespark, SiVeritas,
  SiNodedotjs, SiDotnet, SiOpenapiinitiative, SiGraphql, SiRedis, SiDocker,
  SiReact, SiNextdotjs, SiTypescript, SiFramer, SiRedux, SiTailwindcss,
} from "react-icons/si";
import { MdSecurity } from "react-icons/md";

const CategoryIconMap: Record<string, LucideIcon> = {
  Database, Server, Code2, Layout, Settings, Terminal, Cpu,
};

const SkillIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiOracle, SiPostgresql, SiDatabricks, SiApachespark, SiVeritas,
  SiShield: MdSecurity, SiNodedotjs, SiDotnet, SiOpenapiinitiative,
  SiGraphql, SiRedis, SiDocker, SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiFramer, SiRedux,
};

const FALLBACK_CATEGORIES: SkillCategory[] = [
  {
    id: "1", name: "Database & Oracle", icon_name: "Database", class_name: "", display_order: 1,
    skills: [
      { id: "1", name: "Oracle 21c", icon_key: "SiOracle", category_id: "1", display_order: 1 },
      { id: "2", name: "PostgreSQL", icon_key: "SiPostgresql", category_id: "1", display_order: 2 },
      { id: "3", name: "PL/SQL", icon_key: "", category_id: "1", display_order: 3 },
      { id: "4", name: "Data Guard", icon_key: "SiShield", category_id: "1", display_order: 4 },
      { id: "5", name: "Databricks", icon_key: "SiDatabricks", category_id: "1", display_order: 5 },
    ],
  },
  {
    id: "2", name: "Backend & API", icon_name: "Server", class_name: "", display_order: 2,
    skills: [
      { id: "6", name: "Node.js", icon_key: "SiNodedotjs", category_id: "2", display_order: 1 },
      { id: "7", name: "GraphQL", icon_key: "SiGraphql", category_id: "2", display_order: 2 },
      { id: "8", name: "Redis", icon_key: "SiRedis", category_id: "2", display_order: 3 },
      { id: "9", name: "Docker", icon_key: "SiDocker", category_id: "2", display_order: 4 },
    ],
  },
  {
    id: "3", name: "Frontend", icon_name: "Layout", class_name: "", display_order: 3,
    skills: [
      { id: "10", name: "React", icon_key: "SiReact", category_id: "3", display_order: 1 },
      { id: "11", name: "Next.js", icon_key: "SiNextdotjs", category_id: "3", display_order: 2 },
      { id: "12", name: "TypeScript", icon_key: "SiTypescript", category_id: "3", display_order: 3 },
      { id: "13", name: "Tailwind CSS", icon_key: "SiTailwindcss", category_id: "3", display_order: 4 },
    ],
  },
];

export default function TechStackSection() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCategories(FALLBACK_CATEGORIES);
      setLoading(false);
    }, 5000);

    supabase
      .from("skill_categories")
      .select(`*, skills (*)`)
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        clearTimeout(timeout);
        if (!error && data && data.length > 0) {
          const categoriesData = data as unknown as (SkillCategory & { skills: Skill[] })[];
          setCategories(
            categoriesData.map((cat) => ({
              ...cat,
              skills: [...cat.skills].sort((a, b) => a.display_order - b.display_order),
            }))
          );
        } else {
          setCategories(FALLBACK_CATEGORIES);
        }
        setLoading(false);
      });

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <section className="py-28" id="skills">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 relative" id="skills">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mono text-xs text-primary tracking-widest uppercase mb-3">
            Technical Depth
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            The stack behind
            <br />
            <span className="text-gradient">every decision.</span>
          </h2>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category, idx) => {
            const CategoryIcon =
              category.icon_name && CategoryIconMap[category.icon_name]
                ? CategoryIconMap[category.icon_name]
                : Code2;

            return (
              <motion.div
                key={category.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CategoryIcon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => {
                    const SkillIcon =
                      skill.icon_key && SkillIconMap[skill.icon_key]
                        ? SkillIconMap[skill.icon_key]
                        : null;
                    return (
                      <span
                        key={skill.id}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-secondary mono text-[11px] text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors duration-150 cursor-default"
                      >
                        {SkillIcon && <SkillIcon className="w-3 h-3" />}
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
