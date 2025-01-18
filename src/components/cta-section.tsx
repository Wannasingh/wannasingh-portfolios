import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Let&apos;s start designing your project
        </h2>
        <p className="text-gray-500 mb-8">
          Want to see how to transform your brand into a
          <br />
          unique style, sent us a message
        </p>
        <Button className="rounded-full bg-[#EDF3FF] text-[#2563EB] hover:bg-[#D9E5FF] px-6">
          Send us message
        </Button>
      </div>
    </section>
  );
}
