"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { supabase, Project } from "@/app/lib/supabase";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Loader2 } from "lucide-react";

export default function ProjectPage() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjectsData(data || []);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

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
        
        {loading ? (
           <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
           </div>
        ) : (
          <section className="space-y-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
            {projectsData.length === 0 && (
                <p className="text-center text-muted-foreground">No projects found.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
