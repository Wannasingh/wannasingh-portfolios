"use client"
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "E-commerce Platform",
      role: "React, Node.js, MongoDB, Stripe",
      quote: "Built a responsive e-commerce site using React and Node.js, implementing secure payment processing and real-time inventory management.",
    },
    {
      name: "Task Management App",
      role: "Next.js, TypeScript, Supabase, Tailwind CSS",
      quote: "Developed a full-stack task management application with user authentication, real-time updates, and a clean, intuitive interface.",
    },
    {
      name: "Personal Blog",
      role: "Gatsby, GraphQL, Netlify CMS",
      quote: "Created a performant and SEO-friendly blog using static site generation, featuring a custom CMS for easy content management.",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Project Highlights
          <span className="text-blue-500 ml-2">✨</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here are some of the projects I&apos;ve worked on and the impact
          they&apos;ve made
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300">
              <FaQuoteLeft className="text-blue-500 mb-4 text-xl" />
              <p className="text-gray-600 mb-6">{item.quote}</p>
              <div className="border-t-2 border-gray-100 pt-4">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-blue-500">{item.role}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12"
      >
        <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-50">
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            As a new full stack developer, I&apos;m passionate about creating
            efficient, user-friendly applications. I&apos;m constantly learning
            and improving my skills to deliver high-quality solutions. I&apos;m
            excited about the opportunity to bring fresh perspectives and
            innovative ideas to your projects!
          </p>
        </Card>
      </motion.div>
    </section>
  );
}
