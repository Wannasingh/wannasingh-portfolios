"use client";
import HandDrawnMindMap from "@/components/HandDrawnMindMap";
import FeaturedProjectsSection from "@/components/featured-projects-section";
import CTASection from "@/app/components/cta-section";

console.log("Portfolio Redesign - Concept 'Hand-Drawn Sketch Mind-Map' loaded");

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Hand-Drawn interactive mind-map serves as the hero canvas */}
      <HandDrawnMindMap />
      
      {/* Selected projects showcase */}
      <FeaturedProjectsSection />
      
      <div className="pb-20">
        <CTASection />
      </div>
    </main>
  );
}
