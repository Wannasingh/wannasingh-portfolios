"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Server, Layout, Settings } from "lucide-react";
import {
  SiOracle, SiPostgresql, SiSupabase, SiRedis, SiGo, SiPython, SiDotnet,
  SiNodedotjs, SiVault, SiReact, SiNextdotjs, SiAstro,
  SiNuxtdotjs, SiSwift, SiDocker, SiTerraform, SiJenkins,
  SiSonarqube, SiGrafana, SiCypress, SiFastapi
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  desc: string;
}

interface TechGroup {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  items: TechItem[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    category: "Databases & Cloud",
    icon: Database,
    description: "Enterprise data design, indexing, replication, and high-availability cloud architecture.",
    items: [
      { name: "Oracle 21c", icon: SiOracle, color: "#F80000", desc: "DB System Admin" },
      { name: "Oracle OCI", icon: SiOracle, color: "#0072C6", desc: "VCN & Cloud Infra" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", desc: "Relational DB" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", desc: "Backend-as-a-Service" },
      { name: "Redis Cache", icon: SiRedis, color: "#DC382D", desc: "In-Memory Store" },
      { name: "Data Guard", icon: SiOracle, color: "#F80000", desc: "HA Replication" }
    ]
  },
  {
    category: "Backend & Systems",
    icon: Server,
    description: "Robust API services, transaction handling, and secure database gateways.",
    items: [
      { name: "Go (Golang)", icon: SiGo, color: "#00ADD8", desc: "High-Concur API" },
      { name: "Python", icon: SiPython, color: "#3776AB", desc: "Data & Systems" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688", desc: "Fast REST Services" },
      { name: "C# .NET", icon: SiDotnet, color: "#512BD4", desc: "Enterprise API" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", desc: "Express Gateway" },
      { name: "HashiCorp Vault", icon: SiVault, color: "#000000", desc: "Secrets Storage" }
    ]
  },
  {
    category: "Frontend & Mobile",
    icon: Layout,
    description: "Declarative UI rendering, cross-platform apps, and search optimized static generators.",
    items: [
      { name: "React 19", icon: SiReact, color: "#61DAFB", desc: "Web UI Views" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000", desc: "App Router SSR" },
      { name: "Astro", icon: SiAstro, color: "#FF5D01", desc: "Headless Content" },
      { name: "Vue & Nuxt", icon: SiNuxtdotjs, color: "#00DC82", desc: "Reactive Portal" },
      { name: "React Native", icon: SiReact, color: "#61DAFB", desc: "Expo Mobile App" },
      { name: "SwiftUI", icon: SiSwift, color: "#F05138", desc: "iOS Native Widget" }
    ]
  },
  {
    category: "DevOps & Pipelines",
    icon: Settings,
    description: "Continuous integration automation, pipeline safety, quality checking, and metric dashboards.",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED", desc: "Container Lab" },
      { name: "Terraform", icon: SiTerraform, color: "#7B42BC", desc: "IaC DB Deploy" },
      { name: "Jenkins CI", icon: SiJenkins, color: "#D24939", desc: "CD Orchestrator" },
      { name: "SonarQube", icon: SiSonarqube, color: "#4E9BCD", desc: "Linting & Testing" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800", desc: "Query Metrics" },
      { name: "Cypress", icon: SiCypress, color: "#17202C", desc: "E2E Testing" }
    ]
  }
];

function TechCardItem({ item }: { item: TechItem }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="relative p-3.5 border border-border bg-card flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-primary/30 group rounded-none select-none overflow-hidden"
    >
      {/* Dynamic color glow backing */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: item.color }}
      />

      {/* Modern animated brand icon */}
      <Icon 
        className="w-7 h-7 mb-2.5 transition-colors duration-300"
        style={{ color: hovered ? item.color : "var(--muted-foreground)" }}
      />
      
      {/* Title */}
      <p className="text-[10px] font-bold text-foreground uppercase tracking-wide truncate max-w-full">
        {item.name}
      </p>

      {/* Description / strength */}
      <span className="text-[8px] text-muted-foreground font-mono mt-0.5 group-hover:text-primary transition-colors duration-300">
        {item.desc}
      </span>
    </motion.div>
  );
}

export default function TechStackSection() {
  return (
    <section className="py-28 relative font-mono" id="skills">
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
            <p className="text-xs text-primary tracking-widest uppercase mb-3 font-bold">
              {"// Technical Depth"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight leading-none">
              The stack behind
              <br />
              <span className="text-primary font-bold">every decision.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-xs max-w-xs leading-relaxed sm:text-right">
            Verified frameworks, databases, and continuous integration engines used in production environments.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TECH_GROUPS.map((group, idx) => {
            const GroupIcon = group.icon;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 border border-border bg-card/40 flex flex-col rounded-none group/card"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-none bg-primary/5 flex items-center justify-center border border-primary/10 group-hover/card:border-primary/30 transition-all duration-300 text-primary">
                    <GroupIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{group.category}</h3>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{group.description}</p>
                  </div>
                </div>

                {/* Subgrid of technology icons */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {group.items.map((item) => (
                    <TechCardItem key={item.name} item={item} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
