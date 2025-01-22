import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

export default function ServicesSection() {
  const stats = [
    { number: "10+", label: "Technologies" },
    { number: "20+", label: "Personal Projects" },
  ];

  const services = [
    {
      icon: <FaReact className="text-blue-500" />,
      title: "React Development",
      description:
        "Crafting responsive and interactive user interfaces with React",
    },
    {
      icon: <RiNextjsFill />,
      title: "Next.js Applications",
      description:
        "Building high-performance server-side rendered and static websites",
    },
    {
      icon: <IoLogoJavascript />,
      title: "Full Stack Integration",
      description:
        "Seamlessly connecting front-end with back-end services and databases",
    },
    {
      icon: "🚀",
      title: "Performance Optimization",
      description:
        "Enhancing app speed and efficiency for optimal user experience",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
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
            <Card key={service.title} className="border-2 rounded-xl">
              <CardContent className="p-6">
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {service.description}
                </p>
                <Link href="#" className="text-sm font-medium text-[#2563EB]">
                  Learn more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
