"use client";
import { useEffect, useState } from "react";
import { Code2, Database, Layout, Server, Settings, Terminal, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { supabase, SkillCategory, Skill } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";
import {
  SiOracle, SiPostgresql, SiDatabricks, SiApachespark, SiVeritas,
  SiNodedotjs, SiDotnet, SiOpenapiinitiative, SiGraphql, SiRedis, SiDocker,
  SiReact, SiNextdotjs, SiTypescript, SiFramer, SiRedux, SiTailwindcss,
} from "react-icons/si";
import { MdSecurity } from "react-icons/md";

const CategoryIconMap: Record<string, any> = {
  Database, Server, Code2, Layout, Settings, Terminal, Cpu,
};

const SkillIconMap: Record<string, any> = {
  SiOracle, SiPostgresql, SiDatabricks, SiApachespark, SiVeritas,
  SiShield: MdSecurity, SiNodedotjs, SiDotnet, SiOpenapiinitiative,
  SiGraphql, SiRedis, SiDocker, SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiFramer, SiRedux,
};

export default function TechStackSection() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("skill_categories")
      .select(`*, skills (*)`)
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          setCategories(
            data?.map((cat: any) => ({
              ...cat,
              skills: cat.skills.sort((a: Skill, b: Skill) => a.display_order - b.display_order),
            })) || []
          );
        }
        setLoading(false);
      });
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
