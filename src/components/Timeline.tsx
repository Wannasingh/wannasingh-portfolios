"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { BiLogoJavascript } from "react-icons/bi";
import { FaReact } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress, SiTypescript, SiNextdotjs } from "react-icons/si";
import { IoLogoVue } from "react-icons/io5";

interface TimelineProps {
  className?: string;
}

const skills = [
  {
    id: 1,
    name: "JavaScript",
    color: "bg-yellow-200",
    year: 2024,
    icons: <BiLogoJavascript />,
    iconColor: "text-yellow-500",
    text: "Mastered core JavaScript concepts, including ES6+ features, asynchronous programming, and DOM manipulation.",
  },
  {
    id: 2,
    name: "React",
    color: "bg-blue-200",
    year: 2024,
    icons: <FaReact />,
    iconColor: "text-blue-300",
    text: "Developed proficiency in building dynamic user interfaces with React, including state management, hooks, and component lifecycle.",
  },
  {
    id: 3,
    name: "Express.js",
    color: "bg-green-200",
    year: 2024,
    icons: <SiExpress />,
    iconColor: "text-green-500",
    text: "Gained expertise in creating robust RESTful APIs and server-side applications using Express.js framework.",
  },
  {
    id: 4,
    name: "Node.js",
    color: "bg-green-200",
    year: 2024,
    icons: <FaNodeJs />,
    iconColor: "text-green-300",
    text: "Acquired strong skills in server-side JavaScript, including event-driven architecture and npm ecosystem.",
  },
  {
    id: 5,
    name: "TypeScript",
    color: "bg-blue-300",
    year: 2025,
    icons: <SiTypescript />,
    iconColor: "text-blue-500",
    text: "Embraced static typing and advanced OOP concepts, enhancing code quality and maintainability in large-scale applications.",
  },
  {
    id: 6,
    name: "Next.js",
    color: "bg-gray-200",
    year: 2025,
    icons: <SiNextdotjs />,
    iconColor: "text-black-500",
    text: "Explored server-side rendering, static site generation, and optimized React applications using Next.js framework.",
  },
  {
    id: 7,
    name: "Vue.js",
    color: "bg-green-100",
    year: 2025,
    icons: <IoLogoVue />,
    iconColor: "text-green-300",
    text: "Expanded frontend skills by learning Vue.js, focusing on its reactive data model and component-based architecture.",
  },
];

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ className }, ref) => {
    const [activeSkill, setActiveSkill] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const timelineRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      const handleScroll = () => {
        if (timelineRef.current) {
          const items = timelineRef.current.querySelectorAll(".timeline-item");
          items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            if (isVisible) {
              (item as HTMLElement).style.transform = `translateY(${
                index * 10
              }px)`;
              (item as HTMLElement).style.zIndex = `${items.length - index}`;
            }
          });
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseEnter = (index: number, event: React.MouseEvent) => {
      setActiveSkill(index);
      setIsHovering(true);
      updateTooltipPosition(event);
    };

    const handleMouseLeave = () => {
      setActiveSkill(null);
      setIsHovering(false);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
      if (isHovering) {
        updateTooltipPosition(event);
      }
    };

    const updateTooltipPosition = (event: React.MouseEvent) => {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    if (!isMounted) {
      return null; 
    }
    return (
      <div ref={ref} className={className}>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-6 p-4 border-2 rounded-sm border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            My Skills Timeline
          </h2>
          <div className="relative" ref={timelineRef}>
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className={`timeline-item mb-8 flex p-4 border-2 rounded-sm border-black transition-all duration-300 ${
                  activeSkill === index
                    ? `${skill.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
                    : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
                style={{
                  transform: `translateY(${index * 10}px)`,
                  zIndex: skills.length - index,
                }}
                onMouseEnter={(e) => handleMouseEnter(index, e)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`w-4 h-4 ${
                      activeSkill === index ? "bg-black" : "bg-blue-500"
                    } mb-2 rounded-full`}
                  ></div>
                  {index !== skills.length - 1 && (
                    <div className="w-1 h-full bg-blue-300"></div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <span className={skill.iconColor}>{skill.icons}</span>
                    <span className={skill.iconColor}>{skill.name}</span>
                  </h3>
                  <p className="text-gray-600">Learned in {skill.year}</p>
                  <p className="mt-2">
                    {skill.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {isHovering && activeSkill !== null && (
            <div
              className="fixed bg-black text-white p-2 rounded-md text-sm z-50"
              style={{
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y + 10,
              }}
            >
              {skills[activeSkill].name} - {skills[activeSkill].year}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Timeline.displayName = "Timeline";