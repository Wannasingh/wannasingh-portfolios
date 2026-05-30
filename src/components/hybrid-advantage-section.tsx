"use client";
import { motion } from "framer-motion";
import { Database, Globe, Gauge, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    icon: Database,
    number: "01",
    title: "Database Architecture",
    description:
      "Oracle 21c design, PL/SQL optimisation, partitioning strategies, and performance tuning that handles millions of records without breaking a sweat.",
    tags: ["Oracle DB", "PL/SQL", "Indexing", "Data Guard"],
  },
  {
    icon: Globe,
    number: "02",
    title: "Full Stack Development",
    description:
      "End-to-end web applications with Next.js and Node.js — from database schema to deployed product. Clean code, tested, and built to last.",
    tags: ["Next.js", "Node.js", "TypeScript", "REST & GraphQL"],
  },
  {
    icon: Gauge,
    number: "03",
    title: "System Optimisation",
    description:
      "When your app is slow, I find why. Deep profiling from SQL query plans to frontend bundle sizes — fixing the root cause, not the symptoms.",
    tags: ["Query Tuning", "Performance", "Monitoring", "Scalability"],
  },
];

export default function HybridAdvantageSection() {
  return (
    <section className="py-28 relative overflow-hidden" id="advantage">
      {/* Top separator */}
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
            <p className="mono text-xs text-primary tracking-widest uppercase mb-3">
              What I Build
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
              Engineering from
              <br />
              <span className="text-gradient">disk to display.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed sm:text-right">
            Most developers work one layer. I own the full stack — database to browser.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative group p-6 rounded-xl border border-border bg-card card-glow flex flex-col"
              >
                {/* Number */}
                <span className="mono text-[10px] text-muted-foreground tracking-widest mb-5">
                  {service.number}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md border border-border bg-secondary mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500 rounded-t-xl" />
              </motion.div>
            );
          })}
        </div>

        {/* Why hire one — compact callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-6 p-6 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <p className="text-sm font-bold text-foreground mb-1">
              Why hire one person for all three?
            </p>
            <p className="text-sm text-muted-foreground max-w-xl">
              Because when the database engineer <em>is</em> the frontend developer, there are no
              translation errors between layers — only faster, better decisions.
            </p>
          </div>
          <a
            href="/about"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4 transition-colors"
          >
            More about me <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
