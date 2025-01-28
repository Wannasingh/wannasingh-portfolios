"use client"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import profileImage from "../../images/profile.jpg";
import { TbExternalLink, TbBrandGithub } from "react-icons/tb";
import { motion } from "framer-motion";
import Link from "next/link";
import { StaticImageData } from "next/image";

// First, let's add an interface for the portfolio items
interface PortfolioItem {
  image: StaticImageData;
  title: string;
  description: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function Portfolio() {
  const portfolioItems: PortfolioItem[] = [
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
      tags: ["Next.js", "TailwindCSS", "TypeScript"],
      liveUrl: "https://wannasingh-portfolios.vercel.app/",
      githubUrl: "https://wannasingh-portfolios.vercel.app/"
    },
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
      tags: ["Next.js", "TailwindCSS", "TypeScript"],
      liveUrl: "https://wannasingh-portfolios.vercel.app/",
      githubUrl: "https://wannasingh-portfolios.vercel.app/",
    },
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
      tags: ["Next.js", "TailwindCSS", "TypeScript"],
      liveUrl: "https://wannasingh-portfolios.vercel.app/",
      githubUrl: "https://wannasingh-portfolios.vercel.app/",
    },
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
      tags: ["Next.js", "TailwindCSS", "TypeScript"],
      liveUrl: "https://wannasingh-portfolios.vercel.app/",
      githubUrl: "https://wannasingh-portfolios.vercel.app/",
    },
  ];

  return (
    <motion.section
      id="portfolio"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-6 py-20 mt-16 font-mono" // Added mt-16 for proper spacing from navbar
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Featured Projects
          <span className="text-blue-500 ml-2">🌸</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A collection of projects that showcase my skills in web development
          and design
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {item.liveUrl && (
                    <Link
                      href={item.liveUrl || "#"}
                      className="bg-blue-500 p-2 rounded-lg border-2 border-white text-white hover:bg-blue-600 transition-colors"
                    >
                      <TbExternalLink size={20} />
                    </Link>
                  )}
                  {item.githubUrl && (
                    <Link
                      href={item.githubUrl || "#"}
                      className="bg-gray-800 p-2 rounded-lg border-2 border-white text-white hover:bg-gray-900 transition-colors"
                    >
                      <TbBrandGithub size={20} />
                    </Link>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 px-3 py-1 text-sm border-2 border-black rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}