import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Stat = { value: number; suffix: string; label: string; sub: string };

const stats: Stat[] = [
  { value: 240, suffix: "+", label: "Products shipped", sub: "across 18 industries" },
  { value: 99.99, suffix: "%", label: "Average uptime", sub: "last 24 months" },
  { value: 47, suffix: "M", label: "Active end users", sub: "powered by our work" },
  { value: 8, suffix: "yr", label: "Avg. partnership", sub: "with our clients" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    to % 1 === 0 ? Math.floor(v).toLocaleString() : v.toFixed(2)
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function HugeStats() {
  return (
    <section className="relative px-6 md:px-12 py-24 md:py-32 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            By the numbers
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
            Trusted by teams who can&apos;t afford to{" "}
            <span className="font-serif italic font-normal text-foreground/80">
              guess
            </span>
            .
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border/40 pt-6"
            >
              <p
                className="text-5xl md:text-7xl font-semibold tracking-tighter"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.95 0.02 290), oklch(0.7 0.25 290))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-sm md:text-base font-medium text-foreground">
                {s.label}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
