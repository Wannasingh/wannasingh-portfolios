"use client"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import profileImage from "../../images/profile.jpg";
import { TbExternalLink } from "react-icons/tb";
import { motion } from "framer-motion";

export default function Portfolio() {
  const portfolioItems = [
    {
      image: profileImage ,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
    {
      image: profileImage ,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-6 py-16 font-mono space-y-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold flex items-center gap-2 md:justify-center"
      >
        My Portfolio <span className="text-blue-500">🌸</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
          >
            <Card className="bg-white px-4 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full aspect-[4/3] object-cover rounded-sm md:pb-28 pb-24"
                />
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="absolute bottom-14 md:bottom-16 left-3 px-3 py-1"
                >
                  <p className="font-bold text-lg">{item.title}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="absolute bottom-4 md:bottom-10 left-3 text-xl px-3 py-1"
                >
                  <p className="font-bold text-sm">{item.description}</p>
                </motion.div>
                <button className="absolute bottom-3 right-3 bg-white p-1.5 border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <TbExternalLink />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}