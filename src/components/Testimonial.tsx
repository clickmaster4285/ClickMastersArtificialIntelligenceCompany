import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Founder, Lumen", quote: "Their AI cut our support tickets by 62% in two weeks. It feels like magic, but it's just really smart engineering.", accent: "oklch(0.78 0.14 50)" },
  { name: "Daniel Park", role: "CTO, Northwind", quote: "We integrated their API on a Friday. By Monday, our product recommendations were eerily accurate. Insane velocity.", accent: "oklch(0.75 0.16 200)" },
  { name: "Maya Iyer", role: "Head of Product, Atelier", quote: "The model understands context better than humans do. It's the first AI we've shipped that actually feels trustworthy.", accent: "oklch(0.78 0.15 320)" },
  { name: "Alex Romero", role: "CMO, Norton", quote: "Generated 1,200 personalized ad variations in one hour. Our ROAS doubled instantly. This is the new baseline.", accent: "oklch(0.80 0.14 110)" },
  { name: "Priya Shah", role: "Founder, Kove", quote: "We thought we'd need a team of data scientists. They gave us a single endpoint that outperformed our in-house models.", accent: "oklch(0.76 0.15 25)" },
  { name: "Marcus Hall", role: "VP Product, Helio", quote: "Latency is under 100ms, even at scale. Their inference stack is a weapon. Our users never know it's AI — that's the point.", accent: "oklch(0.75 0.16 260)" },
  { name: "Yuki Tanaka", role: "Creative Director, Forma", quote: "The prompt controls are so fine-grained we can steer outputs exactly where we want. Finally, AI with an opinion.", accent: "oklch(0.78 0.14 160)" },
  { name: "Elena Voss", role: "CEO, Stratus", quote: "We replaced four separate vendors with their platform. Unified, faster, cheaper. And honestly — smarter.", accent: "oklch(0.78 0.15 80)" },
];

// Corridor layout constants
const SPACING_Z = 1350; // distance between cards along the corridor
const WALL_X = 430; // how far left/right cards sit on the walls
const CARD_ROT_Y = 26; // degrees — cards face inward toward viewer
const BASE_DEPTH = 1100; // push the whole room deeper so multiple cards stay in frame

