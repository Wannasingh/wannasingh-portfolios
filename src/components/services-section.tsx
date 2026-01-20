"use client";
import { Card } from "@/components/ui/card";
import { RiNextjsFill } from "react-icons/ri";
import { FaReact, FaNode } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiDotnet, SiOracle } from "react-icons/si";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase, Stat, Service } from "../app/lib/supabase";

// Map icon names to actual icon components
const iconMap: Record<string, ReactNode> = {
  FaReact: <FaReact />,
  RiNextjsFill: <RiNextjsFill />,
  IoLogoJavascript: <IoLogoJavascript />,
  FaNode: <FaNode />,
  SiDotnet: <SiDotnet />,
  SiOracle: <SiOracle />,
};

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      id="services"
    >
      <Card className="p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 flex items-center justify-center text-xl">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch stats
        const { data: statsData, error: statsError } = await supabase
          .from('stats')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (statsError) throw statsError;

        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (servicesError) throw servicesError;

        setStats(statsData || []);
        setServices(servicesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-6 py-20 font-mono"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Services I&apos;m providing
          <br />
          <span className="relative inline-block mt-2">
            that derive
            <span className="relative z-10 mx-2">99%</span>
            result
            <span className="inline-block ml-2">☺️</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 -z-10"></span>
          </span>
        </h2>

        <div className="flex justify-center gap-12 mt-10">
          {loading ? (
            <p className="text-gray-600">กำลังโหลด...</p>
          ) : (
            stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">กำลังโหลดบริการ...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">ยังไม่มีบริการที่แสดง</p>
          </div>
        ) : (
          services.map((service, index) => {
            const IconComponent = iconMap[service.icon_name];
            const iconWithColor = IconComponent ? (
              <span style={{ color: service.icon_color }}>{IconComponent}</span>
            ) : null;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard
                  icon={iconWithColor}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            );
          })
        )}
      </div>
    </motion.section>
  );
}
