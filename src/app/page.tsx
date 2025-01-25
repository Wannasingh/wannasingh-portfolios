"use client";
import HeroSection from "@/components/hero-section";
import ToolsSection from "@/components/tools-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import PortfolioSection from "@/app/components/portfolio-section";
import CTASection from "@/app/components/cta-section";
import AnimatedSection from "@/components/AnimatedSection";
export default function Home() {
  return (
    <>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection>
        <ToolsSection />
      </AnimatedSection>
      <AnimatedSection>
        <ServicesSection />
      </AnimatedSection>
      <AnimatedSection>
        <PortfolioSection />
      </AnimatedSection>
      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>
      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
