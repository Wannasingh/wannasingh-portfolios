"use client";

import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface AnimatedSectionProps {
  children: React.ReactNode;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  threshold = 0.1,
}) => {
  const [sectionRef, isSectionVisible] =
    useIntersectionObserver<HTMLDivElement>({
      threshold,
    });

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity duration-1000 ${
        isSectionVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
