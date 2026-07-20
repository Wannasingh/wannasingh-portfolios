"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { db, Project } from '@/app/lib/api-client';

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Enterprise HR System Migration",
    category: "Database",
    problem: "Legacy Oracle 11g system with unindexed queries causing 30-second page loads across 5,000 employees.",
    solution: "Redesigned schema with composite indexing, partitioned large tables by year, and rewrote 40+ PL/SQL procedures.",
    impact: "Query time reduced from 30s to under 200ms. System load dropped 60%.",
    tech_stack: ["Oracle 21c", "PL/SQL", "Next.js", "Node.js", "TypeScript"],
    demo_link: "#",
    github_link: "#",
    image_path: "",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Real-time Analytics Dashboard",
    category: "Full Stack",
    problem: "Finance team needed live KPI visibility across 12 business units with data refreshing every minute.",
    solution: "Built a Next.js dashboard with server-sent events, Oracle materialized views, and Redis caching layer.",
    impact: "Report generation time: 4 hours → real-time. Adopted by all 12 business units within 2 weeks.",
    tech_stack: ["Next.js", "React", "Oracle DB", "Redis", "TypeScript", "Tailwind CSS"],
    demo_link: "#",
    github_link: "#",
    image_path: "",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

export default function FeaturedProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loaded = false;
    // Timeout after 5s to avoid infinite spinner when Supabase is unreachable
    const timeout = setTimeout(() => {
      if (!loaded) {
        setProjects(FALLBACK_PROJECTS);
        setLoading(false);
      }
    }, 5000);

    db
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        loaded = true;
        clearTimeout(timeout);
        setProjects(data && data.length > 0 ? data : FALLBACK_PROJECTS);
        setLoading(false);
      });

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <section className="py-28" id="projects">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative" id="projects">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-handwriting text-2xl text-primary font-bold tracking-wide mb-2">
              {"// Selected Work"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#191919] dark:text-foreground font-serif-elegant">
              Problems solved.
              <br />
              <span className="text-primary font-bold">Results measured.</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group"
          >
            All projects
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <motion.article
              key={project.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative p-6 sm:p-8 bg-white dark:bg-card hand-drawn-border-1"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-dashed border-border/80">
                <div className="flex flex-wrap items-center gap-3">
                  {project.category && (
                    <span className="px-2 py-0.5 border border-primary/40 bg-primary/5 text-[10px] font-mono text-primary font-semibold uppercase rounded-none">
                      {project.category}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#191919] dark:text-foreground font-serif-elegant group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                </div>
                {/* Links */}
                <div className="flex gap-4 shrink-0 font-mono text-xs text-[#696969] dark:text-muted-foreground">
                  {project.github_link && project.github_link !== "#" && (
                    <Link href={project.github_link} target="_blank" rel="noopener noreferrer"
                      className="hover:text-primary transition-colors flex items-center gap-1">
                      {"// SOURCE"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                  {project.demo_link && project.demo_link !== "#" && (
                    <Link href={project.demo_link} target="_blank" rel="noopener noreferrer"
                      className="hover:text-primary transition-colors text-primary flex items-center gap-1 font-bold">
                      {"// LIVE"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>

              {/* PSI: Problem / Solution / Impact */}
              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                {[
                  { label: "Problem", value: project.problem, accent: "text-rose-500 font-bold" },
                  { label: "Solution", value: project.solution, accent: "text-primary font-bold" },
                  { label: "Impact", value: project.impact, accent: "text-emerald-600 font-bold" },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="space-y-1.5">
                    <p className={`font-handwriting text-lg leading-none ${accent}`}>
                      {label}
                    </p>
                    <p className="text-sm text-[#696969] dark:text-muted-foreground leading-relaxed font-sans">{value}</p>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-dashed border-border/80">
                {project.tech_stack?.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 border border-border/80 bg-secondary/30 text-[10px] font-mono text-muted-foreground uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile: view all */}
        <div className="flex justify-center mt-10 sm:hidden">
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
