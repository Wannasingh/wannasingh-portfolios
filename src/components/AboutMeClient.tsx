"use client";
import { useEffect, useState } from "react";
import { Database, Layout, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";
import { db, Experience, Profile } from '@/app/lib/api-client';

const dataTags = ["Oracle 21c", "PostgreSQL", "PL/SQL Tuning", "Data Guard"];
const uiTags = ["React", "Next.js", "Tailwind CSS", "Framer Motion"];

type HoveredCard = 'data' | 'ui' | null;

const getScale = (hovered: HoveredCard, type: 'data' | 'ui') => {
  if (!hovered) return 1;
  return hovered === type ? 1.08 : 0.92;
};

const getSloganText = (hovered: HoveredCard, profile: Profile | null) => {
  if (hovered === 'data') return profile?.about_analogy_label_left || "Robust Infrastructure";
  if (hovered === 'ui') return profile?.about_analogy_label_right || "Stunning Experience";
  return profile?.about_analogy_label_center || "The Perfect Balance";
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
             db.from('experiences').select('*').order('display_order', { ascending: true }),
             db.from('profile').select('*').single()
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
    <div className="min-h-screen bg-background pt-32 pb-20 text-[#191919] dark:text-foreground">
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
              <h2 className="text-3xl font-bold tracking-tight font-serif-elegant">{profile?.about_philosophy_title || "The \"Heavy Lifting\" Philosophy"}</h2>
              <p className="text-[#696969] dark:text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans text-sm sm:text-base">
                 {profile?.about_philosophy_content || "My journey didn't start with CSS animations. It started with Oracle 19c execution plans, PL/SQL optimization, and table partitioning. When I transitioned to Full Stack development, I carried this \"Architecture First\" mindset with me."}
              </p>
           </div>
           
           <div className="relative aspect-square md:aspect-auto md:h-full min-h-[360px] bg-white dark:bg-card hand-drawn-border-1 flex flex-col items-center justify-center p-8 overflow-visible">
               {/* Faint layout background grid pattern */}
               <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
               
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
                     className={`flex flex-col items-center p-5 hand-drawn-border-2 bg-white dark:bg-card/90 select-none cursor-pointer transition-all duration-300 w-32 sm:w-36 h-36 justify-center
                       ${hoveredCard === 'data' ? 'text-primary' : 'text-[#191919] dark:text-foreground'}`}
                   >
                     <Database className="h-9 w-9 mb-3" />
                     <span className="font-extrabold text-sm tracking-wide font-serif-elegant">{profile?.about_analogy_title_left || "Solid Data"}</span>
                     <span className="text-[10px] font-handwriting font-bold mt-1 text-center">{profile?.about_analogy_desc_left || "DBA & Storage"}</span>
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
                         className="absolute top-[35%] left-[15%] px-2.5 py-0.5 bg-primary text-primary-foreground border border-primary hand-drawn-border-3 text-[10px] font-handwriting font-bold whitespace-nowrap shadow-sm pointer-events-none z-20"
                       >
                         {tag}
                       </motion.div>
                     );
                   })}
                 </button>

                 {/* MIDDLE: Energy conduit indicator */}
                 <div className="relative h-12 flex items-center justify-center shrink-0 w-8 sm:w-10">
                   <div className="absolute w-full border-t border-dashed border-border" />
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
                     className={`flex flex-col items-center p-5 hand-drawn-border-3 bg-white dark:bg-card/90 select-none cursor-pointer transition-all duration-300 w-32 sm:w-36 h-36 justify-center
                       ${hoveredCard === 'ui' ? 'text-primary' : 'text-[#191919] dark:text-foreground'}`}
                   >
                     <Layout className="h-9 w-9 mb-3" />
                     <span className="font-extrabold text-sm tracking-wide font-serif-elegant">{profile?.about_analogy_title_right || "Fluid UI"}</span>
                     <span className="text-[10px] font-handwriting font-bold mt-1 text-center">{profile?.about_analogy_desc_right || "App & Frontend"}</span>
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
                         className="absolute top-[35%] left-[15%] px-2.5 py-0.5 bg-primary text-primary-foreground border border-primary hand-drawn-border-2 text-[10px] font-handwriting font-bold whitespace-nowrap shadow-sm pointer-events-none z-20"
                       >
                         {tag}
                       </motion.div>
                     );
                   })}
                 </button>
                 
               </div>

               {/* Center Slogan Block */}
               <div className="text-center mt-6 space-y-1 z-10 select-none">
                 <div className="border-t border-dashed border-border w-40 mx-auto mb-3" />
                 
                 <p className="font-handwriting text-lg text-primary font-bold transition-colors duration-300">
                   {getSloganText(hoveredCard, profile)}
                 </p>
                 
                 <h4 className="text-base font-extrabold tracking-tight font-serif-elegant">
                   {profile?.about_analogy_center_title || "The Hybrid Architect"}
                 </h4>
               </div>
           </div>
        </div>

        {/* The Evolution Timeline */}
        <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h3 className="text-2xl font-bold font-serif-elegant mb-3">{profile?.about_evolution_title || "My Evolution"}</h3>
               <p className="text-muted-foreground font-handwriting text-xl">{profile?.about_evolution_subtitle || "A path from deep backend infrastructure to modern frontend mastery."}</p>
            </div>

            <div className="relative space-y-12 pl-10 md:pl-0">
               {/* Vertical Timeline Axis Line */}
               <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px border-l border-dashed border-border" />
               {experiences.map((exp, index) => {
                    const isLeft = index % 2 === 0;
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
                                 <div className="p-5 bg-white dark:bg-card hand-drawn-border-1">
                                     <span className="font-handwriting font-bold text-primary text-base">{exp.period}</span>
                                     <h4 className="text-lg font-bold font-serif-elegant mt-1">{exp.title}</h4>
                                     <p className="text-[#696969] dark:text-muted-foreground text-sm font-sans mt-2">{exp.description}</p>
                                 </div>
                             )}
                         </div>

                         {/* Center Marker */}
                         <div className={`hidden md:flex justify-center ${isLeft ? '' : 'md:order-2'}`}>
                              <div className={`h-4 w-4 rounded-full ${ringColor} ring-4 ring-background`}></div>
                         </div>

                         {/* Right Side / Mobile Content */}
                         <div className={`${isLeft ? 'hidden md:block' : 'md:order-3'}`}>
                             {!isLeft && (
                                 <div className="p-5 bg-white dark:bg-card hand-drawn-border-2">
                                     <span className="font-handwriting font-bold text-primary text-base">{exp.period}</span>
                                     <h4 className="text-lg font-bold font-serif-elegant mt-1">{exp.title}</h4>
                                     <p className="text-[#696969] dark:text-muted-foreground text-sm font-sans mt-2">{exp.description}</p>
                                 </div>
                             )}
                             {/* Mobile View for Left Items */}
                             <div className="md:hidden p-5 bg-white dark:bg-card hand-drawn-border-1">
                                <span className="font-handwriting font-bold text-primary text-base">{exp.period}</span>
                                <h4 className="text-lg font-bold font-serif-elegant mt-1">{exp.title}</h4>
                                <p className="text-[#696969] dark:text-muted-foreground text-sm font-sans mt-2">{exp.description}</p>
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
