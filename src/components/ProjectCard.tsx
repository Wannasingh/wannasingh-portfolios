import Link from "next/link";
import Image from "next/image";
import { Project } from '@/app/lib/api-client';
import { resolveImageUrl } from '@/app/lib/storage-utils';
import { ArrowUpRight } from "lucide-react";
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
    <div className="py-12 md:py-16 border-b border-border/80 transition-all duration-300 group/card relative">
      {/* Structural coordinate tag */}
      <div className="absolute top-2 right-0 mono text-[8px] text-muted-foreground select-none">
        [ REF: PRODUCT_PRJ_{project.id.slice(0, 4).toUpperCase()} ]
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Project Visual Column (Editorial image frame) */}
        <div className="w-full lg:w-[48%] shrink-0">
          {project.image_path && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative w-full aspect-[16/10] border border-border/80 bg-[#F4F5F8] dark:bg-muted/10 cursor-zoom-in group/mockup hover:border-primary/50 transition-all duration-300">
                  {/* Viewport status indicator */}
                  <div className="h-6 px-3 bg-muted/40 dark:bg-muted/10 border-b border-border/60 flex items-center justify-between text-[8px] font-mono text-muted-foreground">
                    <span className="uppercase tracking-wider">render_view_active.jpg</span>
                    <span>100% RENDER SCALE</span>
                  </div>
                  
                  {/* Screenshot Viewport */}
                  <div className="relative w-full flex-1 aspect-[16/9.5] overflow-hidden">
                    <Image
                      src={resolveImageUrl(project.image_path, 'projects')}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-[1.02]"
                      unoptimized={project.image_path.startsWith('http')}
                    />
                    
                    {/* Minimalist overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-3 py-1.5 bg-background border border-border/80 font-mono text-[9px] uppercase tracking-wider text-foreground shadow-sm">
                        Zoom Schematic
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              {/* Lightbox popup */}
              <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background border border-border rounded-none shadow-2xl">
                <div className="flex flex-col h-[80vh]">
                  <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between shrink-0">
                    <div>
                      <DialogTitle className="text-sm font-extrabold uppercase tracking-wide">{project.title}</DialogTitle>
                      <DialogDescription className="text-xs text-muted-foreground mt-0.5 font-mono">
                        {isDemoActive ? `Resource URI: ${project.demo_link}` : "Product Visual Preview"}
                      </DialogDescription>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin bg-muted/5">
                    <div className="relative w-full border border-border bg-background overflow-hidden">
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

        {/* Project Details Column */}
        <div className="w-full lg:w-[52%] space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191919] dark:text-foreground font-serif-elegant">
              {project.title}
            </h2>
            <div className="font-handwriting text-lg text-primary font-bold">
              {"// "}{project.category || 'Development Product'}
            </div>
          </div>

          <p className="text-[#696969] dark:text-muted-foreground text-xs sm:text-sm leading-relaxed font-sans">
            {project.overview}
          </p>

          {/* SPECIFICATION SHEET BLOCK (Stark editorial specification) */}
          <div className="hand-drawn-border-1 p-5 bg-[#F4F5F8] dark:bg-muted/10 font-mono text-[10px] sm:text-[11px] space-y-2">
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">PRODUCT LINE:</span>
              <span className="text-[#191919] dark:text-foreground font-semibold uppercase">{project.category || 'SYSTEMS'}</span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">OPERATIONAL THROUGHPUT:</span>
              <span className="text-[#191919] dark:text-foreground font-semibold uppercase">{project.throughput || 'LOAD-BALANCED'}</span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">LATENCY TOLERANCE:</span>
              <span className="text-[#191919] dark:text-foreground font-semibold uppercase">{project.latency || '< 200MS'}</span>
            </div>
            <div className="flex justify-between pb-0">
              <span className="text-muted-foreground">OPERATIONAL STATUS:</span>
              <span className="text-primary font-bold uppercase">[ STABLE_PRODUCTION ]</span>
            </div>
          </div>

          {/* Tech stack components inventory */}
          <div className="space-y-2">
            <div className="font-handwriting text-lg text-[#696969] dark:text-muted-foreground font-bold">{"// Component Inventory"}</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech_stack?.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 border border-border/80 bg-secondary/50 text-[9px] font-mono text-muted-foreground uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.key_features && project.key_features.length > 0 && (
            <div className="space-y-2">
              <div className="font-handwriting text-lg text-[#696969] dark:text-muted-foreground font-bold">{"// Product Specifications"}</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-xs font-mono text-[#696969] dark:text-muted-foreground">
                {project.key_features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Links */}
          <div className="flex gap-6 pt-4 border-t border-border/60">
            {isGithubActive && (
              <Link
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {"// VIEW SOURCE"}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}
            {isDemoActive && (
              <Link
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors duration-200"
              >
                {"// LIVE SERVICE"}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}