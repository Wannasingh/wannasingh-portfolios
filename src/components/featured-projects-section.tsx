"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Actually, to be safe I will use standard standard Tailwind classes for badges to avoid dependency issues if Badge isn't there.

const projects = [
  {
    title: "Financial Data Warehouse Migration",
    category: "Enterprise System",
    problem: "Legacy reporting took 20+ minutes to generate, causing business delays.",
    solution: "Redesigned Oracle schema with partitioning, implemented materialized views, and built a Next.js dashboard with cached API routes.",
    impact: "95% reduction in report generation time (20m → 45s).",
    stack: ["Oracle 19c", "PL/SQL", "Next.js", "Node.js"],
    links: { demo: "#", github: "#" }
  },
  {
    title: "Real-time Logistics Tracker",
    category: "Full Stack App",
    problem: "Delivery drivers faced sync issues in low-connectivity areas, corrupting database records.",
    solution: "Implemented an offline-first architecture with local SQLite sync to a central Postgres DB, handled via a robust Node.js API.",
    impact: "Zero data loss during beta testing with 50+ drivers.",
    stack: ["React Native", "Postgres", "Node.js", "Redis"],
    links: { demo: "#", github: "#" }
  },
  {
    title: "E-Commerce Inventory Sync",
    category: "API Integration",
    problem: "Overselling items due to race conditions in the checkout flow.",
    solution: "Utilized database row-level locking and transaction isolation levels to Ensure consistency.",
    impact: "Eliminated overselling incidents completely during Black Friday traffic.",
    stack: ["Next.js", "Oracle Cloud", "Stripe API", "C# .NET"],
    links: { demo: "#", github: "#" }
  }
];

export default function FeaturedProjectsSection() {
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
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
                  {project.stack.map((tech) => (
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
                    <Link href={project.links.demo} className="flex items-center text-sm font-medium hover:text-primary">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                    <Link href={project.links.github} className="flex items-center text-sm font-medium hover:text-primary">
                        <Github className="mr-2 h-4 w-4" /> View Code
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
