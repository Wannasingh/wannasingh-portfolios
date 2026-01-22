"use client";
import { motion } from "framer-motion";
import { Layers, Database, Gauge, Server, Smartphone, Globe } from "lucide-react";

export default function HybridAdvantageSection() {
  return (
    <section className="py-24 bg-secondary/20" id="advantage">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            The Hybrid Advantage
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">
            Why Hire Two Roles When You Can Have One?
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Most developers stop at the API layer. I optimize the entire journey of your data, 
            from the disk block to the pixel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Dev Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="flex flex-col p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6 opacity-70">
              <div className="p-3 rounded-full bg-muted">
                <Globe className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground">Standard Full Stack</h3>
            </div>
            
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Smartphone className="w-5 h-5 mt-0.5 shrink-0" />
                <span>Builds responsive UIs & APIs</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Server className="w-5 h-5 mt-0.5 shrink-0" />
                <span>Uses ORMs for everything (often inefficient)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Layers className="w-5 h-5 mt-0.5 shrink-0" />
                <span>Treats the database as a &quot;black box&quot;</span>
              </li>
            </ul>
            
            <div className="mt-8 pt-6 border-t border-border text-sm text-center text-muted-foreground">
              Result: Functional, but often hits performance walls at scale.
            </div>
          </motion.div>

          {/* Hybrid Dev Card (Highlighted) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex flex-col p-8 rounded-2xl border border-primary/20 bg-gradient-to-b from-card to-background shadow-2xl ring-1 ring-primary/20"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                MY APPROACH
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">The Hybrid Engineer</h3>
            </div>
            
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3">
                <Gauge className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="font-medium">Performance-Driven Architecture</span>
                <p className="sr-only">Optimizes queries and indexing strategies before writing code.</p>
              </li>
              <li className="flex items-start gap-3">
                <Database className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="font-medium">Deep Schema Optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <Server className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="font-medium">Seamless Full-Stack Integration</span>
              </li>
            </ul>
             <div className="mt-4 space-y-2 text-sm text-muted-foreground pl-8">
                <p>• Tuning PL/SQL & SQL queries for speed.</p>
                <p>• Advanced partitioning & indexing.</p>
                <p>• React/Next.js for modern, snappy UIs.</p>
             </div>

            <div className="mt-8 pt-6 border-t border-primary/10 text-sm font-semibold text-center text-primary">
              Result: Scalable apps that are fast by design, not just by accident.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
