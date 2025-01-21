import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function PortfolioSection() {
  const portfolioItems = [
    {
      image: "/placeholder.svg",
      title: "Portfolio design",
      description: "UX design - User research - webflow develop",
    },
    {
      image: "/placeholder.svg",
      title: "Portfolio design",
      description: "UX design - User research - webflow develop",
    },
    {
      image: "/placeholder.svg",
      title: "Portfolio design",
      description: "UX design - User research - webflow develop",
    },
    {
      image: "/placeholder.svg",
      title: "Portfolio design",
      description: "UX design - User research - webflow develop",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8 flex items-center">
          My Portfolio
          <span className="text-3xl ml-2">❄️</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="overflow-hidden border-2 rounded-xl">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
