"use client";

import { useState, useEffect } from "react";

const headings = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Tech Innovator",
];

export const DynamicHeading = () => {
  const [currentHeading, setCurrentHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-md font-bold mb-8 text-center">
      I am a {""}
      <span className="inline-block transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-blue-500">
        {headings[currentHeading]}
      </span>{" "}
      <span>
        with experience in building scalable web applications using React,
        Node.js, and SQL databases.
      </span>
      <span>
        I enjoy solving complex problems and continuously improving my coding
        skills. My goal is to contribute to impactful projects and grow within a
        dynamic tech environment.
      </span>
    </span>
  );
};