export default function Testimonials3DRoom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const n = TESTIMONIALS.length;
  // cameraIndex: 0 = at first card, n-1 = at last card.
  // Intro third = entering room, outro tiny tail.
  const intro = 0.08;
  const outro = 0.04;
  const travel = 1 - intro - outro;
  const t = Math.min(1, Math.max(0, (progress - intro) / travel));
  const cameraIndex = t * (n - 1);
  const cameraZ = cameraIndex * SPACING_Z;

  // Camera lateral shift — pull toward the side of the active card
  // (positive x = camera moves right, content shifts left visually)
  const sideOf = (i: number) => (i % 2 === 0 ? -1 : 1); // -1 left wall, +1 right wall
  // Smooth interpolation between adjacent cards' sides
  const i0 = Math.floor(cameraIndex);
  const i1 = Math.min(n - 1, i0 + 1);
  const frac = cameraIndex - i0;
  const cameraX = (sideOf(i0) * (1 - frac) + sideOf(i1) * frac) * 180;

  // Heading visible only at the very start
  const headingOpacity = Math.max(0, 1 - progress * 6);
  const roomOpacity = Math.min(1, progress * 8);

  return (
    <section
      ref={sectionRef}
      className="relative  text-[oklch(0.97_0.005_80)]"
      style={{ height: `${120 + n * 120}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* Ambient backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
         
        />

    
              

<div className="max-w-7xl mx-auto mt-22">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
             What our partners say
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
             Real words from{" "}
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
                the teams we ship with
                              </motion.span>
                              
            </span>
            .
          </h2>
                  </motion.div>
                  </div>








        {/* 3D Stage */}
        <div
          className="absolute inset-0"
          style={{
            perspective: "1600px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* World moves opposite to camera */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate3d(${-cameraX}px, 0, ${-BASE_DEPTH + cameraZ}px)`,
              willChange: "transform",
            }}
          >
            <Corridor n={n} opacity={roomOpacity} />

            {TESTIMONIALS.map((card, i) => {
              const side = sideOf(i); // -1 left, +1 right
              const z = -(i * SPACING_Z);
              const x = side * WALL_X;
              const dist = i - cameraIndex; // negative = behind, positive = ahead
              // Focus peaks when camera is right at the card
              const focus = Math.max(0, 1 - Math.abs(dist) * 0.9);
              const visibility = Math.max(0.16, 1 - Math.abs(dist) * 0.22);
              const lift = Math.sin(Math.min(1, focus) * Math.PI) * 22;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-[min(520px,80vw)]"
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% - ${lift}px), ${z}px) rotateY(${-side * CARD_ROT_Y}deg)`,
                    transformStyle: "preserve-3d",
                    opacity: visibility,
                  }}
                >
                  <Card card={card} index={i} focus={focus} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => {
            const active = Math.round(cameraIndex) === i;
            return (
              <span
                key={i}
                className="block h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: active ? 28 : 10,
                  background: active
                    ? "oklch(0.97 0.005 80)"
                    : "oklch(0.97 0.005 80 / 0.25)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Corridor — builds a long box: floor, ceiling, and two side walls
 * stretching across the full card range, so it actually feels like a room.
 */
function Corridor({ n, opacity }: { n: number; opacity: number }) {
  const length = (n + 2) * SPACING_Z;
  const halfW = WALL_X + 280;
  const wallH = 760;

  // Use a single CSS gradient with repeating verticals as "panel lines" for depth cues
  const panelBg =
    "linear-gradient(180deg, ooklch(0.208 0.042 265.755) 0%, oklch(0.208 0.042 265.755) 100%), repeating-linear-gradient(90deg, oklch(0.208 0.042 265.755)) 0 1px, transparent 1px 220px)";

  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{ transformStyle: "preserve-3d", opacity }}
    >
      {/* Floor */}
      <div
        className="absolute"
        style={{
          width: halfW * 2,
          height: length,
          left: -halfW,
          top: -length / 2,
          transform: `translate3d(0, ${wallH / 2}px, ${-length / 2}px) rotateX(90deg)`,
          background:
            "linear-gradient(180deg, oklch(0.129 0.042 264.695), oklch(0.129 0.042 264.695)), repeating-linear-gradient(90deg, oklch(0.35 0.04 260 / 0.2) 0 1px, transparent 1px 180px), repeating-linear-gradient(0deg, oklch(0.35 0.04 260 / 0.2) 0 1px, transparent 1px 180px)",
          backgroundBlendMode: "overlay",
          boxShadow: "inset 0 0 200px oklch(0.0 0 0 / 0.8)",
        }}
      />
      {/* Ceiling */}
      <div
        className="absolute"
        style={{
          width: halfW * 2,
          height: length,
          left: -halfW,
          top: -length / 2,
          transform: `translate3d(0, ${-wallH / 2}px, ${-length / 2}px) rotateX(-90deg)`,
          background:
            "linear-gradient(180deg, oklch(0.129 0.042 264.695), oklch(0.129 0.042 264.695))",
        }}
      />
      {/* Left wall */}
      <div
        className="absolute"
        style={{
          width: length,
          height: wallH,
          left: -length / 2,
          top: -wallH / 2,
          transform: `translate3d(${-halfW}px, 0, ${-length / 2}px) rotateY(90deg)`,
          background: panelBg,
          boxShadow:
            "inset 0 0 240px oklch(0.129 0.042 264.695), inset 60px 0 120px oklch(0.129 0.042 264.695)",
        }}
      />
      {/* Right wall */}
      <div
        className="absolute"
        style={{
          width: length,
          height: wallH,
          left: -length / 2,
          top: -wallH / 2,
          transform: `translate3d(${halfW}px, 0, ${-length / 2}px) rotateY(-90deg)`,
          background: panelBg,
          boxShadow:
            "inset 0 0 240px oklch(0.129 0.042 264.695), inset -60px 0 120px oklch(0.129 0.042 264.695)",
        }}
      />
    </div>
  );
}

function Card({
  card,
  index,
  focus,
}: {
  card: (typeof TESTIMONIALS)[number];
  index: number;
  focus: number;
}) {
  // Subtle scale + glow when focused. NO blur — keep cards crisp.
  const scale = 0.96 + focus * 0.08;
  const glow = 0.2 + focus * 0.6;
  return (
    <div
      className="rounded-3xl border p-8 md:p-10 will-change-[transform,box-shadow]"
      style={{
        transform: `scale(${scale})`,
        background:
          "linear-gradient(180deg, oklch(0.18 0.03 260 / 0.95), oklch(0.10 0.02 260 / 0.95))",
        borderColor: `oklch(from ${card.accent} l c h / 0.45)`,
        boxShadow: `0 30px 80px -10px oklch(from ${card.accent} l c h / ${glow}), 0 0 0 1px oklch(0.97 0.005 80 / 0.05) inset`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <span
          className="text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full border"
          style={{
            borderColor: `oklch(from ${card.accent} l c h / 0.5)`,
            color: card.accent,
          }}
        >
          0{index + 1} / 0{TESTIMONIALS.length}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">
          Testimonial
        </span>
      </div>
      <p className="text-2xl md:text-[1.75rem] font-serif italic leading-[1.3] text-[oklch(0.97_0.005_80)]">
        "{card.quote}"
      </p>
      <div className="mt-8 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold"
          style={{
            background: card.accent,
            color: "oklch(0.12 0.02 260)",
          }}
        >
          {card.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-medium">{card.name}</p>
          <p className="text-xs opacity-60">{card.role}</p>
        </div>
      </div>
    </div>
  );
}