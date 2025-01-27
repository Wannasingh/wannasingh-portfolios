"use client";
import { Card } from "@/components/ui/card";
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaNode } from "react-icons/fa6";
import { ReactNode } from "react";
import { motion } from "framer-motion";

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 flex items-center justify-center text-xl">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
}

export default function ServicesSection() {
  const stats = [
    { number: "10+", label: "Technologies", color: "text-blue-500" },
    { number: "20+", label: "Personal Projects", color: "text-pink-500" },
  ];

  const services = [
    {
      icon: <FaReact className="text-[#61DAFB]" />,
      title: "React Development",
      description:
        "Crafting responsive and interactive user interfaces with React",
    },
    {
      icon: <RiNextjsFill className="text-black" />,
      title: "Next.js Applications",
      description:
        "Building high-performance server-side rendered and static websites",
    },
    {
      icon: <IoLogoJavascript className="text-[#F7DF1E]" />,
      title: "Full Stack Integration",
      description:
        "Seamlessly connecting front-end with back-end services and databases",
    },
    {
      icon: <FaNode className="text-[#339933]" />,
      title: "Performance Optimization",
      description:
        "Enhancing app speed and efficiency for optimal user experience",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-6 py-20 font-mono"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Services I&apos;m providing
          <br />
          <span className="relative inline-block mt-2">
            that derive
            <span className="relative z-10 mx-2">99%</span>
            result
            <span className="inline-block ml-2">☺️</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 -z-10"></span>
          </span>
        </h2>
        
        <div className="flex justify-center gap-12 mt-10">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
