import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { k: 120, v: "Products shipped" },
  { k: 40, v: "Engineers & designers" },
  { k: 9, v: "Years in business" },
  { k: 18, v: "Countries served" },
];

export function StatCardSection({ bgY }: { bgY?: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    amount: 0.5,
  });

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    let frameId: number;

    if (!isInView) {
      setCounts(stats.map(() => 0));
      return;
    }

    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / 1800, 1);

      setCounts(
        stats.map((s) => Math.floor(progress * s.k))
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-foreground py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Background blob */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.25 290), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Header */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Stats
          </p>

          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.95]">
            A small studio.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.22 290), oklch(0.82 0.20 30))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              A serious craft.
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-lg text-muted-foreground max-w-md"
        >
          We're a multidisciplinary team of engineers, designers, and product
          strategists who care deeply about craft. We collaborate with ambitious
          founders and forward-thinking teams to design, build, and scale
          digital products that are fast, intuitive, visually refined, and
          engineered for long-term growth.
        </motion.p>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.v}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="border-t border-border pt-6"
          >
            <p className="text-4xl md:text-6xl font-semibold tracking-tighter">
              {counts[i]}+
            </p>

            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
              {s.v}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}