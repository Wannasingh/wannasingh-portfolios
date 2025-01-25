"use client";
import { Timeline } from "@/components/Timeline";
import { Card } from "@/components/ui/card";
import { FaCode, FaServer, FaDatabase, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ProfileHeader";
interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutMeClient = () => {
  return (
    <div className="relative min-h-screen -mt-20 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-yellow-50/20" />
      <div className="container mx-auto px-6 py-16 font-mono relative">
        <ProfileHeader />

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard
              icon={<FaCode className="text-3xl" />}
              title="Frontend Expertise"
              description="I specialize in creating responsive and intuitive user interfaces using React and Next.js."
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
        </motion.div>

        {/* What Drives Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white/80">
            <h2 className="text-3xl font-bold mb-6">What Drives Me</h2>
            <p className="text-lg leading-relaxed">
              What drives me is the challenge of building scalable, efficient
              applications that solve real-world problems. I thrive on finding
              innovative solutions and continuously expanding my knowledge in this
              ever-evolving field. Whether it&apos;s optimizing database queries,
              implementing complex frontend state management, or architecting
              microservices, I&apos;m always eager to dive in and make things work
              seamlessly.
            </p>
          </Card>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Timeline className="p-8 relative" />
        </motion.div>
      </div>
    </div>
  );
};

// Update the SkillCard component
const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description }) => (
  <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:transform hover:-translate-y-1 transition-all duration-200 bg-white/80">
    <div className="flex flex-col items-center text-center h-full justify-between p-4">
      <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-xl p-4 mb-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </Card>
);

export default AboutMeClient;
