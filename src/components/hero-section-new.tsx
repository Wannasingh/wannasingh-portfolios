"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Code2, Layers } from "lucide-react";
import Link from "next/link";
import { supabase, Profile } from "@/app/lib/supabase";
import Image from "next/image";

const FALLBACK_NAME = "Wannasingh";
const FALLBACK_ROLE = "Full Stack Developer & Oracle DBA";
const FALLBACK_BIO =
  "I design the infrastructure your frontend can't break. Bridging enterprise-grade database architecture with modern web applications that scale.";

const FALLBACK_PROFILE = {
  name: FALLBACK_NAME,
  role: FALLBACK_ROLE,
  bio_short: FALLBACK_BIO,
} as Profile;

export default function HeroSectionNew() {
  const [profile, setProfile] = useState<Profile>(FALLBACK_PROFILE);

  useEffect(() => {
    const controller = new AbortController();
    supabase.from("profile").select("*").single().then(({ data }) => {
      if (data) setProfile(data);
    });
    return () => controller.abort();
  }, []);

  const name = profile?.name || FALLBACK_NAME;
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");
  const role = profile?.role || FALLBACK_ROLE;
  const bio = profile?.bio_short || FALLBACK_BIO;

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background noise">
      {/* Fine grid */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Radial vignette to darken corners */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(210_100%_56%_/_0.10),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_80%,hsl(186_88%_46%_/_0.06),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col">

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-10"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs text-muted-foreground mono">
                  Open to new projects
                </span>
              </div>
            </motion.div>

            {/* Giant name */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.5rem,10vw,7.5rem)] font-extrabold tracking-[-0.04em] leading-none text-foreground"
              >
                {firstName}
              </motion.h1>
            </div>
            {lastName && (
              <div className="overflow-hidden mb-6">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.5rem,10vw,7.5rem)] font-extrabold tracking-[-0.04em] leading-none text-gradient"
                >
                  {lastName}
                </motion.p>
              </div>
            )}

            {/* Horizontal rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="hr-glow mb-6"
            />

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-sm mono text-primary tracking-widest uppercase mb-5"
            >
              {role}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mb-9"
            >
              {bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 shadow-lg shadow-primary/20 group"
              >
                View Selected Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/hire-me"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-border/80 text-muted-foreground font-semibold text-sm hover:text-foreground hover:border-primary/30 hover:bg-white/5 transition-all duration-150"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex items-center gap-6 sm:gap-8"
            >
              {[
                { value: "5+", label: "Years" },
                { value: "50+", label: "Projects" },
                { value: "Oracle", label: "Certified" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-8 bg-border" />}
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-foreground tabular-nums">{value}</p>
                    <p className="text-xs text-muted-foreground mono">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 scale-90 rounded-2xl bg-primary/15 blur-3xl" />

            {/* Main photo card */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10" />

              {/* Photo */}
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/profile.jpg"
                  alt={`${name} — ${role}`}
                  fill
                  sizes="(max-width: 1024px) 0px, 360px"
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card/95 to-transparent z-10" />

                {/* Floating info badges */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-md border border-border rounded-xl px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Database className="h-3.5 w-3.5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-foreground leading-tight">Oracle DBA</p>
                      <p className="text-[10px] text-muted-foreground mono">Performance Expert</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-16 left-4 z-20 bg-background/80 backdrop-blur-md border border-border rounded-xl px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-foreground leading-tight">Full Stack</p>
                      <p className="text-[10px] text-muted-foreground mono">Next.js & React</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Info strip */}
              <div className="px-4 py-3 bg-card">
                <p className="text-sm font-bold text-foreground">{firstName}</p>
                <p className="text-xs text-muted-foreground mono truncate">{role}</p>
              </div>
            </div>

            {/* Side accent line */}
            <div className="absolute -right-3 top-12 bottom-12 w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent rounded-full" />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] mono text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-border to-transparent"
        />
      </motion.div>
    </section>
  );
}
