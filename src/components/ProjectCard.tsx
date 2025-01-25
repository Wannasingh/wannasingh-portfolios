import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import * as Popover from '@radix-ui/react-popover';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-white border-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] 
    transition-all duration-300">
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
                <h1 className="text-3xl font-bold text-white mb-2">
                  {project.name}
                </h1>
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
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-0.5 rounded hover:bg-white/30 transition-colors duration-200">
                          +{project.technologies.length - 3} more
                        </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content 
                          className="bg-white rounded-lg p-4 z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95" 
                          sideOffset={5}
                        >
                          <div className="flex flex-wrap gap-2 max-w-[250px]">
                            {project.technologies.slice(3).map((tech, index) => (
                              <span
                                key={index}
                                className="bg-blue-50 text-black text-xs font-medium px-2.5 py-0.5 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <Popover.Arrow className="fill-black stroke-black stroke-2" />
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
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
              className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-900 rounded transform hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <FiGithub className="text-xl" />
              View Source
            </Link>
            <Link
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-300 hover:bg-blue-400 text-black font-bold py-2 px-4 border-b-4 border-blue-500 hover:border-blue-600 rounded transform hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <FiExternalLink className="text-xl" />
              Live Demo
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}