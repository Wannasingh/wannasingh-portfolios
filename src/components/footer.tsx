"use client";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Footer() {
  const [socials, setSocials] = useState({
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "",
  });

  useEffect(() => {
    supabase.from("profile").select("github_link, linkedin_link, twitter_link").single()
      .then(({ data }) => {
        if (data) setSocials({
          github: data.github_link || "https://github.com",
          linkedin: data.linkedin_link || "https://linkedin.com",
          twitter: data.twitter_link || "",
        });
        // Silently ignore errors — defaults are already set
      });
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/hire-me" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs mono">W</span>
            </div>
            <span className="font-semibold text-sm text-muted-foreground">
              wannasingh<span className="text-primary">.dev</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            <Link href={socials.github} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-150">
              <Github className="h-3.5 w-3.5" />
            </Link>
            <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-150">
              <Linkedin className="h-3.5 w-3.5" />
            </Link>
            {socials.twitter && (
              <Link href={socials.twitter} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-150">
                <Twitter className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Wannasingh. All rights reserved.
          </p>
          <p className="mono text-xs text-muted-foreground">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
