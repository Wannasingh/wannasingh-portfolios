import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { icon: "🌐", href: "#" },
    { icon: "📱", href: "#" },
    { icon: "✉️", href: "#" },
  ];

  return (
    <footer className="py-6 border-t border-[#E5E5E5]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Portfolio 2024</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-500 hover:text-gray-700"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
