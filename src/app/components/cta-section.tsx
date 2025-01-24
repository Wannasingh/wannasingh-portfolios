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
import { toast, Toaster } from "sonner";
import { Card } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function CTASection() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });
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
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          style: {
            background: "#4ade80",
            color: "#ffffff",
          },
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.", {
          style: {
            background: "#f87171",
            color: "#ffffff",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        style: {
          background: "#f87171",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`py-6 font-mono transition-opacity duration-1000 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Toaster />
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <Card className="p-6 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">
            Let&apos;s build your full stack masterpiece 🚀
          </h2>
          <p className="mb-4">
            Ready to bring your full stack vision to life? Let&apos;s
            collaborate and create something extraordinary!
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#EDF3FF] text-[#2563EB] hover:bg-[#D9E5FF] px-6">
                Start Your Project
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <form className="grid gap-4" onSubmit={handleSubmit}>
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
                    placeholder="Your email"
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
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </Card>
      </div>
    </section>
  );
}
