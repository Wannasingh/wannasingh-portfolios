"use client";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { ProfileHeader } from "@/components/ProfileHeader";

export default function ProjectPage() {
  return (
    <div className="relative min-h-screen -mt-20 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-yellow-50/20" />
      <div className="container mx-auto px-6 py-16 font-mono relative">
        {/* Header Section */}
        <ProfileHeader />

        {/* Projects Grid */}
        <section className="container mx-auto px-4 sm:px-6 py-4 pb-10">
          <div className="grid grid-cols-1 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`hover:scale-[1.02] transition-transform duration-300`}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
