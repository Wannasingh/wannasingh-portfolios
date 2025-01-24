import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-white border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Project Image Section */}
        <div className="lg:w-2/5 relative">
          {project.imagePath && (
            <div className="relative h-[300px] lg:h-full">
              <Image
                src={project.imagePath}
                alt={project.name}
                layout="fill"
                objectFit="cover"
                className="brightness-90 hover:brightness-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 z-10">
                <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-white/80 text-xs">+{project.technologies.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Details Section */}
        <div className="lg:w-3/5 p-6 lg:p-8 space-y-6">
          <p className="text-gray-600">{project.overview}</p>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              {project.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center font-medium"
            >
              View Source
            </Link>
            <Link
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-center font-medium"
            >
              Live Demo
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}