"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail(formData, () => {
      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    });
  };

  return (
    <section className="py-28 relative overflow-hidden" id="contact">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-background to-violet-500/[0.04] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">
              Let&apos;s Work Together
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 max-w-2xl">
              Have a project in mind?
              <br />
              <span className="text-gradient">I&apos;d love to help.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              Whether you need a database overhaul, a performant web application, or an
              end-to-end solution — I bring the full engineering stack to your team.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-px transition-all duration-150">
                    <Mail className="h-4 w-4" />
                    Send a Message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[420px] rounded-2xl border border-border">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Send a Message</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      I typically respond within one business day.
                    </p>
                  </DialogHeader>
                  <form className="grid gap-4 pt-2" onSubmit={handleSubmit}>
                    <div className="grid gap-1.5">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="rounded-lg h-10"
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="rounded-lg h-10"
                        required
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project or challenge..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="rounded-lg min-h-[110px] resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-10 rounded-lg font-semibold"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Link
                href="/hire-me"
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/30 hover:bg-secondary transition-all duration-150"
              >
                View full contact page
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Your information is kept private and never shared.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
