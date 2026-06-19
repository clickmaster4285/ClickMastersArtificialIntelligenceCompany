import Link from "next/link";
import { motion } from "framer-motion";

import Image from "next/image";

const columns = [
  {
    title: "Services",
    links: [
      "Product Design",
      "Brand Identity",
      "Web Platforms",
      "Mobile Apps",
      "AI Engineering",
      "Design Systems",
    ],
  },
  {
    title: "Studio",
    links: [
      "About",
      "Process",
      "Careers",
      "Press",
      "Sustainability",
      "Awards",
    ],
  },
  {
    title: "Resources",
    links: [
      "Case Studies",
      "Journal",
      "Reports",
      "Newsletter",
      "FAQ",
      "Contact",
    ],
  },
];

const social = ["Twitter", "LinkedIn", "Dribbble", "GitHub", "Instagram"];

export function HugeFooter() {
  return (
    <footer className="relative px-6 md:px-12 pt-24 md:pt-32 pb-10 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Let&apos;s build it
          </p>

          <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter leading-[0.92] max-w-5xl">
            Have an idea worth{" "}
            <span
              className="font-serif italic font-normal"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.7 0.25 290), oklch(0.75 0.2 30))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              shipping
            </span>
            ? Tell us about it.
          </h2>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:sales@clickmastersdigitalmarketing.com"
              className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              sales@clickmastersdigitalmarketing.com
              <span>→</span>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-3 border border-foreground/40 rounded-full px-7 py-4 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Book a discovery call
            </a>
          </div>
        </motion.div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 pb-16 border-b border-border/40">
          {/* Brand */}
          <div className="col-span-2 max-w-md">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="shrink-0"
              >
             <Image
  src="/images/footer-robo.png"
  alt="ClickMasters mascot"
  width={96}
  height={96}
  className="object-contain w-20 md:w-24"
/>
              </motion.div>

              <div>
                <span className="text-2xl font-bold tracking-tight">
                  ClickMasters
                </span>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  A software house crafting AI products, web platforms and
                  mobile experiences that ship faster and feel unreasonably
                  good.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    Available for Q2 2026 partnerships
                  </span>
                </div>
              </div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
                {col.title}
              </p>

              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    {l === "Contact" ? (
                      <Link
                       href="/contact"
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {l}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {l}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>© 2026 ClickMasters. All rights reserved.</span>

            <a href="#" className="hover:text-foreground">
              Privacy
            </a>

            <a href="#" className="hover:text-foreground">
              Terms
            </a>

            <a href="#" className="hover:text-foreground">
              Cookies
            </a>
          </div>

          <div className="flex items-center gap-5">
            {social.map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-16 select-none pointer-events-none overflow-hidden">
          <p
            className="text-[12vw] leading-none font-semibold tracking-tighter text-center"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--foreground) 18%, transparent), transparent 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ClickMasters
          </p>
        </div>
      </div>
    </footer>
  );
}