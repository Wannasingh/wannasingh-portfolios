"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Layout, Terminal, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase, Profile } from "@/app/lib/supabase";

export default function HeroSectionNew() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single();
      
      if (data) setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) {
     return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </section>
     );
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Decor: Data/Grid lines */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      
      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 w-fit">
              <Database className="mr-2 h-3 w-3" />
              <span>{profile?.role || "Full Stack Developer + Oracle DBA"}</span>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {profile?.tagline ? profile.tagline.split('. ').map((part, i, arr) => (
                  <span key={i}>
                      {part}{i < arr.length - 1 ? '.' : ''}
                      {i < arr.length - 1 && <br />}
                  </span>
              )) : (
                  <>
                  Architecting Robust Data. <br />
                  Building Modern Apps.
                  </>
              )}
            </h1>
            
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              {profile?.bio_short || "I don't just write code; I design the infrastructure that powers it. Bridging the gap between complex Oracle database tuning and responsive React interfaces."}
            </p>
            
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/#projects"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                View Selected Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/hire-me"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual "Hybrid" Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl border bg-card/50 shadow-xl backdrop-blur-sm lg:aspect-square"
          >
            {/* A Code/Terminal Visual to represent the "Depth" */}
            <div className="flex lg:h-full flex-col font-mono text-sm">
              <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">wannasingh.dev — bash</div>
              </div>
              
              <div className="flex-1 p-6 space-y-4 text-muted-foreground overflow-x-auto">
                <div className="min-w-[400px]">
                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">1</div>
                    <div>
                      <span className="text-purple-500">class</span> <span className="text-yellow-500">HybridEngineer</span> <span className="text-slate-500">extends</span> <span className="text-blue-500">Developer</span> {"{"}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">2</div>
                    <div className="pl-4">
                      <span className="text-slate-500">// Backend & Database Optimization</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">3</div>
                    <div className="pl-4">
                      <span className="text-purple-500">public</span> <span className="text-blue-500">optimizeQuery</span>(): <span className="text-orange-500">void</span> {"{"}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">4</div>
                    <div className="pl-8">
                       <span className="text-slate-500">this.oracle.tune(</span><span className="text-green-500">&quot;performance&quot;</span><span className="text-slate-500">);</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">5</div>
                    <div className="pl-4">
                      {"}"}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">6</div>
                    <div className="pl-4">
                       <span className="text-slate-500">// Modern UI Implementation</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">7</div>
                    <div className="pl-4">
                      <span className="text-purple-500">public</span> <span className="text-blue-500">renderUI</span>(): <span className="text-orange-500">JSX.Element</span> {"{"}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">8</div>
                    <div className="pl-8">
                      <span className="text-purple-500">return</span> <span className="text-blue-300">&lt;React.App /&gt;</span>;
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">9</div>
                    <div className="pl-4">
                       {"}"}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 text-right text-slate-500 select-none">10</div>
                    <div>{"}"}</div>
                  </div>
                  
                  <motion.div 
                     animate={{ opacity: [1, 0] }}
                     transition={{ repeat: Infinity, duration: 0.8 }}
                     className="h-5 w-2.5 bg-blue-500 ml-4 inline-block align-middle"
                  />
                </div>
              </div>
              
              <div className="border-t bg-muted/40 p-2 text-xs flex justify-between items-center text-muted-foreground px-4">
                 <div className="flex items-center gap-2">
                    <Database className="h-3 w-3" />
                    <span>Oracle 21c AI</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Layout className="h-3 w-3" />
                    <span>Next.js 15</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
