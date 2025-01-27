import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wannasingh Portfolio",
  description: "I design top notch websites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#FFFDF9] text-[#1E1E1E]`}
      >
        <Header />
        <main className="pt-16">{children}</main>
        <Toaster richColors position="bottom-right" />
        <Footer />
      </body>
    </html>
  );
}
