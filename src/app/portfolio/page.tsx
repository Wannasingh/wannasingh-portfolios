import PortfolioClient from "@/components/portfolio-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectPage() {
  return <PortfolioClient />;
}
