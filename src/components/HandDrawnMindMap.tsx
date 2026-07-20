"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HandDrawnMindMap() {
  return (
    <div className="w-full py-12 px-4 relative overflow-hidden bg-background text-[#191919] dark:text-foreground">
      
      {/* ── DESKTOP INTERACTIVE MIND-MAP CANVAS ── */}
      <div className="hidden lg:block relative w-full min-h-[85vh] max-w-6xl mx-auto my-8">
        
        {/* SVG Connecting Curves */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full pointer-events-none text-muted-foreground/60 dark:text-muted-foreground/30"
          style={{ overflow: 'visible' }}
        >
          {/* Center to Education */}
          <path d="M 50,50 Q 38,32 26,18" fill="none" stroke="currentColor" strokeWidth="0.5" className="sketch-line" />
          
          {/* Center to Languages */}
          <path d="M 50,50 Q 62,32 74,18" fill="none" stroke="currentColor" strokeWidth="0.5" className="sketch-line" />
          
          {/* Center to Work History */}
          <path d="M 50,50 Q 32,60 22,70" fill="none" stroke="currentColor" strokeWidth="0.5" className="sketch-line" />
          
          {/* Center to Skills */}
          <path d="M 50,50 Q 68,54 82,58" fill="none" stroke="currentColor" strokeWidth="0.5" className="sketch-line" />
          
          {/* Center to Projects */}
          <path d="M 50,50 Q 50,72 50,82" fill="none" stroke="currentColor" strokeWidth="0.5" className="sketch-line" />
        </svg>

        {/* Floating Sketched Doodles */}
        {/* Star Top-Left */}
        <div className="absolute left-[12%] top-[30%] pointer-events-none select-none text-primary/80">
          <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Flower Left */}
        <div className="absolute left-[8%] top-[45%] pointer-events-none select-none text-muted-foreground/60">
          <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2a4 4 0 00-4 4 4 4 0 004-4zM12 22a4 4 0 004-4 4 4 0 00-4 4zM2 12a4 4 0 004 4 4 4 0 00-4-4zM22 12a4 4 0 00-4-4 4 4 0 004 4z" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Heart bottom-left */}
        <div className="absolute left-[38%] top-[65%] pointer-events-none select-none text-destructive/80">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        {/* Star Top-Right */}
        <div className="absolute right-[15%] top-[32%] pointer-events-none select-none text-primary/70">
          <svg className="w-9 h-9 rotate-12" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z"/>
          </svg>
        </div>

        {/* CENTER NODE: Curriculum Vitae */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 bg-background hand-drawn-border-1 shadow-sm w-60 h-36 flex flex-col justify-center items-center select-none bg-white dark:bg-card">
            <h2 className="font-serif-elegant italic text-3xl font-extrabold tracking-tight text-[#191919] dark:text-foreground">
              Curriculum Vitae
            </h2>
            <p className="font-handwriting text-xl text-primary font-bold mt-1 tracking-wider">
              Wannasingh
            </p>
          </div>
        </motion.div>

        {/* EDUCATION NODE (Top-Left) */}
        <div className="absolute left-[12%] top-[3%] w-[28%] z-10">
          <div className="p-6 bg-background hand-drawn-border-2 bg-white dark:bg-card text-center hover:shadow-md transition-shadow duration-300">
            <h3 className="font-sans font-bold text-lg lowercase tracking-tight mb-3">education</h3>
            <div className="font-handwriting text-[#696969] dark:text-muted-foreground text-lg space-y-3 leading-tight">
              <div>
                <p className="font-bold text-[#191919] dark:text-foreground">Computer Science, BSc</p>
                <p>Enterprise Systems & Architecture</p>
                <p className="text-sm text-[#A4A4A4]">2019 - 2023</p>
              </div>
              <div className="border-t border-dashed border-border pt-2">
                <p className="font-bold text-[#191919] dark:text-foreground">Oracle Certified Professional</p>
                <p>Database Administration certification</p>
              </div>
            </div>
          </div>
        </div>

        {/* LANGUAGES NODE (Top-Right) */}
        <div className="absolute right-[12%] top-[4%] w-[22%] z-10">
          <div className="p-5 bg-background hand-drawn-border-3 bg-white dark:bg-card text-center hover:shadow-md transition-shadow duration-300">
            <h3 className="font-sans font-bold text-lg lowercase tracking-tight mb-2">languages</h3>
            <div className="font-handwriting text-[#696969] dark:text-muted-foreground text-lg leading-tight space-y-1">
              <p><span className="font-bold text-[#191919] dark:text-foreground">Thai</span> (native)</p>
              <p><span className="font-bold text-[#191919] dark:text-foreground">English</span> (fluent / advanced)</p>
            </div>
          </div>
        </div>

        {/* WORK HISTORY NODE (Bottom-Left) */}
        <div className="absolute left-[3%] top-[48%] w-[33%] z-10">
          <div className="p-6 bg-background hand-drawn-border-1 bg-white dark:bg-card text-center hover:shadow-md transition-shadow duration-300">
            <h3 className="font-sans font-bold text-lg lowercase tracking-tight mb-4">work history</h3>
            <div className="font-handwriting text-[#696969] dark:text-muted-foreground text-[16px] text-left space-y-4 leading-snug">
              <div>
                <p className="font-bold text-[#191919] dark:text-foreground">2024 - Present ★ Lead DBA & Architect</p>
                <p className="pl-3">Optimizing Oracle DB query structures, handling performance tuning, backups, and migration strategies.</p>
              </div>
              <div>
                <p className="font-bold text-[#191919] dark:text-foreground">2022 - 2024 ★ Full Stack Developer</p>
                <p className="pl-3">Created responsive web projects using Next.js, Node.js API endpoints, and server infrastructure configurations.</p>
              </div>
              <div>
                <p className="font-bold text-[#191919] dark:text-foreground">2020 - 2022 ★ Cloud Engineer (Contract)</p>
                <p className="pl-3">Docker container management, environment orchestration, and CI/CD pipelines.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS NODE (Bottom-Right stacked ellipses) */}
        <div className="absolute right-[5%] top-[40%] w-[30%] z-10">
          <div className="p-6 bg-background hand-drawn-border-ellipse bg-white dark:bg-card text-center hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
            <h3 className="font-sans font-bold text-lg lowercase tracking-tight mb-4">skills</h3>
            
            <div className="w-full space-y-4 font-handwriting text-[#696969] dark:text-muted-foreground text-left">
              {/* Personal Group */}
              <div className="border border-dashed border-border/80 p-3 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]">
                <p className="font-bold text-primary text-center text-sm uppercase tracking-wide">{"// Personal"}</p>
                <p className="text-center text-base mt-1">Resourcefulness, creative adaptability, adaptive thinking, initiative</p>
              </div>

              {/* Digital Stack Group */}
              <div className="border border-dashed border-border/80 p-3 rounded-[70%_30%_30%_70%_/_40%_60%_40%_60%]">
                <p className="font-bold text-[#191919] dark:text-foreground text-center text-sm uppercase tracking-wide">{"// Stack Inventory"}</p>
                <p className="text-center text-base mt-1">Next.js, React, Node.js, TypeScript, Tailwind CSS, Docker, Git</p>
              </div>

              {/* Technical DB Group */}
              <div className="border border-dashed border-border/80 p-3 rounded-[40%_60%_60%_40%_/_60%_30%_70%_40%]">
                <p className="font-bold text-[#191919] dark:text-foreground text-center text-sm uppercase tracking-wide">{"// Database Architect"}</p>
                <p className="text-center text-base mt-1">Oracle DB, PL/SQL, PostgreSQL, Performance Tuning, Backup & Recovery</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS & SERVICES NODE (Bottom-Center) */}
        <div className="absolute left-[40%] top-[80%] w-[20%] z-10 text-center">
          <Link href="#projects">
            <div className="p-4 bg-primary text-primary-foreground hand-drawn-border-3 cursor-pointer hover:scale-102 hover:shadow-lg transition-all duration-300 select-none">
              <h3 className="font-sans font-bold text-base lowercase tracking-tight flex items-center justify-center gap-1">
                selected projects
                <ArrowUpRight className="h-4 w-4" />
              </h3>
              <p className="font-handwriting text-[15px] mt-0.5 opacity-90">View My Code Artifacts</p>
            </div>
          </Link>
        </div>

      </div>

      {/* ── MOBILE COLLAPSED SKETCH-TREE LAYOUT ── */}
      <div className="block lg:hidden max-w-md mx-auto space-y-12 my-6 relative">
        
        {/* Vertical Sketched Line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-px border-l border-dashed border-muted-foreground/40 pointer-events-none" />

        {/* Center Node */}
        <div className="relative z-10 text-center flex justify-center">
          <div className="p-6 bg-white dark:bg-card hand-drawn-border-1 shadow-sm w-56 h-28 flex flex-col justify-center items-center">
            <h2 className="font-serif-elegant italic text-2xl font-extrabold text-[#191919] dark:text-foreground">
              Curriculum Vitae
            </h2>
            <p className="font-handwriting text-lg text-primary font-bold mt-0.5">
              Wannasingh
            </p>
          </div>
        </div>

        {/* Education Node */}
        <div className="relative z-10 bg-white dark:bg-card hand-drawn-border-2 p-5">
          <h3 className="font-sans font-bold text-base lowercase tracking-tight mb-2 text-center">education</h3>
          <div className="font-handwriting text-[#696969] dark:text-muted-foreground text-base space-y-3 leading-tight text-center">
            <div>
              <p className="font-bold text-[#191919] dark:text-foreground">Computer Science, BSc</p>
              <p>Enterprise Systems & Architecture</p>
              <p className="text-xs text-[#A4A4A4]">2019 - 2023</p>
            </div>
            <div className="border-t border-dashed border-border pt-2">
              <p className="font-bold text-[#191919] dark:text-foreground">Oracle Certified Professional</p>
              <p>Database Administration</p>
            </div>
          </div>
        </div>

        {/* Work History Node */}
        <div className="relative z-10 bg-white dark:bg-card hand-drawn-border-1 p-5">
          <h3 className="font-sans font-bold text-base lowercase tracking-tight mb-3 text-center">work history</h3>
          <div className="font-handwriting text-[#696969] dark:text-muted-foreground text-sm space-y-3 leading-tight">
            <div>
              <p className="font-bold text-[#191919] dark:text-foreground">2024 - Present ★ Lead DBA & Architect</p>
              <p className="pl-2">Optimizing Oracle DB query structures, performance tuning, backups, and migration.</p>
            </div>
            <div>
              <p className="font-bold text-[#191919] dark:text-foreground">2022 - 2024 ★ Full Stack Developer</p>
              <p className="pl-2">Building web projects using Next.js, Node.js API, and server setups.</p>
            </div>
          </div>
        </div>

        {/* Skills Node */}
        <div className="relative z-10 bg-white dark:bg-card hand-drawn-border-ellipse p-5">
          <h3 className="font-sans font-bold text-base lowercase tracking-tight mb-3 text-center">skills</h3>
          <div className="font-handwriting text-[#696969] dark:text-muted-foreground text-sm space-y-3">
            <div>
              <p className="font-bold text-[#191919] dark:text-foreground text-center">{"// Stack Inventory"}</p>
              <p className="text-center">Next.js, React, Node.js, TypeScript, Tailwind CSS, Docker, Git</p>
            </div>
            <div className="border-t border-dashed border-border pt-2">
              <p className="font-bold text-[#191919] dark:text-foreground text-center">{"// Database"}</p>
              <p className="text-center">Oracle DB, PL/SQL, PostgreSQL, Performance Tuning</p>
            </div>
          </div>
        </div>

        {/* Languages Node */}
        <div className="relative z-10 bg-white dark:bg-card hand-drawn-border-3 p-4">
          <h3 className="font-sans font-bold text-base lowercase tracking-tight mb-2 text-center">languages</h3>
          <div className="font-handwriting text-[#696969] dark:text-muted-foreground text-base text-center">
            <p>Thai (native) / English (fluent)</p>
          </div>
        </div>

        {/* Projects CTA Button */}
        <div className="relative z-10 text-center flex justify-center">
          <Link href="#projects">
            <div className="p-4 bg-primary text-primary-foreground hand-drawn-border-3 cursor-pointer w-48 shadow-md">
              <h3 className="font-sans font-bold text-sm lowercase flex items-center justify-center gap-1">
                selected projects
                <ArrowUpRight className="h-3 w-3" />
              </h3>
            </div>
          </Link>
        </div>

      </div>

    </div>
  );
}
