"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Footer() {
  const [socials, setSocials] = useState({
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  });

  useEffect(() => {
    async function fetchSocials() {
      const { data } = await supabase
        .from("profile")
        .select("github_link, linkedin_link, twitter_link")
        .single();
      if (data) {
        setSocials({
          github: data.github_link || "https://github.com",
          linkedin: data.linkedin_link || "https://linkedin.com",
          twitter: data.twitter_link || "https://twitter.com",
        });
      }
    }
    fetchSocials();
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/hire-me" },
  ];

  const socialLinks = [
    { href: socials.github, icon: Github, label: "GitHub" },
    { href: socials.linkedin, icon: Linkedin, label: "LinkedIn" },
    ...(socials.twitter ? [{ href: socials.twitter, icon: Twitter, label: "Twitter" }] : []),
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">W</span>
              </div>
              <span className="font-bold text-sm tracking-tight">
                Wannasingh<span className="text-primary">.dev</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Developer &amp; Oracle DBA based in Thailand.
              Building fast, scalable, and maintainable web systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Wannasingh. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
