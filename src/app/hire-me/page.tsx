"use client";

import React, { useState, useEffect } from "react";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Github, Linkedin, Mail, FileText, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { sendEmail } from "@/lib/email";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button";
import { supabase, Availability, Profile } from "@/app/lib/supabase";

export default function HireMePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isResumeRequest: false,
  });

  const [availability, setAvailability] = useState<Availability[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const [availResult, profileResult] = await Promise.all([
            supabase.from('availability').select('*').order('display_order', { ascending: true }),
            supabase.from('profile').select('*').single()
        ]);
        
        if (availResult.data) setAvailability(availResult.data);
        if (profileResult.data) setProfile(profileResult.data);
        setLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail(formData, () =>
      setFormData({ name: "", email: "", message: "", isResumeRequest: false })
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
      return (
          <div className="min-h-screen bg-background pt-32 pb-20 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <ProfileHeader
          pageType="hire-me"
          title="Let's Build Something Scalable"
          description={profile?.bio_short || "Ready to bring database-level optimization to your full-stack project? I'm currently available for freelance and full-time opportunities."}
          primaryButton={{ text: "Email Me", href: `mailto:${profile?.email || 'wannasingh.khan@gmail.com'}` }}
          secondaryButton={{ text: "View Portfolio", href: "/portfolio" }}
        />

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mt-12">
          {/* Contact Information & Context */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect & Profile</h3>
              <div className="flex flex-col gap-3">
                 <a href={`mailto:${profile?.email || 'wannasingh.khan@gmail.com'}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" /> {profile?.email || 'wannasingh.khan@gmail.com'}
                 </a>
                 {profile?.github_link && (
                    <a href={profile.github_link} target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-4 w-4" /> GitHub Profile
                    </a>
                 )}
                 {profile?.linkedin_link && (
                    <a href={profile.linkedin_link} target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" /> LinkedIn Profile
                    </a>
                 )}
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-lg font-semibold">Availability</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  I typically respond within 24 hours. I am open to discussing:
               </p>
               <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {availability.map((item, index) => (
                      <li key={item.id || index}>{item.item_text}</li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 md:p-8 bg-card border shadow-sm">
               <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
               <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                     <label htmlFor="name" className="text-sm font-medium">Name</label>
                     <Input
                       id="name"
                       name="name"
                       placeholder="Your name"
                       value={formData.name}
                       onChange={handleChange}
                       required
                       className="bg-background"
                     />
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="email" className="text-sm font-medium">Email</label>
                     <Input
                       type="email"
                       id="email"
                       name="email"
                       placeholder="you@company.com"
                       value={formData.email}
                       onChange={handleChange}
                       required
                       className="bg-background"
                     />
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="message" className="text-sm font-medium">Message</label>
                     <Textarea
                       id="message"
                       name="message"
                       placeholder="Tell me about your project or role..."
                       value={formData.message}
                       onChange={handleChange}
                       rows={5}
                       required
                       className="bg-background"
                     />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="resumeRequest"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={formData.isResumeRequest}
                      onChange={(e) => setFormData({ ...formData, isResumeRequest: e.target.checked })}
                    />
                    <label
                      htmlFor="resumeRequest"
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      I would like to request a copy of your resume
                    </label>
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    {formData.isResumeRequest ? <FileText className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    {formData.isResumeRequest ? "Request Resume" : "Send Message"}
                  </Button>
               </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
