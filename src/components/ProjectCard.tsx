import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Project } from '@/app/lib/api-client';
import { resolveImageUrl } from '@/app/lib/storage-utils';
import { ExternalLink, Maximize2, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  readonly project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isDemoActive = project.demo_link && project.demo_link !== "#";
  const isGithubActive = project.github_link && project.github_link !== "#";

  return (
    <Card className="rounded-none bg-card border border-border/80 hover:border-primary/50 hover:shadow-[0_8px_32px_-12px_rgba(255,90,0,0.15)] transition-all duration-500 group/card relative overflow-hidden">
      {/* Grid Coordinates watermark */}
      <div className="absolute top-2 right-3 mono text-[7px] text-muted-foreground/60 select-none pointer-events-none">
        [ PRJ-{project.id.slice(0, 4).toUpperCase()} ]
      </div>

      <div className="flex flex-col lg:flex-row min-h-[420px]">
        {/* Project Visual/CAD Column */}
        <div className="lg:w-[42%] bg-muted/5 border-b lg:border-b-0 lg:border-r border-border/80 flex items-center justify-center p-6 sm:p-8 relative overflow-hidden shrink-0 min-h-[280px]">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8E95A506_1px,transparent_1px),linear-gradient(to_bottom,#8E95A506_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          {project.image_path && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative w-full aspect-[16/10] border border-border/80 bg-background/50 overflow-hidden flex flex-col cursor-zoom-in group/mockup hover:scale-[1.01] hover:border-primary/40 transition-all duration-300 rounded-none">
                  {/* Schematic status bar header */}
                  <div className="h-6 bg-muted/40 border-b border-border/60 flex items-center px-3 justify-between shrink-0 select-none">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary/80" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/30" />
                    </div>
                    <div className="bg-background/80 text-[8px] text-muted-foreground/80 px-2 py-0.5 border border-border/30 truncate max-w-[150px] text-center font-mono">
                      {isDemoActive ? project.demo_link.replace(/^https?:\/\//, "") : "SCHEMATIC_LATEST.SVG"}
                    </div>
                  </div>

                  {/* Screenshot/CAD Viewport */}
                  <div className="relative w-full flex-1 overflow-hidden bg-muted/10">
                    <Image
                      src={resolveImageUrl(project.image_path, 'projects')}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-102"
                      unoptimized={project.image_path.startsWith('http')}
                    />
                    
                    {/* Dark overlay with Zoom icon on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white">
                      <div className="p-2 bg-white/10 rounded-none border border-white/20 scale-90 group-hover/mockup:scale-100 transition-transform duration-300">
                        <Maximize2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider">EXPAND SCHEMA</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              {/* Lightbox popup */}
              <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-card border border-border rounded-none">
                <div className="flex flex-col h-[80vh]">
                  <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between shrink-0">
                    <div>
                      <DialogTitle className="text-base font-extrabold uppercase tracking-wide">{project.title}</DialogTitle>
                      <DialogDescription className="text-xs text-muted-foreground mt-0.5 font-mono truncate max-w-[70vw]">
                        {isDemoActive ? `Live Server: ${project.demo_link}` : "Product Technical Schematic"}
                      </DialogDescription>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-muted/5 p-4 sm:p-6 scrollbar-thin">
                    <div className="relative w-full border border-border bg-background shadow-md overflow-hidden">
                      <Image
                        src={resolveImageUrl(project.image_path, 'projects')}
                        alt={project.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Project Details and Specifications */}
        <div className="lg:w-[58%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 text-foreground group-hover/card:text-primary transition-colors duration-300">
                {project.title}
              </h2>

              {/* SPECIFICATION SHEET BLOCK */}
              <div className="border border-border/80 p-4 bg-muted/5 font-mono text-[10px] sm:text-[11px] space-y-2 rounded-none mb-6">
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span className="text-muted-foreground">PRODUCT CATEGORY:</span>
                  <span className="text-foreground font-semibold uppercase">{project.category || 'INFRASTRUCTURE'}</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span className="text-muted-foreground">OPERATIONAL LIMIT (THROUGHPUT):</span>
                  <span className="text-foreground font-semibold uppercase">{project.throughput || 'AUTO-SCALE'}</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-1">
                  <span className="text-muted-foreground">TARGET LATENCY:</span>
                  <span className="text-foreground font-semibold uppercase">{project.latency || '< 200MS'}</span>
                </div>
                <div className="flex justify-between pb-0">
                  <span className="text-muted-foreground">STATUS:</span>
                  <span className="text-primary font-bold uppercase">[ ACTIVE_PRODUCTION ]</span>
                </div>
              </div>

              {/* Tech stack components inventory */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech_stack?.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-none border border-border bg-secondary/50 text-[9px] font-mono font-medium text-muted-foreground uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm mb-6 leading-relaxed">
                {project.overview}
              </p>

              {/* Key Features list */}
              {project.key_features && project.key_features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {"// KEY SPECIFICATIONS"}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                    {project.key_features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-1.5 text-foreground/80 font-mono text-[11px] leading-snug">
                        <span className="mt-1.5 h-1 w-1 bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex gap-6 mt-8 pt-4 border-t border-border/60">
            {isGithubActive && (
              <Link
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all duration-200 group/link"
              >
                <FaGithub className="h-4 w-4 text-primary" />
                View Source
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-y-0.5 -translate-x-0.5 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200" />
              </Link>
            )}
            {isDemoActive && (
              <Link
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary hover:text-primary/80 hover:translate-x-0.5 transition-all duration-200 group/link"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-y-0.5 -translate-x-0.5 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}