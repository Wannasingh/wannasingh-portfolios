import HeroSection from "@/components/hero-section";
import ToolsSection from "@/components/tools-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/app/components/portfolio-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/app/components/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
