"use client";
import { DynamicHeading } from "@/components/DynamicHeading";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import profilePic from "@/images/profile.jpg";

export const ProfileHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
          <Image
            src={profilePic}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div className="flex-1 space-y-6">
          <DynamicHeading />
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 hover:transform hover:-translate-y-1 transition-all duration-200">
            <p className="text-lg">
              Hello! My name is Wannasingh. I&apos;m a passionate Full Stack
              Developer with a knack for crafting robust and user-friendly web
              applications.
            </p>
          </Card>
          <div className="flex gap-4 justify-start">
            <Link
              href="/hire-me"
              className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-6 border-b-4 border-yellow-500 hover:border-yellow-600 rounded transform hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block"
            >
              Hire Me
            </Link>
            <Link
              href="/portfolio"
              className="bg-blue-300 hover:bg-blue-400 text-black font-bold py-2 px-6 border-b-4 border-blue-500 hover:border-blue-600 rounded transform hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};