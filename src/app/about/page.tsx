import AboutMeClient from "@/components/AboutMeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
};

export default function AboutPage() {
  return <AboutMeClient />;
}

