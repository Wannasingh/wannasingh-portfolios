import { Button } from "@/components/ui/button";
import PictureProfile from "@/images/profile.jpg";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, LightbulbIcon, CodeIcon, SparklesIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="main" className="relative container px-6 py-16 mx-auto md:py-24 font-mono overflow-hidden">
      {/* Decorative Icons */}
      <motion.div 
        animate={{ 
          rotate: [0, -10, 0],
          y: [-5, 5, -5]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-4 md:top-16 md:left-8"
      >
        <Star className="w-8 h-8 text-pink-500" />
      </motion.div>

      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-8 md:top-20 md:right-16"
      >
        <SparklesIcon className="w-6 h-6 text-blue-400" />
      </motion.div>

      <motion.div 
        animate={{ 
          y: [-5, 5, -5],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-24 left-8 md:bottom-32 md:left-20"
      >
        <CodeIcon className="w-8 h-8 text-purple-500" />
      </motion.div>

      <motion.div 
        animate={{ 
          scale: [1, 0.9, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-16 right-4 md:bottom-24 md:right-12"
      >
        <LightbulbIcon className="w-10 h-10 text-yellow-400" />
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side: Text and Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full md:w-1/2 flex flex-col items-start z-10"
        >
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            <span className="text-gray-900">Building</span>
            <span className="relative inline-block mx-2">
              <span className="relative z-10">digital</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 -z-10"></span>
            </span>
            <span className="text-gray-900">experiences with code.</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Full-stack developer crafting seamless, user-centric web solutions with modern technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 w-full md:w-auto">
            <Link href="/portfolio" className="w-full">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-center gap-2">
                View Projects
              </Button>
            </Link>
            <Link href="/hire-me" className="hidden md:block w-full">
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-center gap-2">
                Contact Me
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Profile Image */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full md:w-1/2"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl transform rotate-3"></div>
            <Image
              src={PictureProfile}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-300"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
