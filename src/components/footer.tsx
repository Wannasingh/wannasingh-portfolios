"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Footer() {
  const [socials, setSocials] = useState({
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com" 
  });

  useEffect(() => {
    async function fetchSocials() {
        const { data } = await supabase.from('profile').select('github_link, linkedin_link, twitter_link').single();
        if (data) {
            setSocials({
                github: data.github_link || "https://github.com",
                linkedin: data.linkedin_link || "https://linkedin.com",
                twitter: data.twitter_link || "https://twitter.com"
            });
        }
    }
    fetchSocials();
  }, []);

  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Wannasingh Portfolio. Built with Next.js & Tailwind.
        </p>
        <div className="flex gap-4">
          <Link href={socials.github} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href={socials.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          {socials.twitter && (
            <Link href={socials.twitter} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
