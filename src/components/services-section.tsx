import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ServicesSection() {
  const stats = [
    { number: "39", label: "Projects" },
    { number: "100k+", label: "generated" },
  ];

  const services = [
    {
      icon: "✨",
      title: "User Research",
      description: "Services we're providing that derive 99% result",
    },
    {
      icon: "🎨",
      title: "Wireframing",
      description: "Services we're providing that derive 99% result",
    },
    {
      icon: "💡",
      title: "UI Designing",
      description: "Services we're providing that derive 99% result",
    },
    {
      icon: "⚡",
      title: "Prototyping",
      description: "Services we're providing that derive 99% result",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">
          Services we&apos;re providing
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
