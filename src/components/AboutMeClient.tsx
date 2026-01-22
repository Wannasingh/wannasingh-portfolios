"use client";
import { Card } from "@/components/ui/card";
import { Database, Layout, Server, ArrowUpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";

const AboutMeClient = () => {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <ProfileHeader
          pageType="about"
          title="From The Engine Room To The Controls"
          description="Most developers learn frameworks first. I learned data first. This foundation shapes everything I build today."
          primaryButton={{ text: "View Portfolio", href: "/portfolio" }}
          secondaryButton={{ text: "Contact Me", href: "/hire-me" }}
        />

        {/* Narrative Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">The "Heavy Lifting" Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                 My journey didn't start with CSS animations. It started with <code>Oracle 19c</code> execution plans, PL/SQL optimization, and table partitioning.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                 When I transitioned to Full Stack development, I carried this "Architecture First" mindset with me. I don't just build pages; I build systems that can handle the load, ensuring the data layer is as performant as the UI layer.
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
               
               {/* Phase 1 */}
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-8 items-center"
               >
                  <div className="md:text-right space-y-2">
                     <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold dark:bg-blue-900/30 dark:text-blue-300">2020 - 2024</span>
                     <h4 className="text-xl font-bold">The Foundation (Oracle DBA)</h4>
                     <p className="text-muted-foreground text-sm">Managing enterprise data at North Bangkok University. Learning the hard truths about query costs, indexing strategies, and data integrity.</p>
                  </div>
                  <div className="hidden md:flex justify-center">
                     <div className="h-4 w-4 rounded-full bg-blue-500 ring-4 ring-background"></div>
                  </div>
                  <div className="hidden md:block"></div> {/* Spacer */}
               </motion.div>

               {/* Phase 2 */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-8 items-center"
               >
                  <div className="hidden md:block"></div> {/* Spacer */}
                  <div className="hidden md:flex justify-center">
                     <div className="h-4 w-4 rounded-full bg-purple-500 ring-4 ring-background"></div>
                  </div>
                  <div className="space-y-2">
                     <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold dark:bg-purple-900/30 dark:text-purple-300">2024 - 2025</span>
                     <h4 className="text-xl font-bold">The Bridge (Full Stack)</h4>
                     <p className="text-muted-foreground text-sm">TechUp Bootcamp. Translating database logic into API endpoints (Node.js) and consuming them with React/Next.js. The "Aha!" moment where infrastructure met interface.</p>
                  </div>
               </motion.div>

               {/* Phase 3 */}
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative md:grid md:grid-cols-[1fr_40px_1fr] md:gap-8 items-center"
               >
                  <div className="md:text-right space-y-2">
                     <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold dark:bg-green-900/30 dark:text-green-300">Current</span>
                     <h4 className="text-xl font-bold">The Hybrid Engineer</h4>
                     <p className="text-muted-foreground text-sm">Building performance-critical applications where milliseconds matter. Leveraging 'Explain Plan' intuition to write better 'useEffect' hooks.</p>
                  </div>
                  <div className="hidden md:flex justify-center">
                     <div className="h-4 w-4 rounded-full bg-green-500 ring-4 ring-background"></div>
                  </div>
                  <div className="hidden md:block"></div>
               </motion.div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutMeClient;
