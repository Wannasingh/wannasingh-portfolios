"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { supabase, Project, Profile } from "@/app/lib/supabase";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Loader2 } from "lucide-react";

export default function PortfolioClient() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [projectsResult, profileResult] = await Promise.all([
        supabase
          .from('projects')
          .select('*')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false }),
        supabase
          .from('profile')
          .select('*')
          .single()
      ]);

      if (projectsResult.data) {
        setProjectsData(projectsResult.data || []);
      }
      if (profileResult.data) {
        setProfile(profileResult.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <ProfileHeader
          pageType="portfolio"
          title="Engineering Showcase"
          description="A collection of complex problems I've solved using my hybrid database + full-stack skillset."
          avatarUrl={profile?.avatar_url}
          primaryButton={{ text: "Contact Me", href: "/hire-me" }}
          secondaryButton={{ text: "About Me", href: "/about" }}
        />
        
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
      </div>
    </div>
  );
}
