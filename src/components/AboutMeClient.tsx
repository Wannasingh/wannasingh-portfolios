"use client";
import { useEffect, useState } from "react";
import { Database, Layout } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";
import { supabase, Experience, Profile } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";

const AboutMeClient = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
          primaryButton={{ text: "View Portfolio", href: "/portfolio" }}
          secondaryButton={{ text: "Contact Me", href: "/hire-me" }}
        />

        {/* Narrative Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">The &quot;Heavy Lifting&quot; Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                 My journey didn&apos;t start with CSS animations. It started with <code>Oracle 19c</code> execution plans, PL/SQL optimization, and table partitioning.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                 When I transitioned to Full Stack development, I carried this &quot;Architecture First&quot; mindset with me. I don&apos;t just build pages; I build systems that can handle the load, ensuring the data layer is as performant as the UI layer.
              </p>
           </div>
           <div className="relative aspect-square md:aspect-auto md:h-full bg-secondary/20 rounded-2xl border flex items-center justify-center p-8">
               {/* Visual Analogy */}
               <div className="text-center space-y-4">
                  <div className="flex gap-4 justify-center">
                      <div className="flex flex-col items-center p-4 bg-card rounded-xl border shadow-sm">
                          <Database className="h-8 w-8 text-blue-500 mb-2"/>
                          <span className="font-bold text-sm">Solid Data</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-card rounded-xl border shadow-sm">
                          <Layout className="h-8 w-8 text-purple-500 mb-2"/>
                          <span className="font-bold text-sm">Fluid UI</span>
                      </div>
                  </div>
                  <div className="h-px bg-border w-1/2 mx-auto"></div>
                  <p className="font-mono text-sm text-muted-foreground">The Perfect Balance</p>
               </div>
           </div>
        </div>

        {/* The Evolution Timeline */}
        <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h3 className="text-2xl font-bold mb-4">My Evolution</h3>
               <p className="text-muted-foreground">A path from deep backend infrastructure to modern frontend mastery.</p>
            </div>

            <div className="relative border-l border-border ml-4 md:ml-1/2 space-y-12 pl-8 md:pl-0">
               
               {experiences.map((exp, index) => {
                   const isLeft = index % 2 === 0;
                   const colorClass = index === 0 ? "blue" : index === 1 ? "purple" : "green";
                   // Simple color mapping logic matching the original design
                   const badgeColor = index === 0 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                                      index === 1 ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                                      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
                   
                   const ringColor = index === 0 ? "bg-blue-500" : index === 1 ? "bg-purple-500" : "bg-green-500";

                   return (
                    <motion.div 
                        key={exp.id || index}
                        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-8 items-center"
                    >
                        {/* Left Side Content */}
                        <div className={`md:text-right space-y-2 ${!isLeft ? 'md:order-3 md:text-left' : ''} ${!isLeft ? 'hidden md:block' : ''}`}>
                            {isLeft && (
                                <>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>{exp.period}</span>
                                    <h4 className="text-xl font-bold">{exp.title}</h4>
                                    <p className="text-muted-foreground text-sm">{exp.description}</p>
                                </>
                            )}
                        </div>

                        {/* Center Marker */}
                        <div className={`hidden md:flex justify-center ${!isLeft ? 'md:order-2' : ''}`}>
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
                            {/* Mobile View for Left Items (shows up below on mobile because of block layout, but map renders sequentially) */}
                            {/* Actually strictly speaking with the original layout, mobile shows everything in one column. 
                                The original code used 'hidden md:flex' for the marker.
                                On mobile, the grid is disabled, so it's just a stack. 
                                We need to render the content for both cases if we want pure responsiveness.
                            */}
                             <div className="md:hidden space-y-2">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>{exp.period}</span>
                                <h4 className="text-xl font-bold">{exp.title}</h4>
                                <p className="text-muted-foreground text-sm">{exp.description}</p>
                            </div>
                        </div>
                         
                         {/* Fix for right side desktop items to show on mobile? 
                             The loop logic above is a bit complex for a prompt replacement.
                             Let's simplify.
                         */}
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
