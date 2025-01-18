"use client";
import Link from "next/link";
import Image from "next/image";
import StarIcon from "../assets/Vector.svg";
import Border from "../assets/Rectangle 27.svg";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto relative">
        {/* Desktop Navigation */}
        <nav className="bg-white border-2 border-black hidden md:flex items-stretch justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] relative">
          <Image
            src={Border}
            alt="Top Left Border"
            width={10}
            className="absolute -top-[6px] -left-[6px]"
          />
          <Image
            src={Border}
            alt="Top Right Border"
            width={10}
            className="absolute -top-[6px] -right-[6px] transform rotate-90 shadow-[2px_-4px_0px_0px_rgba(0,0,0,0.15)]"
          />
          <Image
            src={Border}
            alt="Bottom Left Border"
            width={10}
            className="absolute -bottom-[6px] -left-[6px] transform -rotate-90 shadow-[-4px_2px_0px_0px_rgba(0,0,0,0.15)]"
          />
          <Image
            src={Border}
            alt="Bottom Right Border"
            width={10}
            className="absolute -bottom-[6px] -right-[6px] transform rotate-180 shadow-[-4px_-2px_0px_0px_rgba(0,0,0,0.15)]"
          />
          <Link
            href="/"
            className="flex items-center px-4 py-2 border-r-2 border-black"
          >
            <Image
              src={StarIcon}
              alt="Star icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-xl font-bold">wannasingh</span>
          </Link>
          <div className="flex h-full">
            <Link
              href="/about"
              className="px-6 py-3 text-base font-medium border-r-2 border-l-2 border-black flex items-center"
            >
              About //
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3 text-base font-medium border-r-2 border-black flex items-center relative"
            >
              <span className="bg-yellow-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                Portfolio
              </span>
              <span className="relative text-black z-10">Portfolio</span>
            </Link>
            <Link
              href="/hire-me"
              className="px-6 py-3 text-base font-medium flex items-center"
            >
              Hire Me
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="bg-white border-2 border-black md:hidden flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] relative p-2">
          <Image
            src={Border}
            alt="Top Left Border"
            width={10}
            className="absolute -top-[6px] -left-[6px]"
          />
          <Image
            src={Border}
            alt="Top Right Border"
            width={10}
            className="absolute -top-[6px] -right-[6px] transform rotate-90 shadow-[2px_-4px_0px_0px_rgba(0,0,0,0.15)]"
          />
          <Image
            src={Border}
            alt="Bottom Left Border"
            width={10}
            className="absolute -bottom-[6px] -left-[6px] transform -rotate-90 shadow-[-4px_2px_0px_0px_rgba(0,0,0,0.15)]"
          />
          <Image
            src={Border}
            alt="Bottom Right Border"
            width={10}
            className="absolute -bottom-[6px] -right-[6px] transform rotate-180 shadow-[-4px_-2px_0px_0px_rgba(0,0,0,0.15)]"
          />
          <Link href="/" className="flex items-center">
            <Image
              src={StarIcon}
              alt="Star icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-xl font-bold">wannasingh</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-black"></span>
              <span className="w-full h-0.5 bg-black"></span>
              <span className="w-full h-0.5 bg-black"></span>
            </div>
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
            <Link
              href="/about"
              className="block px-6 py-3 text-base font-medium border-b-2 border-black"
            >
              About //
            </Link>
            <Link
              href="/portfolio"
              className="block px-6 py-3 text-base font-medium border-b-2 border-black relative"
            >
              <span className="relative z-10">
                Portfolio
                <span className="absolute inset-0 bg-yellow-300 -z-10 transform skew-x-12"></span>
              </span>
            </Link>
            <Link
              href="/hire-me"
              className="block px-6 py-3 text-base font-medium"
            >
              Hire Me
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
