"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Database, Code2, Star } from "lucide-react";
import Link from "next/link";
import { supabase, Profile } from "@/app/lib/supabase";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function HeroSectionNew() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from("profile").select("*").single();
      if (data) setProfile(data);
    }
    fetchProfile();
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-hero-gradient pt-24 pb-16">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Soft glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute bottom-10 -right-20 w-[400px] h-[400px] rounded-full bg-violet-500/[0.06] blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] items-center">

          {/* ── Left: Text ── */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-7"
          >
            {/* Status badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to opportunities
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="text-sm font-semibold text-primary tracking-widest uppercase">
                Full Stack Developer & Oracle DBA
              </p>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
                {profile?.name?.split(" ")[0] || "Wannasingh"}
                <br />
                <span className="text-gradient">
                  {profile?.name?.split(" ").slice(1).join(" ") || "Portfolio"}
                </span>
              </h1>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              {profile?.bio_short ||
                "I bridge the gap between enterprise database architecture and modern web interfaces — delivering systems that are fast by design, scalable by default."}
            </motion.p>

            {/* Meta chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {[
                { icon: MapPin, label: "Thailand" },
                { icon: Database, label: "Oracle DBA" },
                { icon: Code2, label: "Next.js & React" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground"
                >
                  <Icon className="h-3 w-3 text-primary" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-px transition-all duration-150"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hire-me"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/30 hover:bg-secondary transition-all duration-150"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 pt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by clients across Southeast Asia
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Profile card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-600/15 blur-3xl scale-105 opacity-60" />

            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-black/[0.08]">
              {/* Profile photo */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-secondary to-muted overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Wannasingh — Full Stack Developer & Oracle DBA"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/90 to-transparent" />
              </div>

              {/* Info strip */}
              <div className="px-5 py-4 bg-card">
                <p className="font-bold text-base text-foreground">
                  {profile?.name || "Wannasingh"}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {profile?.role || "Full Stack Developer & Oracle DBA"}
                </p>
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 bg-card rounded-xl shadow-lg shadow-black/[0.08] border border-border px-4 py-3"
            >
              <p className="text-xl font-extrabold text-foreground tabular-nums">5+</p>
              <p className="text-xs text-muted-foreground font-medium">Years Exp.</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-3 -left-3 bg-card rounded-xl shadow-lg shadow-black/[0.08] border border-border px-4 py-3"
            >
              <p className="text-xl font-extrabold text-foreground tabular-nums">50+</p>
              <p className="text-xs text-muted-foreground font-medium">Projects</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
