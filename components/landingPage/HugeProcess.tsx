"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ExpandOnHover from "@/components/ui/expand-card";

import process1 from "@/assets/process-1.jpg";
import process2 from "@/assets/process-2.jpg";
import process3 from "@/assets/process-3.jpg";
import process4 from "@/assets/process-4.jpg";
import process5 from "@/assets/process-5.jpg";
import process6 from "@/assets/process-6.jpg";
import process7 from "@/assets/process-7.jpg";
import process8 from "@/assets/process-8.jpg";
import process9 from "@/assets/process-9.jpg";
import process10 from "@/assets/process-10.jpg";

const steps = [
  {
    n: "01",
    title: "Discover",
    desc: "We uncover business goals, user needs and technical constraints to establish a clear foundation.",
    image: process1,
  },
  {
    n: "02",
    title: "Research",
    desc: "Market analysis, competitor reviews and user insights help identify opportunities and risks.",
    image: process2,
  },
  {
    n: "03",
    title: "Strategy",
    desc: "We define priorities, success metrics and a roadmap aligned with business objectives.",
    image: process3,
  },
  {
    n: "04",
    title: "Architecture",
    desc: "Systems, infrastructure and integrations are designed for scalability, reliability and performance.",
    image: process4,
  },
  {
    n: "05",
    title: "UX/UI Design",
    desc: "User journeys, interfaces and motion systems are crafted to create intuitive experiences.",
    image: process5,
  },
  {
    n: "06",
    title: "Development",
    desc: "Engineers build production-ready features with continuous reviews and iterative releases.",
    image: process6,
  },
  {
    n: "07",
    title: "Quality Assurance",
    desc: "Functional, usability and cross-platform testing ensure a consistent user experience.",
    image: process7,
  },
  {
    n: "08",
    title: "Security Testing",
    desc: "Vulnerability assessments, access-control reviews and penetration testing strengthen protection.",
    image: process8,
  },
  {
    n: "09",
    title: "Launch",
    desc: "Deployment, monitoring and performance validation ensure a smooth and reliable release.",
    image: process9,
  },
  {
    n: "10",
    title: "Scale & Support",
    desc: "We optimize, maintain and evolve the product through data-driven improvements and support.",
    image: process10,
  },
];

export function HugeProcess() {
  return (
    <section className="relative px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-32 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6">
            How we work
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] sm:leading-[1.02]">
            A calm, repeatable{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block font-serif italic font-normal text-foreground/80"
                initial={{ y: "110%", rotateX: -40 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.22 290), oklch(0.82 0.2 30))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                process
              </motion.span>
            </span>
            .
          </h2>
        </motion.div>

        {/* EXPAND ON HOVER */}
        <ExpandOnHover items={steps} />
      </div>
    </section>
  );
}