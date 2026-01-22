"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { supabase, Project } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";

export default function FeaturedProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('is_featured', true)
            .order('created_at', { ascending: false }); // or display_order if I added it, but created_at is fine for now

        if (error) {
            console.error("Error fetching featured projects:", error);
        } else {
            setFeaturedProjects(data || []);
        }
        setLoading(false);
    }
    fetchFeatured();
  }, []);

  if (loading) {
      return (
          <section className="py-24 bg-background" id="projects">
              <div className="container mx-auto px-4 md:px-6 flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
          </section>
      );
  }

  return (
    <section className="py-24 bg-background" id="projects">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
            Project Showcase
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Solvers, Not Just Coders
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Real problems. Complex data. Measurable impact.
          </p>
        </div>

        <div className="grid gap-12 max-w-5xl mx-auto">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <span className="text-sm text-primary font-mono">{project.category}</span>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="grid gap-4 text-sm border-l-2 border-primary/20 pl-4 my-4">
                  <div>
                    <span className="font-semibold text-foreground">The Problem:</span>{" "}
                    <span className="text-muted-foreground">{project.problem}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">My Solution:</span>{" "}
                    <span className="text-muted-foreground">{project.solution}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Impact:</span>{" "}
                    <span className="text-primary font-medium">{project.impact}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech_stack?.map((tech) => (
                    <span 
                      key={tech} 
                      className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Area / Links */}
              <div className="flex flex-col justify-between pt-4 md:pt-0 md:border-l md:pl-6">
                <p className="text-sm text-muted-foreground italic mb-4">
                    &quot;Leveraging deep database knowledge to solve frontend latency.&quot;
                </p>
                <div className="flex gap-4 md:flex-col mt-auto">
                    {project.demo_link && project.demo_link !== '#' && (
                        <Link href={project.demo_link} className="flex items-center text-sm font-medium hover:text-primary">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                    )}
                    {project.github_link && project.github_link !== '#' && (
                        <Link href={project.github_link} className="flex items-center text-sm font-medium hover:text-primary">
                            <Github className="mr-2 h-4 w-4" /> View Code
                        </Link>
                    )}
                     {/* Handling placeholders if links are '#' or empty */}
                     {(project.demo_link === '#' || !project.demo_link) && (
                         <span className="flex items-center text-sm font-medium text-muted-foreground/50 cursor-not-allowed">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo (Private)
                         </span>
                     )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
