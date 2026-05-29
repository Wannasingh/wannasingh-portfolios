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
import { MdSecurity } from "react-icons/md";

const CategoryIconMap: { [key: string]: any } = {
  Database, Server, Code2, Layout, Settings, Terminal, Cpu,
};

const SkillIconMap: { [key: string]: any } = {
  SiOracle, SiPostgresql, SiDatabricks, SiApachespark,
  SiVeritas, SiShield: MdSecurity,
  SiNodedotjs, SiDotnet, SiOpenapiinitiative, SiGraphql,
  SiRedis, SiDocker, SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiFramer, SiRedux,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function TechStackSection() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase
        .from("skill_categories")
        .select(`*, skills (*)`)
        .order("display_order", { ascending: true });

      if (!error) {
        const sortedData = data?.map((cat: any) => ({
          ...cat,
          skills: cat.skills.sort((a: Skill, b: Skill) => a.display_order - b.display_order),
        })) || [];
        setCategories(sortedData);
      }
      setLoading(false);
    }
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="py-28" id="skills">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 relative overflow-hidden" id="skills">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div {...fadeUp()} className="max-w-2xl mb-16">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">
            Technical Proficiency
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Tools &amp; technologies
            <br />
            <span className="text-gradient">I work with daily.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From enterprise-grade database systems to production-ready frontend frameworks.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
          {categories.map((category, idx) => {
            const CategoryIcon =
              category.icon_name && CategoryIconMap[category.icon_name]
                ? CategoryIconMap[category.icon_name]
                : Code2;

            return (
              <motion.div
                key={category.id || idx}
                {...fadeUp(idx * 0.05)}
                className="flex flex-col p-5 rounded-xl border border-border bg-card hover:border-primary/25 hover:shadow-sm transition-all duration-200"
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CategoryIcon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{category.name}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => {
                    const SkillIcon =
                      skill.icon_key && SkillIconMap[skill.icon_key]
                        ? SkillIconMap[skill.icon_key]
                        : null;
                    return (
                      <span
                        key={skill.id}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary border border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors duration-150 cursor-default"
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
