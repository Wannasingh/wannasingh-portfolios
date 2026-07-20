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
      className="mb-12 py-6 relative"
      data-page-type={pageType}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
        {/* Clean square image box */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 border border-border bg-[#F4F5F8] dark:bg-muted/10">
          <Image
            src={avatarUrl ? resolveImageUrl(avatarUrl, 'profile') : profilePic}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="hover:scale-[1.02] transition-transform duration-500"
            unoptimized={!!avatarUrl}
          />
        </div>
        
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="mono text-[9px] text-[#A4A4A4] uppercase tracking-widest font-bold">
              {"// PAGE: "}{pageType.toUpperCase()}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#191919] dark:text-foreground">
              {title || "Hello, I'm Wannasingh"}
            </h1>
            <p className="text-sm sm:text-base text-[#696969] dark:text-muted-foreground leading-relaxed max-w-2xl pt-1 font-sans">
              {description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className="inline-flex h-9 items-center justify-center bg-primary px-5 text-[10px] font-mono uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
              >
                {primaryButton.text}
                <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex h-9 items-center justify-center border border-border bg-background px-5 text-[10px] font-mono uppercase tracking-wider text-foreground transition-all hover:bg-muted"
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