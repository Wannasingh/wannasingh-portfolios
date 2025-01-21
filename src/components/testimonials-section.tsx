import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Design is a bridge that connects everyone and everything",
      author: "Client First Name",
      role: "UX Designer, Company Name",
      avatar: "/placeholder.svg",
    },
    {
      quote: "Design is a bridge that connects everyone and everything",
      author: "Client Name",
      role: "UX Designer, Company Name",
      avatar: "/placeholder.svg",
    },
    {
      quote: "Design is a bridge that connects everyone and everything",
      author: "Client Name",
      role: "UX Designer, Company Name",
      avatar: "/placeholder.svg",
    },
    {
      quote: "Design is a bridge that connects everyone and everything",
      author: "Client Name",
      role: "UX Designer, Company Name",
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">
          Here&apos;s what my clients
          <br />
          are saying about my work
        </h2>
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 rounded-xl">
              <CardContent className="p-6 flex items-start space-x-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="text-gray-800 mb-2">{testimonial.quote}</p>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
