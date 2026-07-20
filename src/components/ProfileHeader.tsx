"use client";
import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { motion } from "framer-motion";
import profilePic from "@/images/profile.jpg";
import { resolveImageUrl } from "@/app/lib/storage-utils";
import { ArrowRight } from "lucide-react";

interface ProfileHeaderProps {
  description?: string;
  pageType: 'about' | 'hire-me' | 'portfolio' | 'home';  
  title?: string;
  avatarUrl?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  description,
  pageType,
  title,
  avatarUrl,
  primaryButton,
  secondaryButton
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mb-16 border border-border p-6 bg-card/30 relative overflow-hidden"
      data-page-type={pageType}
    >
      {/* Structural coordinates anchor */}
      <div className="absolute top-2 right-3 mono text-[8px] text-muted-foreground select-none">
        [ SYS: OK / POS: 13.75N 100.5E ]
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
        {/* Sharp technical border image box */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 rounded-none overflow-hidden border border-border bg-muted/20">
          <Image
            src={avatarUrl ? resolveImageUrl(avatarUrl, 'profile') : profilePic}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-none hover:scale-[1.03] transition-transform duration-500"
            unoptimized={!!avatarUrl}
          />
        </div>
        
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="mono text-[10px] text-primary uppercase tracking-widest">
              [ PAGE: {pageType.toUpperCase()} ]
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {title || "Hello, I'm Wannasingh"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl pt-1">
              {description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className="inline-flex h-10 items-center justify-center rounded-none bg-primary px-6 text-xs font-mono uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                {primaryButton.text}
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex h-10 items-center justify-center rounded-none border border-border bg-background px-6 text-xs font-mono uppercase tracking-wider text-foreground shadow transition-all hover:bg-muted"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};