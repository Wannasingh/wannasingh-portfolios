"use client";
import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { motion } from "framer-motion";
import profilePic from "@/images/profile.jpg";
import { ArrowRight } from "lucide-react";

interface ProfileHeaderProps {
  description?: string;
  pageType: 'about' | 'hire-me' | 'portfolio' | 'home';  
  title?: string;
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
  title,
  primaryButton,
  secondaryButton
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-1 ring-border">
          <Image
            src={profilePic}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 pb-2">
              {title || "Hello, I'm Wannasingh"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {primaryButton.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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