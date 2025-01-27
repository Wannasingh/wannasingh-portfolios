import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hire Me",
  description: "Hire me for your next project",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors position="bottom-right" />
    </>
  );
}