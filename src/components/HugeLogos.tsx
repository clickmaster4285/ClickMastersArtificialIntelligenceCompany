import { motion } from "framer-motion";
import { useRef, useState } from "react";
import heroVideo from "@/assets/hero.mp4";

import AiVideo from "@/assets/ai.mp4";
import AppVideo from "@/assets/mobile.mp4";
import WebVideo from "@/assets/web.mp4";



type Project = {
  name: string;
  tag: string;
  accent: string;
  bg: string;
  colSpan: string;
  aspect: string;
  video: string;
};

const projects: Project[] = [
 {
  name: "AI Development",
  tag: "Custom AI Solutions",
  accent: "#A5D8FF", // pastel blue
  bg: "linear-gradient(135deg, #0B0F19 0%, #121826 60%, #1B2742 100%)",
  colSpan: "md:col-span-8",
    aspect: "aspect-[16/10]",
  video: heroVideo,
},
{
  name: "App Develop-ment",
  tag: "iOS · Android",
  accent: "#FFD6A5", // pastel peach
  bg: "linear-gradient(135deg, #0B0F19 0%, #121826 60%, #3A2518 100%)",
  colSpan: "md:col-span-4",
  aspect: "aspect-[4/5]",
    video: AppVideo,
},
{
  name: "Machine Learning",
  tag: "Models · Automation",
  accent: "#B8E6D3", // pastel mint
  bg: "linear-gradient(135deg, #0B0F19 0%, #121826 60%, #18352E 100%)",
  colSpan: "md:col-span-4",
  aspect: "aspect-[4/5]",
    video: AiVideo,
},
{
  name: "Web Development",
  tag: "Modern Web Apps",
  accent: "#E2CFFF", // pastel lavender
  bg: "linear-gradient(135deg, #0B0F19 0%, #121826 60%, #2D2147 100%)",
  colSpan: "md:col-span-8",
  aspect: "aspect-[16/10]",
    video: WebVideo,
},
 
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  const onEnter = () => {
    setHover(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const onLeave = () => {
    setHover(false);
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 140, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative block ${p.colSpan} col-span-12`}
    >
      <div
        className={`relative ${p.aspect} w-full overflow-hidden rounded-3xl`}
        style={{ background: p.bg }}
      >
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Video on hover */}
        <video
          ref={videoRef}
          src={p.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: hover ? 1 : 0,
            mixBlendMode: "luminosity",
          }}
        />
        {/* Accent color overlay */}
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${p.accent}, transparent 70%)`,
            opacity: hover ? 0.45 : 0.7,
            mixBlendMode: "color",
          }}
        />

        {/* Big project name */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            animate={{ scale: hover ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-semibold tracking-tighter text-center px-6"
            style={{
              color: p.accent,
              textShadow: `0 4px 40px ${p.accent}66`,
            }}
          >
            {p.name}
          </motion.span>
        </div>

        {/* Bottom gradient + tag */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent">
          <span
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: p.accent }}
          >
            {p.tag}
          </span>
          <motion.span
            animate={{ x: hover ? 6 : 0 }}
            className="text-sm font-medium text-white/90 flex items-center gap-2"
          >
            View case <span>→</span>
          </motion.span>
        </div>

        {/* Hover border glow */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500"
          style={{
            boxShadow: hover
              ? `inset 0 0 0 1px ${p.accent}, 0 30px 80px -20px ${p.accent}55`
              : "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* Caption below card */}
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
          {p.name}
        </h3>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          0{i + 1} / 0{projects.length}
        </span>
      </div>
    </motion.a>
  );
}

export function HugeLogos() {
  return (
    <section className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Selected work
            </p>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.95]">
              Crafted with the{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.7 0.25 290), oklch(0.75 0.2 30))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                brands you know
              </span>
              .
            </h2>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-3 text-sm font-medium border-b border-foreground pb-1 self-start md:self-end"
          >
            All case studies <span>→</span>
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-5 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
