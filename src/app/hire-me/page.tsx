import HireMeClient from "@/components/hire-me-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Me",
};

export default function HireMePage() {
  return <HireMeClient />;
}
