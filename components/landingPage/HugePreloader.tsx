import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HugePreloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"hello" | "counting" | "opening" | "done">("hello");

  // Phase 1: Hello
  useEffect(() => {
    const t = setTimeout(() => setPhase("counting"), 3000);
    return () => clearTimeout(t);
  }, []);

  // Phase 2: Counting
  useEffect(() => {
    if (phase !== "counting") return;

    const start = performance.now();
    const duration = 2200;
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const current = Math.floor(progress * 100);
      setCount(current);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => setPhase("opening"), 80);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Phase 3: Opening
  useEffect(() => {
    if (phase !== "opening") return;

    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1300);

    return () => clearTimeout(t);
  }, [phase, onComplete]);

  // Simple solid colors based on ranges (as you requested)
// const getCountColor = (c: number): string => {
//   if (c <= 30) {
//     return "#1e3a8a";        // Deep Navy
//   } else if (c <= 60) {
//     return "#6b21a8";        // Rich Purple
//   } else {
//     return "#0f766e";        // Deep Teal
//   }
// };

  
    // Smooth continuous color transition
  const getCountColor = (c: number): string => {
    // Normalize count to 0-1
    const progress = Math.min(Math.max(c / 100, 0), 1);

    // Define smooth color stops (Navy → Purple → Teal → Bright Teal)
    if (progress <= 0.3) {
      // Navy to Purple (0% - 30%)
      const t = progress / 0.3;
      return interpolateColor("#1e40af", "#6b21a8", t);
    } else if (progress <= 0.6) {
      // Purple to Teal (30% - 60%)
      const t = (progress - 0.3) / 0.3;
      return interpolateColor("#6b21a8", "#0f766e", t);
    } else {
      // Teal to brighter Teal/Cyan (60% - 100%)
      const t = (progress - 0.6) / 0.4;
      return interpolateColor("#0f766e", "#1e40af", t);
    }
  };

  // Helper function to smoothly blend two colors
  const interpolateColor = (color1: string, color2: string, t: number): string => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };



  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Panels */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "opening" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="absolute top-0 left-0 h-full w-1/2 bg-foreground"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "opening" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="absolute top-0 right-0 h-full w-1/2 bg-foreground"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={phase === "opening" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {phase === "hello" && (
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-6xl px-8 text-center"
              >
                <span
                  className="block text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.05em] leading-[0.95]"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.40 0.17 245), oklch(0.50 0.20 200))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ClickMasters AI
                </span>
                <span className="block mt-5 text-lg md:text-2xl tracking-[0.2em] uppercase text-background/70 font-bold">
                  Intelligence in Every Click
                </span>
              </motion.h1>
            )}

            {phase === "counting" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-7xl md:text-9xl font-semibold tabular-nums tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
                style={{
                  color: getCountColor(count),
                }}
              >
                {count}
                <span
                  className="text-4xl md:text-5xl align-top ml-1"
                  style={{ color: getCountColor(count) }}
                >
                  %
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}