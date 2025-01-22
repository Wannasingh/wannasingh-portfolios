import { Card } from "@/components/ui/card";
import Image from "next/image";
import profileImage from "../../images/profile.jpg";
import { TbExternalLink } from "react-icons/tb";

export default function Portfolio() {
  const portfolioItems = [
    {
      image: profileImage ,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
    {
      image: profileImage ,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
    {
      image: profileImage,
      title: "Portfolio design",
      description: "UI design - User research - webflow develop",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 font-mono space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 md:justify-center">
        My Portfolio <span className="text-blue-500">🌸</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item, index) => (
          <div key={index} className="group relative">
            <Card className="bg-white px-4 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full aspect-[4/3] object-cover rounded-sm md:pb-28 pb-24"
                />
                <div className="absolute bottom-14 md:bottom-16 left-3 px-3 py-1">
                  <p className="font-bold text-lg">{item.title}</p>
                </div>
                <div className="absolute bottom-4 md:bottom-10 left-3 text-xl px-3 py-1">
                  <p className="font-bold text-sm">{item.description}</p>
                </div>
                <button className="absolute bottom-3 right-3 bg-white p-1.5 border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <TbExternalLink />
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}