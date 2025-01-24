"use client";
import { DynamicHeading } from "@/components/DynamicHeading";
import { Timeline } from "@/components/Timeline";
import { Card } from "@/components/ui/card";
import { FaCode, FaServer, FaDatabase, FaUsers } from "react-icons/fa";
import Image from "next/image";
import profilePic from "@/images/profile.jpg";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const AboutMeClient = () => {
  return (
    <div className="container mx-auto px-6 py-16 font-mono">
      <AnimatedSection>
        <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">Who Am I?</h2>
          <p className="text-lg">
            Hello! My name is Wannasingh. I&apos;m a passionate Full Stack
            Developer with a knack for crafting robust and user-friendly web
            applications. My journey in the world of coding has equipped me with
            a versatile skill set spanning both frontend and backend
            technologies.
          </p>
        </Card>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <SkillCard
            icon={<FaCode className="text-3xl mb-2" />}
            title="Frontend Expertise"
            description="I specialize in creating responsive and intuitive user interfaces using React and Next.js. I love bringing designs to life and ensuring a smooth user experience across all devices."
          />
          <SkillCard
            icon={<FaServer className="text-3xl mb-2" />}
            title="Backend Proficiency"
            description="I'm proficient in Node.js and Express, building RESTful APIs and server-side logic that power modern web applications."
          />
          <SkillCard
            icon={<FaDatabase className="text-3xl mb-2" />}
            title="Database Knowledge"
            description="My database expertise covers both SQL (MySQL) and NoSQL (MongoDB) solutions, allowing me to choose the best data storage approach for each project."
          />
          <SkillCard
            icon={<FaUsers className="text-3xl mb-2" />}
            title="Soft Skills"
            description="I pride myself on being a strong team player with excellent communication skills. I believe in the power of collaboration and enjoy working in diverse, cross-functional teams."
          />
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-8">
          <h2 className="text-2xl font-bold mb-4">What Drives Me</h2>
          <p className="text-lg">
            What drives me is the challenge of building scalable, efficient
            applications that solve real-world problems. I thrive on finding
            innovative solutions and continuously expanding my knowledge in this
            ever-evolving field. Whether it&apos;s optimizing database queries,
            implementing complex frontend state management, or architecting
            microservices, I&apos;m always eager to dive in and make things work
            seamlessly.
          </p>
        </Card>
      </AnimatedSection>

      <AnimatedSection>
        <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-8">
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect!</h2>
          <p className="text-lg">
            I&apos;m excited about the endless possibilities in software
            development and am always looking for new challenges to tackle.
            Let&apos;s connect and create something amazing together!
          </p>
        </Card>
      </AnimatedSection>

      <AnimatedSection>
        <Timeline className="p-8 relative px-4 mt-8" />
      </AnimatedSection>

      <AnimatedSection>
        <div className="mt-12 flex flex-col items-center">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="relative w-64 h-64 mb-6 mx-auto">
              <Image
                src={profilePic}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-sm border-4 border-gray-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <div className="w-full max-w-2xl mb-6">
              <DynamicHeading />
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                href="/hire-me"
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 border-b-4 border-yellow-500 hover:border-yellow-600 rounded transform hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block"
              >
                Hire Me
              </Link>
              <Link
                href="/portfolio"
                className="bg-blue-300 hover:bg-blue-400 text-black font-bold py-2 px-4 border-b-4 border-blue-500 hover:border-blue-600 rounded transform hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block"
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description }) => (
  <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  </Card>
);

export default AboutMeClient;
