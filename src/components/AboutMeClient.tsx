"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { db, Experience, Profile } from "@/app/lib/api-client";
import { resolveImageUrl } from "@/app/lib/storage-utils";
import profilePic from "@/images/profile.jpg";

export default function AboutMeClient() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [expResult, profileResult] = await Promise.all([
          db.from("experiences").select("*").order("display_order", { ascending: true }),
          db.from("profile").select("*").single(),
        ]);

        if (expResult.data) setExperiences(expResult.data);
        if (profileResult.data) setProfile(profileResult.data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent pt-32 pb-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Filter education vs work experiences
  const educationItems = experiences.filter((exp) => exp.type === "education");
  const workItems = experiences.filter((exp) => exp.type === "work");

  // Fallbacks for interests & skills if not configured in the db
  const defaultLanguages = [
    { name: "English", level: "Fluent / Business" },
    { name: "Thai", level: "Native" },
  ];

  const defaultInterests = [
    "Database Tuning & Architecture",
    "Technical Writing & Documentation",
    "Open-Source Systems",
    "Gym & Strength Training",
    "Traveling & Photography",
  ];

  const defaultAdvancedSkills = [
    "Oracle 19c/21c Database Administration",
    "SQL & PL/SQL Query Optimization",
    "Database Partitioning & Design",
    "RMAN Backup & Restore Operations",
    "Oracle Data Guard Configurations",
    "Oracle Cloud Infrastructure (OCI) Services",
  ];

  const defaultIntermediateSkills = [
    "React & Next.js Frameworks",
    "TypeScript & modern ES6+ JS",
    "Node.js API Development",
    "PostgreSQL & Redis Caching",
    "Docker Container Management",
    "CI/CD Pipeline Configurations",
  ];

  const defaultPersonalSkills = [
    "Rapid technical learning & adaptation",
    "Critical & analytical problem solving",
    "Self-managed, proactive execution",
    "Attention to detail and architecture",
    "Strong communication & collaboration",
  ];

  const defaultSoftwareTools = [
    "Oracle SQL Developer - Advanced",
    "PL/SQL Developer - Advanced",
    "OCI Cloud Console & CLI - Advanced",
    "VS Code & Git - Advanced",
    "Docker Desktop - Intermediate",
    "Figma - Intermediate",
    "Postman / REST Client - Intermediate",
  ];

  return (
    <main className="min-h-screen bg-transparent pt-28 pb-24 font-mono text-[#191919] dark:text-[#f5f3ef] transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* ── COLUMN 1: CONTACT & PROFILE HEADER ── */}
          <div className="space-y-10 lg:sticky lg:top-24">
            
            {/* Contact Details */}
            <div className="space-y-1 text-sm text-primary dark:text-primary leading-tight">
              {profile?.email && (
                <div>
                  <a href={`mailto:${profile.email}`} className="hover:underline">
                    {profile.email}
                  </a>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">+66 8X XXX XXXX (Bangkok, TH)</span>
              </div>
              {profile?.github_link && (
                <div>
                  <a
                    href={profile.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {profile.github_link.replace("https://", "")}
                  </a>
                </div>
              )}
              {profile?.linkedin_link && (
                <div>
                  <a
                    href={profile.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {profile.linkedin_link.replace("https://", "")}
                  </a>
                </div>
              )}
            </div>

            {/* Title / Brand Block */}
            <div className="space-y-1 select-none">
              <h1 className="text-5xl font-bold tracking-tighter leading-none lowercase">
                {profile?.name || "wannasingh"}
              </h1>
              <p className="text-sm uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b]">
                {profile?.role || "developer & dba"}
              </p>
            </div>

            {/* Profile Image (Vertical Frame) */}
            <div className="relative w-full aspect-[4/5] border border-border/80 bg-secondary/30 overflow-hidden shadow-sm">
              <Image
                src={
                  profile?.avatar_url
                    ? resolveImageUrl(profile.avatar_url, "profile")
                    : profilePic
                }
                alt={profile?.name || "Wannasingh"}
                fill
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out hover:scale-102"
              />
            </div>

            {/* Biography Paragraph */}
            <div className="text-sm leading-relaxed text-justify space-y-4">
              <p className="whitespace-pre-line text-[#333] dark:text-[#dfdeda]">
                {profile?.about_philosophy_content ||
                  profile?.bio_short ||
                  "I work across databases and full-stack software, translating business logic into fast, secure, and performant web applications. My approach focuses on query efficiency, structural consistency, and clean systems architecture."}
              </p>
            </div>
          </div>

          {/* ── COLUMN 2: CHRONOLOGY & BIOGRAPHICAL ── */}
          <div className="space-y-10">
            
            {/* Education Section */}
            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                education
              </h2>
              <div className="space-y-5">
                {educationItems.length > 0 ? (
                  educationItems.map((edu) => (
                    <div key={edu.id} className="space-y-1 text-sm">
                      <h3 className="font-bold text-[#191919] dark:text-[#f5f3ef]">
                        {edu.title}
                      </h3>
                      <p className="text-xs text-primary">{edu.description}</p>
                      <p className="text-xs text-muted-foreground">{edu.period}</p>
                    </div>
                  ))
                ) : (
                  <div className="space-y-1 text-sm">
                    <h3 className="font-bold text-[#191919] dark:text-[#f5f3ef]">
                      B.A. in International Business English
                    </h3>
                    <p className="text-xs text-primary">North Bangkok University</p>
                    <p className="text-xs text-muted-foreground">2020 - 2024</p>
                  </div>
                )}
              </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                experience
              </h2>
              <div className="space-y-6">
                {workItems.length > 0 ? (
                  workItems.map((work) => (
                    <div key={work.id} className="space-y-1 text-sm">
                      <h3 className="font-bold text-[#191919] dark:text-[#f5f3ef] leading-tight">
                        {work.title}
                      </h3>
                      <p className="text-xs text-primary">Prem Group Engineering</p>
                      <p className="text-xs text-muted-foreground">{work.period}</p>
                      <p className="text-xs leading-relaxed text-[#555] dark:text-[#c4c3bf] pt-1">
                        {work.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="space-y-1 text-sm">
                    <h3 className="font-bold text-[#191919] dark:text-[#f5f3ef] leading-tight">
                      Lead DBA & Architect
                    </h3>
                    <p className="text-xs text-primary">Prem Group Engineering</p>
                    <p className="text-xs text-muted-foreground">2024 - Ongoing</p>
                    <p className="text-xs leading-relaxed text-[#555] dark:text-[#c4c3bf] pt-1">
                      Managing full Oracle 19c/21c DB systems, tuning queries, and designing Next.js web portals.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Languages Section */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                languages
              </h2>
              <div className="space-y-1 text-sm">
                {defaultLanguages.map((lang) => (
                  <div key={lang.name} className="flex justify-between">
                    <span className="font-bold text-[#191919] dark:text-[#f5f3ef]">
                      {lang.name}
                    </span>
                    <span className="text-primary">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Other Interests Section */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                other interests
              </h2>
              <ul className="space-y-1 text-sm list-none p-0 m-0">
                {defaultInterests.map((interest) => (
                  <li key={interest} className="text-[#555] dark:text-[#c4c3bf]">
                    {interest}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ── COLUMN 3: SKILLS & TECHNICAL TOOLSET ── */}
          <div className="space-y-10">
            
            {/* Advanced Skills */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                advanced skills
              </h2>
              <ul className="space-y-1 text-sm list-none p-0 m-0 text-primary dark:text-primary">
                {defaultAdvancedSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>

            {/* Intermediate Skills */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                intermediate skills
              </h2>
              <ul className="space-y-1 text-sm list-none p-0 m-0 text-primary dark:text-primary">
                {defaultIntermediateSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>

            {/* Personal Skills */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                personal skills
              </h2>
              <ul className="space-y-1 text-sm list-none p-0 m-0 text-[#555] dark:text-[#c4c3bf]">
                {defaultPersonalSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>

            {/* Software & Tools */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#7a756b] dark:text-[#a1a09b] border-b border-border/60 pb-1 font-bold">
                software & tools
              </h2>
              <ul className="space-y-1.5 text-sm list-none p-0 m-0 text-primary dark:text-primary">
                {defaultSoftwareTools.map((tool) => {
                  const parts = tool.split(" - ");
                  return (
                    <li key={tool} className="flex justify-between">
                      <span className="font-bold text-[#191919] dark:text-[#f5f3ef]">
                        {parts[0]}
                      </span>
                      {parts[1] && <span className="text-muted-foreground">{parts[1]}</span>}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
