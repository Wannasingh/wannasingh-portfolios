"use client";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { ProfileHeader } from "@/components/ProfileHeader";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <ProfileHeader
          pageType="portfolio"
          title="Engineering Showcase"
          description="A collection of complex problems I've solved using my hybrid database + full-stack skillset."
          primaryButton={{ text: "Contact Me", href: "/hire-me" }}
          secondaryButton={{ text: "About Me", href: "/about" }}
        />
        
        <section className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
