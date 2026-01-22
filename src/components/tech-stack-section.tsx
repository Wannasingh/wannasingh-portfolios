"use client";
import { Code2, Database, Layout, Server, Settings, Terminal, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Database Powerhouse",
    icon: <Database className="w-6 h-6" />,
    skills: ["Oracle 19c/21c", "PostgreSQL", "PL/SQL Tuning", "Data Guard", "RMAN Backup", "Partitioning"],
    class: "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-300"
  },
  {
    title: "Modern Backend",
    icon: <Server className="w-6 h-6" />,
    skills: ["Node.js", "C# .NET Core", "RESTful APIs", "GraphQL", "Redis", "Docker & CI/CD"],
    class: "bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-300"
  },
  {
    title: "Frontend Engineering",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "State Management"],
    class: "bg-purple-500/5 border-purple-500/20 text-purple-700 dark:text-purple-300"
  }
];

export default function TechStackSection() {
  return (
    <section className="py-24" id="skills">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
          Technical Arsenal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, idx) => (
             <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className={`flex flex-col p-6 rounded-xl border ${category.class} transition-all`}
             >
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-background shadow-sm">
                      {category.icon}
                   </div>
                   <h3 className="font-bold text-lg">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                   {category.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-background/50 border border-black/5 dark:border-white/10 rounded-md text-sm font-medium">
                         {skill}
                      </span>
                   ))}
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
