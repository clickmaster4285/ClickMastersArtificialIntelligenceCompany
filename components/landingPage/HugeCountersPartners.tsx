import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Stat = { value: number; suffix: string; label: string; sub: string };

const stats: Stat[] = [
  { value: 240, suffix: "+", label: "Products shipped", sub: "across 18 industries" },
  { value: 99.99, suffix: "%", label: "Average uptime", sub: "last 24 months" },
  { value: 47, suffix: "M", label: "Active end users", sub: "powered by our work" },
  { value: 8, suffix: "yr", label: "Avg. partnership", sub: "with our clients" },
];

const partners = [
  { name: "Google", src: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Stripe", src: "https://cdn.simpleicons.org/stripe/635BFF" },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/ffffff" },           // White for black BG
  { name: "Notion", src: "https://cdn.simpleicons.org/notion/ffffff" },           // White
  { name: "Linear", src: "https://cdn.simpleicons.org/linear/5C6AC4" },
  { name: "Figma", src: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Shopify", src: "https://cdn.simpleicons.org/shopify/7AB55C" },

  { name: "GitHub", src: "https://cdn.simpleicons.org/github/ffffff" },            // White
  { name: "Netflix", src: "https://cdn.simpleicons.org/netflix/E50914" },
  { name: "Spotify", src: "https://cdn.simpleicons.org/spotify/1DB954" },
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

export function HugeCountersPartners() {
  const marqueeRow = [...partners, ...partners];

  return (
    <section className="relative px-6 md:px-12 pt-14 md:pt-32 pb-16 md:pb-24 text-foreground ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
      >
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-20">
          Our partners
        </p>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-16 md:gap-24 whitespace-nowrap will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {marqueeRow.map((partner, i) => (
              <motion.img
                key={`${partner.name}-${i}`}
                src={partner.src}
                alt={partner.name}
                className="h-9 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}