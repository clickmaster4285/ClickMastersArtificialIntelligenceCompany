import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Founder, Lumen", quote: "Their AI cut our support tickets by 62% in two weeks. It feels like magic, but it's just really smart engineering.", accent: "oklch(0.82 0.16 200)" },
  { name: "Daniel Park", role: "CTO, Northwind", quote: "We integrated their API on a Friday. By Monday, our product recommendations were eerily accurate. Insane velocity.", accent: "oklch(0.80 0.18 320)" },
  { name: "Maya Iyer", role: "Head of Product, Atelier", quote: "The model understands context better than humans do. It's the first AI we've shipped that actually feels trustworthy.", accent: "oklch(0.84 0.15 150)" },
  { name: "Alex Romero", role: "CMO, Norton", quote: "Generated 1,200 personalized ad variations in one hour. Our ROAS doubled instantly. This is the new baseline.", accent: "oklch(0.82 0.16 60)" },
  { name: "Priya Shah", role: "Founder, Kove", quote: "We thought we'd need a team of data scientists. They gave us a single endpoint that outperformed our in-house models.", accent: "oklch(0.78 0.18 20)" },
  { name: "Marcus Hall", role: "VP Product, Helio", quote: "Latency is under 100ms, even at scale. Their inference stack is a weapon. Our users never know it's AI — that's the point.", accent: "oklch(0.80 0.17 260)" },
  { name: "Yuki Tanaka", role: "Creative Director, Forma", quote: "The prompt controls are so fine-grained we can steer outputs exactly where we want. Finally, AI with an opinion.", accent: "oklch(0.84 0.14 180)" },
  { name: "Elena Voss", role: "CEO, Stratus", quote: "We replaced four separate vendors with their platform. Unified, faster, cheaper. And honestly — smarter.", accent: "oklch(0.82 0.16 90)" },
];

// Layout — cards drift along a deep aisle with a slight S-curve.
const SPACING_Z = 1500;
const SIDE_X = 360;
const CARD_TILT = 18;
const BASE_DEPTH = 1200;

