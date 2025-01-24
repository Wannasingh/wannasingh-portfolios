"use client"
import { Card } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function ProjectHighlightsSection() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });
  const highlights = [
    {
      title: "E-commerce Platform",
      description: "Built a responsive e-commerce site using React and Node.js, implementing secure payment processing and real-time inventory management.",
      tech: "React, Node.js, MongoDB, Stripe",
    },
    {
      title: "Task Management App",
      description: "Developed a full-stack task management application with user authentication, real-time updates, and a clean, intuitive interface.",
      tech: "Next.js, TypeScript, Supabase, Tailwind CSS",
    },
    {
      title: "Personal Blog",
      description: "Created a performant and SEO-friendly blog using static site generation, featuring a custom CMS for easy content management.",
      tech: "Gatsby, GraphQL, Netlify CMS",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`container mx-auto px-6 py-7 font-mono transition-opacity duration-1000 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Here are some projects I&apos;ve worked on ✨
        </h2>
        <div className="space-y-4">
          {highlights.map((project, index) => (
            <Card
              key={index}
              className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p className="text-xs font-semibold text-blue-600">
                  Tech Stack: {project.tech}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-sm">
            As a new full stack developer, I&apos;m passionate about creating
            efficient, user-friendly applications. I&apos;m constantly learning
            and improving my skills to deliver high-quality solutions. I&apos;m
            excited about the opportunity to bring fresh perspectives and
            innovative ideas to your projects!
          </p>
        </Card>
      </div>
    </section>
  );
}
