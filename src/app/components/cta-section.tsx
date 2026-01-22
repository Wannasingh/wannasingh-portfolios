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
import { Mail, Sparkles } from "lucide-react";

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [open, setOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail(formData, () => {
      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    });
  };

  return (
    <section className="py-24 bg-background border-t" id="contact">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center space-y-8"
        >
          <div className="space-y-4">
             <div className="inline-flex items-center rounded-full border bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground backdrop-blur-sm">
                <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
                <span>Ready to scale?</span>
             </div>
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Let&apos;s build your masterpiece.
             </h2>
             <p className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
                Whether you need a database overhaul or a pixel-perfect frontend, 
                I bring the full stack of expertise to your team.
             </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Start Your Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Send a Message</DialogTitle>
              </DialogHeader>
              <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
