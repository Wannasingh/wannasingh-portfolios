"use client";
import HeroSectionNew from "@/components/hero-section-new";
import HybridAdvantageSection from "@/components/hybrid-advantage-section";
import FeaturedProjectsSection from "@/components/featured-projects-section";
import TechStackSection from "@/components/tech-stack-section";
import CTASection from "@/app/components/cta-section";

console.log("Portfolio Redesign - Typewriter Editorial Home loaded");

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <HeroSectionNew />
      <HybridAdvantageSection />
      <FeaturedProjectsSection />
      <TechStackSection />
      <div className="pb-20">
        <CTASection />
      </div>
    </main>
  );
}
