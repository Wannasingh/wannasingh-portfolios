import { Button } from "@/components/ui/button";
import PictureProfile from "@/images/profile.jpg";
import Image from "next/image";
import Border from "../assets/Border.svg";
import {
  Star,
  LightbulbIcon,
  CodeXml,
} from "lucide-react";
import Frame13 from "../assets/Frame 13.svg";
import Frame22 from "../assets/Frame 22.svg";

export default function HeroSection() {
  return (
    <main className="relative container px-4 py-12 pt-20 mx-auto md:pt-28">
      {/* Pink Star Decoration */}
      <div className="absolute -top-4 left-8 w-36 h-36 md:w-48 md:h-48 -rotate-12 md:-top-5 md:left-2">
        <div className="flex justify-start md:justify-start">
          <Star className="w-8 h-8 text-pink-500" />
        </div>
      </div>
      <div className="absolute w-36 h-36 -top-6 -right-14 md:-top-4 md:-right-20 md:w-36 md:h-36 -rotate-45">
        <div className="flex justify-end md:justify-end">
          <Star className="w-8 h-8 text-pink-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Left Side: Text and Button */}
        <div className="relative w-full md:w-1/2 md:mt-40 flex flex-col items-start z-10">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight relative md:text-left">
            I craft <span className="inline-block mx-2">✍️</span> top notch{" "}
            <span className="relative z-10">
              websites
              <span className="absolute inset-2 bg-yellow-300 -z-10"></span>
            </span>{" "}
            <span>with cutting-edge code and creativity.</span>
          </h1>

          {/* Portfolio Button and Frame13 Image */}
          <div className="relative pt-5 md:pt-8 pb-16">
            <Button className="bg-blue-400 px-8 py-6 md:px-10 md:py-6 rounded-full text-lg md:text-xl font-medium border-4 border-black hover:bg-blue-500 transition-colors shadow-md text-black">
              See Portfolio
            </Button>
            <div className="absolute -right-8 top-10 w-12 h-12 md:w-12 md:h-12 md:-right-8 md:top-16">
              <Image
                src={Frame13}
                alt="Frame 13"
                width={64}
                height={64}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Decorative Frame */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 mt-10 md:mt-10">
          <div className="absolute -top-14 right-36 md:-top-24 md:right-40 z-10">
            <Image
              src={Frame22}
              alt="Frame 22"
              width={360}
              height={120}
              className="drop-shadow-lg"
            />
          </div>
          {/* Main border frame */}
          <Image
            src={Border}
            alt="Decorative border"
            width={384}
            height={384}
            className="absolute inset-0 w-full h-full filter drop-shadow-lg"
          />

          {/* Image container */}
          <div className="absolute inset-6 overflow-hidden border-collapse border-gray-300 rounded-sm">
            <Image
              src={PictureProfile}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          </div>

          {/* Light bulb circle */}
          <div className="absolute bottom-48 -left-6 md:bottom-72 md:-left-8 w-16 h-16 md:w-20 md:h-20 bg-yellow-300 rounded-full flex items-center justify-center shadow-md">
            <LightbulbIcon className="w-10 h-10 md:w-12 md:h-12 text-black" />
          </div>

          {/* Star decoration */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-12 h-12 md:w-16 md:h-16">
            <CodeXml className="w-8 h-8 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Pink Star Decoration (Bottom Left) */}
      <div className="absolute bottom-0 left-0">
        <Star className="w-8 h-8 text-pink-500" />
      </div>
    </main>
  );
}
