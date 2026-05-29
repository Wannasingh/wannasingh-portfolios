"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { sendEmail } from "@/lib/email";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail(formData, () => {
      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    });
  };

  return (
    <section className="py-32 relative overflow-hidden" id="contact">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,hsl(210_100%_56%_/_0.08),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="mono text-xs text-primary tracking-widest uppercase mb-4">
            Let&apos;s Work Together
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
            Got a project?
            <br />
            <span className="text-gradient">Let&apos;s build it right.</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Whether it&apos;s a database that won&apos;t scale, an app that needs rebuilding,
            or a greenfield product — I help teams ship faster with fewer architectural regrets.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-150 shadow-lg shadow-primary/20 group">
                  <Mail className="h-4 w-4" />
                  Send a Message
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px] rounded-xl border-border bg-card">
                <DialogHeader>
                  <DialogTitle className="text-base font-bold">Send a Message</DialogTitle>
                  <p className="text-xs text-muted-foreground">
                    I&apos;ll reply within one business day.
                  </p>
                </DialogHeader>
                <form className="grid gap-3.5 pt-1" onSubmit={handleSubmit}>
                  <div className="grid gap-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} className="h-9 rounded-lg text-sm" required />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@company.com" value={formData.email} onChange={handleInputChange} className="h-9 rounded-lg text-sm" required />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell me about your project..." value={formData.message} onChange={handleInputChange} className="rounded-lg min-h-[100px] resize-none text-sm" required />
                  </div>
                  <Button type="submit" className="w-full h-9 rounded-lg text-sm font-semibold">
                    Send Message
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Link
              href="/hire-me"
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-border text-muted-foreground font-semibold text-sm hover:text-foreground hover:border-primary/30 hover:bg-white/5 transition-all duration-150"
            >
              View contact page
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
