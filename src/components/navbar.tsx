"use client";
import Link from "next/link";
import { TbCodeVariable } from "react-icons/tb";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="container mx-auto fixed top-0 left-0 right-0 z-50 p-4 lg:p-6">
      {/* Desktop Navigation */}
      <nav className="bg-white/90 backdrop-blur-md hidden md:flex items-center justify-between rounded-3xl px-8 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-emerald-400 to-blue-500 p-2.5 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <TbCodeVariable size={22} className="text-white" />
          </div>
          <span className="text-xl font-mono font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            {`<Wannasingh />`}
          </span>
        </Link>

        {/* Code-themed divider */}
        <div className="hidden md:flex items-center space-x-2 text-zinc-600">
          <span className="font-mono">{`{`}</span>
          <div className="h-6 w-px bg-zinc-700"></div>
          <span className="font-mono">{`}`}</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/about"
            className="px-6 py-2.5 rounded-xl text-zinc-800 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-mono"
          >
            about()
          </Link>
          <Link
            href="/portfolio"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-mono"
          >
            portfolio()
          </Link>
          <Link
            href="/hire-me"
            className="px-6 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-mono"
          >
            contact()
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="bg-white/90 backdrop-blur-md md:hidden flex items-center justify-between rounded-2xl px-5 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="bg-gradient-to-br from-emerald-400 to-blue-500 p-2 rounded-lg">
            <TbCodeVariable size={20} className="text-white" />
          </div>
          <span className="text-lg font-mono font-bold text-zinc-800">
            {`<ws/>`}
          </span>
        </Link>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className="w-full h-0.5 bg-zinc-800 transition-all duration-300"></span>
            <span className="w-full h-0.5 bg-zinc-800 transition-opacity duration-300"></span>
            <span className="w-full h-0.5 bg-zinc-800 transition-all duration-300"></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 right-0 mt-2 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-white/90 backdrop-blur-md mx-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Link
            href="/about"
            className="block px-6 py-4 text-zinc-800 hover:bg-zinc-100 rounded-t-2xl transition-all duration-200 font-mono"
            onClick={handleLinkClick}
          >
            about()
          </Link>
          <Link
            href="/portfolio"
            className="block px-6 py-4 text-zinc-800 hover:bg-zinc-100 transition-all duration-200 font-mono"
            onClick={handleLinkClick}
          >
            portfolio()
          </Link>
          <Link
            href="/hire-me"
            className="block px-6 py-4 text-zinc-800 hover:bg-zinc-100 rounded-b-2xl transition-all duration-200 font-mono"
            onClick={handleLinkClick}
          >
            contact()
          </Link>
        </div>
      </div>
    </header>
  );
}
