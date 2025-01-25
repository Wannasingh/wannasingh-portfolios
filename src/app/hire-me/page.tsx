'use client';

import React, { useState } from 'react';
import {ProfileHeader} from '@/components/ProfileHeader';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGit, FaServer, FaTools } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiShadcnui,
  SiVercel,
} from "react-icons/si";
import { BiCodeBlock } from 'react-icons/bi';

export default function HireMePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen -mt-20 pt-20 font-mono">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-yellow-50/20" />
      <div className="container mx-auto px-6 py-8 relative">
        <ProfileHeader
          pageType="hire-me"
          title="Let's Build Something Together"
          description="Full-stack developer ready for your next project"
          primaryButton={{ text: "Contact Now", href: "#contact-form" }}
          secondaryButton={{ text: "View Experience", href: "/about" }}
        />

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Skills & Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
                Skills & Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold flex items-center gap-2">
                    <FaReact className="text-[#61DAFB]" />
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        name: "React",
                        icon: <FaReact className="text-[#61DAFB]" />,
                      },
                      {
                        name: "Next.js",
                        icon: <SiNextdotjs className="text-black" />,
                      },
                      {
                        name: "TypeScript",
                        icon: <SiTypescript className="text-[#3178C6]" />,
                      },
                      {
                        name: "Tailwind CSS",
                        icon: <SiTailwindcss className="text-[#06B6D4]" />,
                      },
                      {
                        name: "Shadcn/ui",
                        icon: <SiShadcnui className="text-black" />,
                      },
                      {
                        name: "Material UI",
                        icon: <BiCodeBlock className="text-[#007FFF]" />,
                      },
                    ].map((skill) => (
                      <span
                        key={skill.name}
                        className="bg-gray-100 px-3 py-1 text-sm border-2 border-black rounded-full flex items-center gap-1"
                      >
                        {skill.icon}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold flex items-center gap-2">
                    <FaServer className="text-[#68A063]" />
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        name: "Node.js",
                        icon: <FaNodeJs className="text-[#68A063]" />,
                      },
                      {
                        name: "Express",
                        icon: <SiExpress className="text-black" />,
                      },
                      {
                        name: "MongoDB",
                        icon: <SiMongodb className="text-[#47A248]" />,
                      },
                      {
                        name: "PostgreSQL",
                        icon: <SiPostgresql className="text-[#336791]" />,
                      },
                      {
                        name: "REST API",
                        icon: <FaServer className="text-[#FF6C37]" />,
                      },
                    ].map((skill) => (
                      <span
                        key={skill.name}
                        className="bg-gray-100 px-3 py-1 text-sm border-2 border-black rounded-full flex items-center gap-1"
                      >
                        {skill.icon}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold flex items-center gap-2">
                    <FaTools className="text-[#4B5563]" />
                    Tools & Others
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        name: "Git",
                        icon: <FaGit className="text-[#F05032]" />,
                      },
                      {
                        name: "Docker",
                        icon: <SiDocker className="text-[#2496ED]" />,
                      },
                      {
                        name: "Figma",
                        icon: <SiFigma className="text-[#F24E1E]" />,
                      },
                      {
                        name: "Vercel",
                        icon: <SiVercel className="text-black" />,
                      },
                      {
                        name: "CI/CD",
                        icon: <BiCodeBlock className="text-[#2088FF]" />,
                      },
                    ].map((skill) => (
                      <span
                        key={skill.name}
                        className="bg-gray-100 px-3 py-1 text-sm border-2 border-black rounded-full flex items-center gap-1"
                      >
                        {skill.icon}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
                Services
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Web Development</h3>
                  <p className="text-gray-600">
                    Full-stack web applications with modern technologies and
                    best practices
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">API Development</h3>
                  <p className="text-gray-600">
                    RESTful APIs and backend services with secure authentication
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">UI/UX Design</h3>
                  <p className="text-gray-600">
                    Responsive and user-friendly interface design with modern
                    aesthetics
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">
                    Code Review & Consulting
                  </h3>
                  <p className="text-gray-600">
                    Technical consultation and code quality improvement
                    suggestions
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
                Availability & Preferences
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Work Hours</h3>
                  <p className="text-gray-600">
                    Available for full-time positions or project-based work
                  </p>
                  <p className="text-gray-600">
                    Flexible hours, can adapt to different time zones
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Collaboration Style</h3>
                  <p className="text-gray-600">
                    Remote-first approach with regular communication
                  </p>
                  <p className="text-gray-600">Agile methodology preferred</p>
                </div>
              </div>
            </motion.div>

            {/* Educational Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
                Educational Background
              </h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-32 shrink-0">
                    <span className="text-sm text-gray-600">
                      Sep 2024 - Jan 2025
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1">
                      Full Stack Developer Certification
                    </h3>
                    <p className="text-purple-600 mb-2">TechUp Bootcamp</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-32 shrink-0">
                    <span className="text-sm text-gray-600">
                      July 2020 - July 2024
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1">
                      Bachelor of Arts in Global Business English
                    </h3>
                    <p className="text-purple-600 mb-3">
                      North Bangkok University
                    </p>
                    <div className="space-y-2">
                      <div className="inline-block bg-black text-white text-sm px-3 py-1 rounded-full">
                        GPAX 3.80
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="font-medium">
                          First-Class Honors, Gold Medal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sticky Contact Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
                  Contact Me
                </h2>
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div className="space-y-4 mb-6">
                    <a
                      href="mailto:wannasingh.khan@gmail.com"
                      className="flex items-center gap-3 hover:text-purple-600 transition-colors"
                    >
                      <FaEnvelope /> <span>wannasingh.khan@gmail.com</span>
                    </a>
                    <a
                      href="https://github.com/Wannasingh"
                      className="flex items-center gap-3 hover:text-purple-600 transition-colors"
                    >
                      <FaGithub /> <span>GitHub Profile</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/wannasingh"
                      className="flex items-center gap-3 hover:text-purple-600 transition-colors"
                    >
                      <FaLinkedin /> <span>LinkedIn Profile</span>
                    </a>
                  </div>

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white font-bold py-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}