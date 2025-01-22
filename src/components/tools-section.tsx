import { FaReact, FaDocker, FaNodeJs, } from "react-icons/fa";
import { SiMongodb, SiTypescript } from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";

export default function ToolsSection() {
  const tools = [
    { name: "React", icon: <FaReact /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Supabase", icon: <RiSupabaseFill /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Docker", icon: <FaDocker /> },
  ];

  return (
    <section className="py-6 border-y border-[#E5E5E5]">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-4 md:flex md:flex-wrap md:justify-between items-center gap-4 md:gap-0">
          {tools.map((tool, index) => (
            <li 
              key={tool.name} 
              className={`text-sm text-gray-500 flex items-center justify-center md:justify-start ${
                index === 3 ? 'col-span-2 hidden md:flex' : ''
              }`}
            >
              <span className="mr-2 text-lg md:text-base">{tool.icon}</span>
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
