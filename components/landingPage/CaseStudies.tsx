import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import dash1 from "@/assets/case-dashboard-1.jpg";
import dash2 from "@/assets/case-dashboard-2.jpg";
import dash3 from "@/assets/case-dashboard-3.jpg";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const cases = [
  {
    img: dash1,
    sector: "Fintech · Series D",
    title: "Reimagining underwriting with a custom risk agent",
    challenge:
      "A leading fintech needed to underwrite 20× more loans without compromising risk discipline.",
    solution:
      "We shipped a multi-agent system grounded in their proprietary risk models with explainable outputs.",
    results: ["+184% throughput", "−61% default rate", "11 weeks to prod"],
  },
  {
    img: dash2,
    sector: "Healthcare · Enterprise",
    title: "AI operations layer for a global hospital network",
    challenge:
      "Coordinating clinical operations across 38 hospitals exposed structural inefficiencies.",
    solution:
      "Deployed an AI orchestration layer for scheduling, staffing and patient flow, fully HIPAA-aligned.",
    results: ["+27% bed utilisation", "−42% admin time", "98% staff adoption"],
  },
  {
    img: dash3,
    sector: "B2B SaaS · Public",
    title: "Conversational growth surface for self-serve revenue",
    challenge:
      "A public B2B SaaS wanted to convert free users without expanding sales headcount.",
    solution:
      "We launched an AI growth agent that personalises onboarding and unlocks expansion at the right moment.",
    results: ["+312% pipeline", "+2.4× ACV", "8 month payback"],
  },
];

export function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !trackRef.current || !sectionRef.current) return;
      if (window.matchMedia("(max-width: 768px)").matches) return;
      const track = trackRef.current;
      const total = track.scrollWidth - window.innerWidth + 80;
      gsap.to(track, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-end justify-between gap-8 lg:flex-row">

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="mb-16 max-w-2xl"
>
  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
    Case Studies
  </p>

  <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
    Quietly transformational{" "}
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
                work
              </motion.span>
            </span>
    .
  </h2>

  <div className="flex items-center justify-end mt-4">
    <p className="text-sm text-muted-foreground flex items-center gap-2">
      Scroll horizontally
      <ArrowRight className="w-4 h-4" />
    </p>
  </div>
</motion.div>
          

         
          
        </div>
      </div>

      <div className="relative  md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 md:flex-row md:gap-10 md:px-10 md:pl-[calc((100vw-80rem)/2+2.5rem)] md:will-change-transform"
        >
          {cases.map((c) => (
            <article
              key={c.title}
              className="glass shrink-0 overflow-hidden rounded-3xl md:w-[78vw] lg:w-[64vw] xl:w-[58vw]"
            >
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative min-h-[280px] overflow-hidden md:min-h-[520px]">
            <Image
  src={c.img}
  alt={c.title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/40" />
                </div>
                <div className="flex flex-col p-10 lg:p-14">
                  <p className="text-eyebrow">{c.sector}</p>
                  <h3 className="text-display mt-6 text-3xl leading-tight text-foreground lg:text-4xl">
                    {c.title}
                  </h3>
                  <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-foreground/80">
                        Challenge
                      </p>
                      <p className="mt-2">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-foreground/80">
                        Solution
                      </p>
                      <p className="mt-2">{c.solution}</p>
                    </div>
                  </div>
                  <div className="mt-auto grid grid-cols-3 gap-4 pt-10">
                    {c.results.map((r) => (
                      <div
                        key={r}
                        className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-4 text-center"
                      >
                        <p className="text-display text-lg text-foreground">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}