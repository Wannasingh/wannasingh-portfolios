"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/hire-me" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/80"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl font-mono">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 border border-primary flex items-center justify-center shrink-0 bg-primary/5">
            <span className="text-primary font-bold text-xs">W</span>
          </div>
          <span className="font-semibold text-xs tracking-wider uppercase text-foreground/80 group-hover:text-foreground transition-colors">
            wannasingh<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive ? `// ${link.name}` : link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/hire-me"
            className="hidden md:inline-flex items-center h-8 px-4 border border-primary bg-transparent text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
          >
            Hire Me
          </Link>
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden overflow-hidden bg-background/98 border-b border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1 font-mono">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive ? `// ${link.name}` : link.name}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-border/50">
                <Link
                  href="/hire-me"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-2 border border-primary bg-transparent text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
