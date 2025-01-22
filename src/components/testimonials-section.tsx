import { Card } from "@/components/ui/card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Design is a bridge that connects business goals with user needs. Really happy with the outcome!",
      author: "Client Name",
      initials: "CN",
    },
    {
      quote: "Design is a bridge that connects business goals with user needs. Really happy with the outcome!",
      author: "Client Name",
      initials: "CN",
    },
  ];

  return (
      <section className="container mx-auto px-4 py-7 font-mono">
        {/* Testimonials Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Here&apos;s what my clients are saying about my work ✨
          </h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
  );
}
