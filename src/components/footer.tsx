"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { db } from "@/app/lib/api-client";

export default function Footer() {
  const [socials, setSocials] = useState({
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "",
    email: "wannasingh.khan@gmail.com",
  });

  useEffect(() => {
    db.from("profile")
      .select("github_link, linkedin_link, twitter_link, email")
      .single()
      .then(({ data }) => {
        if (data) {
          setSocials({
            github: data.github_link || "https://github.com",
            linkedin: data.linkedin_link || "https://linkedin.com",
            twitter: data.twitter_link || "",
            email: data.email || "wannasingh.khan@gmail.com",
          });
        }
      });
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/hire-me" },
  ];

  return (
    <footer className="border-t border-border bg-transparent font-mono">
      {/* ── Signature "merci!" Section ── */}
      <div className="border-b border-border/80 py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          {/* Contact Details (Left) */}
          <div className="space-y-1.5 text-xs sm:text-sm text-primary dark:text-primary leading-tight">
            {socials.email && (
              <div>
                <a href={`mailto:${socials.email}`} className="hover:underline">
                  {socials.email}
                </a>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">+66 8X XXX XXXX (Bangkok, TH)</span>
            </div>
            {socials.github && (
              <div>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {socials.github.replace("https://", "")}
                </a>
              </div>
            )}
            {socials.linkedin && (
              <div>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {socials.linkedin.replace("https://", "")}
                </a>
              </div>
            )}
            {socials.twitter && (
              <div>
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {socials.twitter.replace("https://", "")}
                </a>
              </div>
            )}
          </div>

          {/* Large Blurred "merci!" (Right) */}
          <div className="select-none text-right">
            <h2 className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-none blurred-text cursor-default">
              merci!
            </h2>
          </div>
        </div>
      </div>

      {/* ── Standard Footer Links ── */}
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 border border-primary flex items-center justify-center bg-primary/5">
              <span className="text-primary font-bold text-xs">W</span>
            </div>
            <span className="font-semibold text-xs tracking-wider uppercase text-muted-foreground">
              wannasingh<span className="text-primary">.dev</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-2">
            <Link
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary/45 transition-colors"
            >
              <FaGithub className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary/45 transition-colors"
            >
              <FaLinkedin className="h-3.5 w-3.5" />
            </Link>
            {socials.twitter && (
              <Link
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary/45 transition-colors"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[10px] tracking-wider text-muted-foreground">
            &copy; {new Date().getFullYear()} Wannasingh. All rights reserved.
          </p>
          <p className="text-[10px] tracking-wider text-muted-foreground">
            Built with Next.js · Typewriter Theme
          </p>
        </div>
      </div>
    </footer>
  );
}
