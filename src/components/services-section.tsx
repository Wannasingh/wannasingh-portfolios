import { Card } from "@/components/ui/card";
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaNode } from "react-icons/fa6";
import { ReactNode } from 'react';

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="w-8 h-8 flex items-center justify-center font-bold mb-2">
        {icon}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Card>
  );
}

export default function ServicesSection() {
  const stats = [
    { number: "10+", label: "Technologies" },
    { number: "20+", label: "Personal Projects" },
  ];

  const services = [
    {
      icon: <FaReact/>,
      title: "React Development",
      description: "Crafting responsive and interactive user interfaces with React",
    },
    {
      icon: <RiNextjsFill/>,
      title: "Next.js Applications",
      description: "Building high-performance server-side rendered and static websites",
    },
    {
      icon: <IoLogoJavascript/>,
      title: "Full Stack Integration",
      description: "Seamlessly connecting front-end with back-end services and databases",
    },
    {
      icon: <FaNode/>,
      title: "Performance Optimization",
      description: "Enhancing app speed and efficiency for optimal user experience",
    },
  ];

  return (
      <section className="container mx-auto px-4 py-16 font-mono">
        <h2 className="text-2xl font-semibold mb-8">
          Services I&apos;m providing
          <br />
          that derive 99% result ☺️
        </h2>
        <div className="grid grid-cols-2 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>
  );
}
