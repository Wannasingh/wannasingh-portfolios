"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { db, Profile } from '@/app/lib/api-client';
import { resolveImageUrl } from '@/app/lib/storage-utils';
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
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    db.from("profile").select("*").single().then(({ data }) => {
      if (data) {
        setProfile(data);
      }
      setProfileLoaded(true);
    });
    return () => controller.abort();
  }, []);

  const name = profile?.name || FALLBACK_NAME;
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");
  const role = profile?.role || FALLBACK_ROLE;
  const bio = profile?.bio_short || FALLBACK_BIO;

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background border-b border-border/60">
      {/* Pristine very faint layout grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col">

            {/* Status pill (Minimal editorial design label) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1 border border-border bg-secondary/30 rounded-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-primary" />
                </span>
                <span className="text-[9px] text-[#A4A4A4] font-mono uppercase tracking-wider font-bold">
                  STATUS // ACTIVE_AND_AVAILABLE
                </span>
              </div>
            </motion.div>

            {/* Giant name (Bold off-black Helvetica/grotesque style) */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tight leading-none text-[#191919] dark:text-foreground"
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
                  className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tight leading-none text-[#191919] dark:text-foreground"
                >
                  {lastName}
                </motion.p>
              </div>
            )}

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="h-[1px] bg-border/60 mb-6"
            />

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-[10px] font-mono text-primary tracking-widest uppercase mb-4"
            >
              {"// "}{role}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-xs sm:text-sm text-[#696969] dark:text-muted-foreground leading-relaxed max-w-lg mb-8 font-sans"
            >
              {bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center gap-2 h-10 px-6 bg-primary text-primary-foreground font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all rounded-none"
              >
                Selected Products
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/hire-me"
                className="inline-flex items-center justify-center gap-2 h-10 px-6 border border-border text-muted-foreground font-mono font-bold text-xs uppercase tracking-wider hover:text-foreground hover:bg-muted transition-all rounded-none"
              >
                Inquire Specs
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
                { value: "5+", label: "Years Exp" },
                { value: "50+", label: "Deploys" },
                { value: "Oracle", label: "Certified" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-5 bg-border" />}
                  <div>
                    <p className="text-base sm:text-lg font-extrabold text-[#191919] dark:text-foreground tabular-nums uppercase">{value}</p>
                    <p className="text-[8px] text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: Photo (Grayscale full frame) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main photo frame */}
            <div className="relative border border-border bg-card p-1 rounded-none">
              {/* Photo Viewport */}
              <div className="relative aspect-[3/4] bg-[#F4F5F8] dark:bg-muted/10">
                {profileLoaded ? (
                  <Image
                    src={profile?.avatar_url ? resolveImageUrl(profile.avatar_url, 'profile') : "/images/profile.jpg"}
                    alt={`${name} — ${role}`}
                    fill
                    sizes="(max-width: 1024px) 0px, 360px"
                    className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                    unoptimized={!!profile?.avatar_url}
                  />
                ) : (
                  <div className="absolute inset-0 bg-secondary/10 animate-pulse flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary/40" />
                  </div>
                )}
              </div>

              {/* Info strip */}
              <div className="px-2 py-2 bg-card flex justify-between items-center mt-1">
                <div>
                  <p className="text-xs font-black uppercase text-[#191919] dark:text-foreground">{firstName}</p>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wide truncate max-w-[200px]">{role}</p>
                </div>
                <div className="mono text-[8px] text-primary select-none">[ REF: PROD_SPEC ]</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[8px] font-mono text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-[#A4A4A4] to-transparent"
        />
      </motion.div>
    </section>
  );
}
