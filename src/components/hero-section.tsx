import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            I design <span className="text-yellow-400">⚡</span> top
            <br />
            notch websites
          </h1>
          <Button className="rounded-full bg-[#EDF3FF] text-[#2563EB] hover:bg-[#D9E5FF] px-6">
            See Portfolio
          </Button>
        </div>
        <div className="mt-12 max-w-xs mx-auto">
          <div className="relative aspect-square bg-[#F5F5F5] rounded-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">☺️</span>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
