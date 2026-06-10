import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/lib/supabase";
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
    <Card className="overflow-hidden bg-card border hover:shadow-xl transition-all duration-500 group/card">
      <div className="flex flex-col lg:flex-row min-h-[420px]">
        {/* Project Image Column with browser mockup & gradient/grid background */}
        <div className="lg:w-[42%] bg-gradient-to-br from-primary/5 via-muted/30 to-primary/10 border-b lg:border-b-0 lg:border-r border-border/60 flex items-center justify-center p-6 sm:p-8 relative overflow-hidden shrink-0 min-h-[300px] lg:min-h-full">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          {/* Subtle glowing light sphere in background */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover/card:bg-primary/10 transition-colors duration-700" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover/card:bg-primary/15 transition-colors duration-700" />

          {project.image_path && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative w-full aspect-[16/10] shadow-2xl rounded-lg border border-border bg-background overflow-hidden flex flex-col cursor-zoom-in group/mockup hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300">
                  {/* Browser window controls header */}
                  <div className="h-7 bg-muted/90 border-b border-border/80 flex items-center px-3 gap-1.5 shrink-0 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/90" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/90" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/90" />
                    <div className="mx-auto bg-background/50 text-[9px] text-muted-foreground/60 px-3 py-0.5 rounded border border-border/30 truncate max-w-[140px] text-center font-mono">
                      {isDemoActive ? project.demo_link.replace(/^https?:\/\//, "") : "localhost:3000"}
                    </div>
                  </div>

                  {/* Screenshot viewport container */}
                  <div className="relative w-full flex-1 overflow-hidden bg-muted/10">
                    <Image
                      src={project.image_path}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-105"
                      unoptimized={project.image_path.startsWith('http')}
                    />
                    
                    {/* Dark overlay with Zoom icon on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white">
                      <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 scale-90 group-hover/mockup:scale-100 transition-transform duration-300">
                        <Maximize2 className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Click to Expand</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              {/* Lightbox popup contents */}
              <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-card border rounded-xl">
                <div className="flex flex-col h-[85vh]">
                  {/* Header row */}
                  <div className="p-4 border-b bg-muted/30 flex items-center justify-between shrink-0">
                    <div>
                      <DialogTitle className="text-lg font-bold">{project.title}</DialogTitle>
                      <DialogDescription className="text-xs text-muted-foreground mt-0.5 font-mono truncate max-w-[70vw]">
                        {isDemoActive ? `Live: ${project.demo_link}` : "Project Design / Local Preview"}
                      </DialogDescription>
                    </div>
                  </div>

                  {/* Scrollable image body */}
                  <div className="flex-1 overflow-y-auto bg-muted/10 p-4 sm:p-6 scrollbar-thin">
                    <div className="relative w-full rounded-lg border border-border bg-background shadow-md overflow-hidden">
                      <Image
                        src={project.image_path}
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
        <div className="lg:w-[58%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-foreground group-hover/card:text-primary transition-colors duration-300">
                {project.title}
              </h2>
              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech_stack?.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded border border-border bg-secondary/40 text-[10px] sm:text-xs font-mono font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack && project.tech_stack.length > 6 && (
                  <span className="px-2 py-0.5 rounded border border-border bg-secondary/40 text-[10px] sm:text-xs font-mono font-medium text-muted-foreground">
                    +{project.tech_stack.length - 6}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
              {project.overview}
            </p>

            {/* Key features */}
            {project.key_features && project.key_features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                  {project.key_features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-foreground/80 leading-snug">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="flex gap-6 mt-10 pt-6 border-t border-border/50">
            {isGithubActive && (
              <Link
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all duration-200 group/link"
              >
                <FaGithub className="h-4 w-4" />
                View Source
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-y-0.5 -translate-x-0.5 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200" />
              </Link>
            )}
            {isDemoActive && (
              <Link
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 hover:translate-x-0.5 transition-all duration-200 group/link"
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