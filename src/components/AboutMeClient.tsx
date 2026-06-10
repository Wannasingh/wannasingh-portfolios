"use client";
import { useEffect, useState } from "react";
import { Database, Layout, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";
import { supabase, Experience, Profile } from "@/app/lib/supabase";

const dataTags = ["Oracle 21c", "PostgreSQL", "PL/SQL Tuning", "Data Guard"];
const uiTags = ["React", "Next.js", "Tailwind CSS", "Framer Motion"];

type HoveredCard = 'data' | 'ui' | null;

const getAuraClass = (hovered: HoveredCard) => {
  if (hovered === 'data') return 'bg-blue-500/40 scale-105';
  if (hovered === 'ui') return 'bg-purple-500/40 scale-105';
  return 'bg-transparent';
};

const getScale = (hovered: HoveredCard, type: 'data' | 'ui') => {
  if (!hovered) return 1;
  return hovered === type ? 1.08 : 0.92;
};

const getBeamClass = (hovered: HoveredCard) => {
  if (hovered === 'data') return 'bg-gradient-to-r from-blue-500 to-transparent';
  if (hovered === 'ui') return 'bg-gradient-to-l from-purple-500 to-transparent';
  return '';
};

const getSloganColor = (hovered: HoveredCard) => {
  if (hovered === 'data') return '#3b82f6';
  if (hovered === 'ui') return '#a855f7';
  return '#71717a';
};

const getSloganText = (hovered: HoveredCard, profile: Profile | null) => {
  if (hovered === 'data') return profile?.about_analogy_label_left || "Robust Infrastructure";
  if (hovered === 'ui') return profile?.about_analogy_label_right || "Stunning Experience";
  return profile?.about_analogy_label_center || "The Perfect Balance";
};

const getTimelineBadgeColor = (index: number) => {
  if (index === 0) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  if (index === 1) return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
  return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
};

const getTimelineRingColor = (index: number) => {
  if (index === 0) return "bg-blue-500";
  if (index === 1) return "bg-purple-500";
  return "bg-green-500";
};


const AboutMeClient = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<HoveredCard>(null);

  useEffect(() => {
    async function fetchData() {
        const [expResult, profileResult] = await Promise.all([
            supabase.from('experiences').select('*').order('display_order', { ascending: true }),
            supabase.from('profile').select('*').single()
        ]);

        if (expResult.data) setExperiences(expResult.data);
        if (profileResult.data) setProfile(profileResult.data);
        setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
      return (
          <div className="min-h-screen bg-background pt-32 pb-20 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <ProfileHeader
          pageType="about"
          title={profile?.tagline || "From The Engine Room To The Controls"}
          description={profile?.bio_short || "Most developers learn frameworks first. I learned data first. This foundation shapes everything I build today."}
          avatarUrl={profile?.avatar_url}
          primaryButton={{ text: "View Portfolio", href: "/portfolio" }}
          secondaryButton={{ text: "Contact Me", href: "/hire-me" }}
        />

        {/* Narrative Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">{profile?.about_philosophy_title || "The \"Heavy Lifting\" Philosophy"}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                 {profile?.about_philosophy_content || "My journey didn't start with CSS animations. It started with Oracle 19c execution plans, PL/SQL optimization, and table partitioning. When I transitioned to Full Stack development, I carried this \"Architecture First\" mindset with me."}
              </p>
           </div>
               <div className="relative aspect-square md:aspect-auto md:h-full min-h-[360px] bg-secondary/15 rounded-2xl border flex flex-col items-center justify-center p-8 overflow-visible group/fusion transition-all duration-500 hover:bg-secondary/20">
                   {/* Decorative background grid pattern */}
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] rounded-2xl pointer-events-none" />
                   
                    {/* Interactive glowing background aura */}
                    <div className={`absolute inset-0 rounded-2xl blur-3xl opacity-25 transition-all duration-700 pointer-events-none ${getAuraClass(hoveredCard)}`} />

                    {/* Interactive Columns Container */}
                    <div className="relative flex gap-6 sm:gap-8 z-10 w-full justify-center items-center py-4 overflow-visible">
                      
                      {/* LEFT: Solid Data Card */}
                      <button 
                        type="button"
                        className="relative focus-visible:outline-none bg-transparent border-0 p-0 text-left cursor-pointer"
                        onMouseEnter={() => setHoveredCard('data')}
                        onMouseLeave={() => setHoveredCard(null)}
                        onFocus={() => setHoveredCard('data')}
                        onBlur={() => setHoveredCard(null)}
                        aria-label="View Solid Data details"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setHoveredCard(hoveredCard === 'data' ? null : 'data');
                          }
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: getScale(hoveredCard, 'data'),
                            y: hoveredCard === 'data' ? -4 : 0
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`flex flex-col items-center p-5 rounded-2xl border bg-card/90 backdrop-blur-md shadow-md select-none cursor-pointer transition-all duration-300 w-32 sm:w-36 h-36 justify-center
                            ${hoveredCard === 'data' ? 'border-blue-500/50 shadow-blue-500/10' : 'border-border'}`}
                        >
                          <Database className={`h-9 w-9 mb-3 transition-colors duration-300 ${hoveredCard === 'data' ? 'text-blue-500 animate-pulse' : 'text-muted-foreground'}`} />
                          <span className="font-extrabold text-sm tracking-wide">{profile?.about_analogy_title_left || "Solid Data"}</span>
                          <span className="text-[10px] text-muted-foreground/80 mt-1 text-center font-mono">{profile?.about_analogy_desc_left || "DBA & Storage"}</span>
                        </motion.div>

                        {/* Floating pills for Data */}
                        {hoveredCard === 'data' && dataTags.map((tag, i) => {
                          const angles = [210, 150, 90, 30]; 
                          const radius = 95;
                          const angleRad = (angles[i] * Math.PI) / 180;
                          const x = Math.cos(angleRad) * radius;
                          const y = Math.sin(angleRad) * radius;

                          return (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                              animate={{ opacity: 1, scale: 1, x, y }}
                              exit={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.05 }}
                              className="absolute top-[35%] left-[15%] px-2.5 py-0.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 rounded-full text-[10px] font-mono font-bold whitespace-nowrap shadow-sm pointer-events-none z-20"
                            >
                              {tag}
                            </motion.div>
                          );
                        })}
                      </button>

                      {/* MIDDLE: Energy conduit indicator */}
                      <div className="relative h-12 flex items-center justify-center shrink-0 w-8 sm:w-10">
                        <div className="absolute w-full h-[1px] bg-border/80" />
                        {/* Animated beam */}
                        <motion.div 
                          className={`absolute h-[2px] rounded-full filter blur-[1px] w-full ${getBeamClass(hoveredCard)}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: hoveredCard ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </div>

                      {/* RIGHT: Fluid UI Card */}
                      <button 
                        type="button"
                        className="relative focus-visible:outline-none bg-transparent border-0 p-0 text-left cursor-pointer"
                        onMouseEnter={() => setHoveredCard('ui')}
                        onMouseLeave={() => setHoveredCard(null)}
                        onFocus={() => setHoveredCard('ui')}
                        onBlur={() => setHoveredCard(null)}
                        aria-label="View Fluid UI details"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setHoveredCard(hoveredCard === 'ui' ? null : 'ui');
                          }
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: getScale(hoveredCard, 'ui'),
                            y: hoveredCard === 'ui' ? -4 : 0
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`flex flex-col items-center p-5 rounded-2xl border bg-card/90 backdrop-blur-md shadow-md select-none cursor-pointer transition-all duration-300 w-32 sm:w-36 h-36 justify-center
                            ${hoveredCard === 'ui' ? 'border-purple-500/50 shadow-purple-500/10' : 'border-border'}`}
                        >
                          <Layout className={`h-9 w-9 mb-3 transition-colors duration-300 ${hoveredCard === 'ui' ? 'text-purple-500 animate-pulse' : 'text-muted-foreground'}`} />
                          <span className="font-extrabold text-sm tracking-wide">{profile?.about_analogy_title_right || "Fluid UI"}</span>
                          <span className="text-[10px] text-muted-foreground/80 mt-1 text-center font-mono">{profile?.about_analogy_desc_right || "App & Frontend"}</span>
                        </motion.div>

                        {/* Floating pills for UI */}
                        {hoveredCard === 'ui' && uiTags.map((tag, i) => {
                          const angles = [330, 270, 210, 150]; 
                          const radius = 95;
                          const angleRad = (angles[i] * Math.PI) / 180;
                          const x = Math.cos(angleRad) * radius;
                          const y = Math.sin(angleRad) * radius;

                          return (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                              animate={{ opacity: 1, scale: 1, x, y }}
                              exit={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.05 }}
                              className="absolute top-[35%] left-[15%] px-2.5 py-0.5 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 rounded-full text-[10px] font-mono font-bold whitespace-nowrap shadow-sm pointer-events-none z-20"
                            >
                              {tag}
                            </motion.div>
                          );
                        })}
                      </button>
                      
                    </div>

                    {/* Center Slogan Block */}
                    <div className="text-center mt-6 space-y-1.5 z-10 select-none">
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-40 mx-auto mb-3" />
                      
                      <motion.p 
                        animate={{
                          color: getSloganColor(hoveredCard)
                        }}
                        className="font-mono text-xs tracking-widest uppercase font-bold transition-colors duration-300"
                      >
                        {getSloganText(hoveredCard, profile)}
                      </motion.p>
                      
                      <h4 className="text-base font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        {profile?.about_analogy_center_title || "The Hybrid Architect"}
                      </h4>
                    </div>
               </div>
        </div>

        {/* The Evolution Timeline */}
        <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h3 className="text-2xl font-bold mb-4">{profile?.about_evolution_title || "My Evolution"}</h3>
               <p className="text-muted-foreground">{profile?.about_evolution_subtitle || "A path from deep backend infrastructure to modern frontend mastery."}</p>
            </div>

            <div className="relative space-y-12 pl-10 md:pl-0">
               {/* Vertical Timeline Axis Line */}
               <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />
               {experiences.map((exp, index) => {
                    const isLeft = index % 2 === 0;
                    const badgeColor = getTimelineBadgeColor(index);
                    const ringColor = getTimelineRingColor(index);

                    return (
                     <motion.div 
                         key={exp.id || index}
                         initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-8 items-center"
                     >
                         {/* Left Side Content */}
                         <div className={`md:text-right space-y-2 ${isLeft ? '' : 'md:order-3 md:text-left'} ${isLeft ? '' : 'hidden md:block'}`}>
                             {isLeft && (
                                 <>
                                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>{exp.period}</span>
                                     <h4 className="text-xl font-bold">{exp.title}</h4>
                                     <p className="text-muted-foreground text-sm">{exp.description}</p>
                                 </>
                             )}
                         </div>

                         {/* Center Marker */}
                         <div className={`hidden md:flex justify-center ${isLeft ? '' : 'md:order-2'}`}>
                              <div className={`h-4 w-4 rounded-full ${ringColor} ring-4 ring-background`}></div>
                         </div>

                         {/* Right Side / Mobile Content */}
                         <div className={`${isLeft ? 'hidden md:block' : 'md:order-3'}`}> {/* Spacer for left items on desktop */}
                             {!isLeft && (
                                 <div className="space-y-2">
                                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>{exp.period}</span>
                                     <h4 className="text-xl font-bold">{exp.title}</h4>
                                     <p className="text-muted-foreground text-sm">{exp.description}</p>
                                 </div>
                             )}
                             {/* Mobile View for Left Items */}
                             <div className="md:hidden space-y-2">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>{exp.period}</span>
                                <h4 className="text-xl font-bold">{exp.title}</h4>
                                <p className="text-muted-foreground text-sm">{exp.description}</p>
                             </div>
                         </div>
                     </motion.div>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutMeClient;
