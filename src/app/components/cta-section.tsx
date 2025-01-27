"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { sendEmail } from "@/lib/email";
import { FaEnvelope } from "react-icons/fa";

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
    await sendEmail(formData, () =>
      setFormData({ name: "", email: "", message: "" })
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-6 font-mono"
    >
      {/* Remove this line since Toaster is already in layout */}
      {/* <Toaster /> */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl font-bold mb-4"
            >
              Let&apos;s build your full stack masterpiece 🚀
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-4"
            >
              Ready to bring your full stack vision to life? Let&apos;s
              collaborate and create something extraordinary!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#EDF3FF] text-[#2563EB] hover:bg-[#D9E5FF] px-6">
                    Start Your Project
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEnvelope className="text-lg" />
                      <span>Send Message</span>
                    </Button>
                  </form>
                </PopoverContent>
              </Popover>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