export default function TestimonialsAurora() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Smooth scroll: lerp the raw scroll progress for buttery camera motion.
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      targetRef.current = p;
      if (rafRef.current == null) tick();
    };
    const tick = () => {
      setProgress((prev) => {
        const next = prev + (targetRef.current - prev) * 0.08;
        if (Math.abs(next - targetRef.current) < 0.0005) {
          rafRef.current = null;
          return targetRef.current;
        }
        rafRef.current = requestAnimationFrame(tick);
        return next;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const n = TESTIMONIALS.length;
  const intro = 0.08;
  const outro = 0.04;
  const travel = 1 - intro - outro;
  const t = Math.min(1, Math.max(0, (progress - intro) / travel));
  const cameraIndex = t * (n - 1);
  const cameraZ = cameraIndex * SPACING_Z;

  const sideOf = (i: number) => (i % 2 === 0 ? -1 : 1);
  const i0 = Math.floor(cameraIndex);
  const i1 = Math.min(n - 1, i0 + 1);
  const frac = cameraIndex - i0;
  const cameraX = (sideOf(i0) * (1 - frac) + sideOf(i1) * frac) * 140;

  const roomOpacity = Math.min(1, progress * 8);

  return (
    <section
      ref={sectionRef}
      className="relative text-[oklch(0.97_0.01_260)]"
      style={{ height: `${120 + n * 120}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.18 0.06 280) 0%, oklch(0.10 0.04 270) 50%, oklch(0.06 0.02 260) 100%)",
        }}
      >
        {/* Starfield */}
        <Starfield />

        {/* Aurora wash */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 30%, oklch(0.65 0.25 290 / 0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, oklch(0.7 0.2 180 / 0.3), transparent 60%)",
          }}
        />

        {/* Heading */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">

          <div className="max-w-7xl mx-auto px-6 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
              style={{ opacity: Math.max(0.15, 1 - progress * 3) }}
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

        </div>

        {/* 3D Stage */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1800px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate3d(${-cameraX}px, 0, ${-BASE_DEPTH + cameraZ}px)`,
              willChange: "transform",
              opacity: roomOpacity,
            }}
          >
            {/* Light rails along the aisle */}
            <LightRails n={n} />

            {TESTIMONIALS.map((card, i) => {
              const side = sideOf(i);
              const z = -(i * SPACING_Z);
              const x = side * SIDE_X;
              const dist = i - cameraIndex;
              const absDist = Math.abs(dist);
              if (absDist > 2.2) return null;
              const focus = Math.max(0, 1 - absDist * 0.9);
              // Sharper falloff so distant cards don't bleed through the front one.
              const visibility =
                dist > 0
                  ? Math.max(0, 1 - dist * 0.85) // ahead — fade fast
                  : Math.max(0, 1 - absDist * 1.4); // behind — fade even faster
              const lift = Math.sin(Math.min(1, focus) * Math.PI) * 26;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-[min(500px,82vw)]"
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% - ${lift}px), ${z}px) rotateY(${-side * CARD_TILT}deg)`,
                    transformStyle: "preserve-3d",
                    opacity: visibility,
                    pointerEvents: visibility < 0.05 ? "none" : undefined,
                  }}
                >
                  <Card card={card} index={i} focus={focus} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => {
            const active = Math.round(cameraIndex) === i;
            return (
              <span
                key={i}
                className="block h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: active ? 32 : 10,
                  background: active
                    ? "oklch(0.95 0.05 280)"
                    : "oklch(0.95 0.05 280 / 0.25)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Starfield() {
  // Static-looking stars rendered with radial-gradient layers — cheap & crisp.
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-70"
      style={{
        backgroundImage: `
          radial-gradient(1px 1px at 20% 30%, oklch(0.98 0.01 260) 50%, transparent 51%),
          radial-gradient(1px 1px at 70% 80%, oklch(0.98 0.01 260) 50%, transparent 51%),
          radial-gradient(1.5px 1.5px at 40% 60%, oklch(0.9 0.05 280) 50%, transparent 51%),
          radial-gradient(1px 1px at 85% 20%, oklch(0.98 0.01 260) 50%, transparent 51%),
          radial-gradient(1px 1px at 10% 75%, oklch(0.9 0.05 200) 50%, transparent 51%),
          radial-gradient(1px 1px at 55% 15%, oklch(0.98 0.01 260) 50%, transparent 51%),
          radial-gradient(1.5px 1.5px at 90% 55%, oklch(0.9 0.05 320) 50%, transparent 51%),
          radial-gradient(1px 1px at 30% 90%, oklch(0.98 0.01 260) 50%, transparent 51%)
        `,
        backgroundSize: "600px 600px, 800px 800px, 700px 700px, 500px 500px, 900px 900px, 650px 650px, 750px 750px, 550px 550px",
      }}
    />
  );
}

function LightRails({ n }: { n: number }) {
  const length = (n + 2) * SPACING_Z;
  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floor rail glow */}
      <div
        className="absolute"
        style={{
          width: 4,
          height: length,
          left: -2,
          top: -length / 2,
          transform: `translate3d(0, 280px, ${-length / 2}px) rotateX(90deg)`,
          background:
            "linear-gradient(180deg, transparent, oklch(0.85 0.18 280 / 0.8) 50%, transparent)",
          boxShadow: "0 0 40px oklch(0.85 0.18 280 / 0.8)",
        }}
      />
      {/* Ceiling rail glow */}
      <div
        className="absolute"
        style={{
          width: 4,
          height: length,
          left: -2,
          top: -length / 2,
          transform: `translate3d(0, -280px, ${-length / 2}px) rotateX(-90deg)`,
          background:
            "linear-gradient(180deg, transparent, oklch(0.85 0.18 200 / 0.7) 50%, transparent)",
          boxShadow: "0 0 40px oklch(0.85 0.18 200 / 0.7)",
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
  const scale = 0.94 + focus * 0.1;
  const glow = 0.25 + focus * 0.7;
  return (
    <div
      className="relative rounded-[28px] p-9 md:p-11 will-change-[transform,box-shadow] overflow-hidden"
      style={{
        transform: `scale(${scale})`,
        background:
          "linear-gradient(160deg, oklch(0.22 0.05 280 / 0.7), oklch(0.10 0.03 260 / 0.85))",
        border: "1px solid oklch(0.95 0.05 280 / 0.12)",
        boxShadow: `0 40px 120px -20px oklch(from ${card.accent} l c h / ${glow}), 0 0 0 1px oklch(0.95 0.05 280 / 0.06) inset, 0 1px 0 oklch(0.95 0.05 280 / 0.1) inset`,
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
        }}
      />
      {/* Corner glow */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, oklch(from ${card.accent} l c h / 0.35), transparent 70%)`,
        }}
      />

      <div className="flex items-center justify-between mb-7 relative">
        <span
          className="text-[10px] uppercase tracking-[0.35em] font-medium"
          style={{ color: card.accent }}
        >
          ★ 0{index + 1}
        </span>
        <span className="text-[10px] uppercase tracking-[0.35em] opacity-40">
          {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </span>
      </div>

      <p
        className="text-2xl md:text-[1.7rem] font-light leading-[1.4] relative"
        style={{ color: "oklch(0.97 0.01 260)" }}
      >
        <span
          className="font-serif text-5xl leading-none mr-1 align-top"
          style={{ color: card.accent, opacity: 0.6 }}
        >
          “
        </span>
        {card.quote}
      </p>

      <div className="mt-9 flex items-center gap-4 relative">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-semibold"
          style={{
            background: `linear-gradient(135deg, ${card.accent}, oklch(from ${card.accent} calc(l - 0.15) c h))`,
            color: "oklch(0.12 0.02 260)",
            boxShadow: `0 8px 24px -6px oklch(from ${card.accent} l c h / 0.6)`,
          }}
        >
          {card.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-medium tracking-tight">{card.name}</p>
          <p className="text-xs opacity-55 mt-0.5">{card.role}</p>
        </div>
      </div>
    </div>
  );
}
