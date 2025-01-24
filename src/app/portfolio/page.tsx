"use client";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <header className="py-16 text-black">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-lg text-black max-w-2xl">
              Explore my portfolio of projects showcasing my expertise in web development,
              mobile applications, and software engineering.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`hover:scale-[1.02] transition-transform duration-300`}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600">
            Want to collaborate? {' '}
            <a 
              href="mailto:your.email@example.com" 
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Get in touch
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
