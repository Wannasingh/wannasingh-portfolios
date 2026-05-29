"use client";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Database, Globe } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
});

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "Oracle", label: "Certified DBA" },
  { value: "100%", label: "Client Satisfaction" },
];

const typicalItems = [
  "Builds UIs & REST APIs",
  "Relies on ORMs — inefficient at scale",
  "Treats the database as a black box",
  "Hits performance walls under load",
];

const hybridItems = [
  "Performance-first architecture from day one",
  "Deep Oracle schema & query optimisation",
  "PL/SQL tuning with advanced indexing",
  "Snappy React/Next.js UIs backed by fast data",
];

export default function HybridAdvantageSection() {
  return (
    <section className="py-28 relative overflow-hidden" id="advantage">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div {...fadeUp()} className="max-w-2xl mb-16">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">
            The Hybrid Advantage
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            One engineer.
            <br />
            <span className="text-gradient">The full picture.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Most developers stop at the API layer. I optimise the entire data journey —
            from the database disk block to the browser pixel.
          </p>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mb-16">
          {/* Standard */}
          <motion.div
            {...fadeUp(0.05)}
            className="relative p-7 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Standard
                </p>
                <h3 className="text-base font-bold text-muted-foreground">Full Stack Developer</h3>
              </div>
            </div>

            <ul className="space-y-3.5">
              {typicalItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 mt-0.5 text-red-400/70 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-5 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Functional, but hits walls as traffic grows.
              </p>
            </div>
          </motion.div>

          {/* Hybrid — highlighted */}
          <motion.div
            {...fadeUp(0.12)}
            className="relative p-7 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] to-violet-500/[0.04] shadow-lg shadow-primary/[0.06]"
          >
            <div className="absolute top-4 right-4">
              <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                My Approach
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Database className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Hybrid
                </p>
                <h3 className="text-base font-bold">Full Stack Architect</h3>
              </div>
            </div>

            <ul className="space-y-3.5">
              {hybridItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-5 border-t border-primary/15">
              <p className="text-xs text-center font-semibold text-primary">
                Scalable systems, fast by design — not by chance.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.2)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col gap-1 p-5 rounded-xl bg-secondary/60 border border-border"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground tabular-nums">
                {value}
              </span>
              <span className="text-xs text-muted-foreground font-medium leading-snug">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
