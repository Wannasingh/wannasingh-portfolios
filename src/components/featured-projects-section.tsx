"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase, Project } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function FeaturedProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false });
      if (!error) setFeaturedProjects(data || []);
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-28" id="projects">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 bg-background" id="projects">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div {...fadeUp()} className="max-w-2xl mb-16">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Projects with
            <br />
            <span className="text-gradient">measurable impact.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real challenges. Complex data. Results that matter.
          </p>
        </motion.div>

        {/* Project list */}
        <div className="flex flex-col gap-6 max-w-4xl">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id || index}
              {...fadeUp(index * 0.08)}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.06] transition-all duration-300"
            >
              {/* Top accent */}
              <div className="h-px bg-gradient-to-r from-primary/60 via-violet-500/40 to-transparent" />

              <div className="p-7 sm:p-8">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex flex-col gap-2">
                    {project.category && (
                      <span className="text-xs font-bold text-primary tracking-widest uppercase">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 shrink-0">
                    {project.github_link && project.github_link !== "#" && (
                      <Link
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View source"
                        className="p-2 rounded-lg border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-150"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {project.demo_link && project.demo_link !== "#" && (
                      <Link
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live demo"
                        className="p-2 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-150"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Problem / Solution / Impact */}
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Problem", content: project.problem, border: "border-l-red-400/60" },
                    { label: "Solution", content: project.solution, border: "border-l-primary/60" },
                    { label: "Impact", content: project.impact, border: "border-l-emerald-500/60", highlight: true },
                  ].map(({ label, content, border, highlight }) => (
                    <div key={label} className={`pl-3 border-l-2 ${border}`}>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                        {label}
                      </p>
                      <p className={`text-sm leading-relaxed ${highlight ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-secondary border border-border text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <motion.div {...fadeUp(0.2)} className="mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
          >
            View all projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
