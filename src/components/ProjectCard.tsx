import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/legacy/image";
import { Project } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";


interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-card border hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Project Image Section */}
        <div className="lg:w-2/5 relative min-h-[250px] lg:min-h-full">
          {project.imagePath && (
            <Image
              src={project.imagePath}
              alt={project.name}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        {/* Project Details Section */}
        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col">
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
               {project.name}
            </h2>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {project.technologies.slice(0, 5).map((tech, index) => (
                  <span key={index} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                      {tech}
                  </span>
              ))}
              {project.technologies.length > 5 && (
                  <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                      +{project.technologies.length - 5}
                  </span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
            {project.overview}
          </p>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Key Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {project.keyFeatures.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground/80">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t">
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              View Source
            </Link>
            <Link
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}