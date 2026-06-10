import { motion } from "framer-motion";

type T = {
  quote: string;
  name: string;
  role: string;
  company: string;
  accent: string;
};

const testimonials: T[] = [
  {
    quote:
      "They moved faster than our internal team and shipped a product that felt 10x more refined. We doubled activation in a quarter.",
    name: "Maya Sterling",
    role: "VP of Product",
    company: "Redis",
    accent: "oklch(0.7 0.25 25)",
  },
  {
    quote:
      "It's rare to find a partner that can hold the brand, the product and the engineering quality bar at the same time. ClickMasters does all three.",
    name: "Daniel Okafor",
    role: "Head of Design",
    company: "Snapchat",
    accent: "oklch(0.88 0.2 100)",
  },
  {
    quote:
      "Every detail felt considered. From the typography to the motion to the API design — it all sings the same tune.",
    name: "Priya Raman",
    role: "CTO",
    company: "Crunchbase",
    accent: "oklch(0.78 0.18 240)",
  },
  {
    quote:
      "Working with them feels like adding a senior team overnight. Calm, sharp, opinionated in all the right ways.",
    name: "Eli Vasquez",
    role: "Founder",
    company: "Upstream",
    accent: "oklch(0.78 0.18 155)",
  },
  {
    quote:
      "We've shipped three products together. Each one outperformed our forecasts and looked unreasonably good doing it.",
    name: "Hannah Lindqvist",
    role: "CMO",
    company: "Firefox",
    accent: "oklch(0.78 0.2 35)",
  },
  {
    quote:
      "They don't just deliver — they raise the standard of everything around them. Our internal team is better for it.",
    name: "Marcus Tan",
    role: "Director of Engineering",
    company: "Rizzle",
    accent: "oklch(0.88 0.22 110)",
  },
];

export function HugeTestimonials() {
  return (
    <section className="relative px-6 md:px-12 py-24 md:py-32 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Our partners say
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
              Real words from{" "}
              <span className="font-serif italic font-normal">
                the teams
              </span>{" "}
              we ship with.
            </h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-sm">
            Long-running partnerships across products, brands and platforms —
            here&apos;s what they have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              animate={{ y: [0, -6, 0] }}
              style={{
                animationDelay: `${i * 0.5}s`,
              }}
              className="group relative p-7 md:p-8 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden"
            >
              {/* Floating loop */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                className="absolute inset-0 pointer-events-none"
              />

              {/* Accent glow */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                style={{ background: t.accent }}
              />

              <div
                className="text-5xl leading-none mb-4 font-serif"
                style={{ color: t.accent }}
              >
                &ldquo;
              </div>
              <blockquote className="relative text-base md:text-lg leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>

              <figcaption className="relative mt-8 flex items-center gap-4 pt-6 border-t border-border/40">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-semibold text-base text-background shrink-0"
                  style={{ background: t.accent }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
