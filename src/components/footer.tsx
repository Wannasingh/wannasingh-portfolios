import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Wannasingh Portfolio. Built with Next.js & Tailwind.
        </p>
        <div className="flex gap-4">
          <Link href="https://github.com/Wannasingh" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
             <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
