import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import card1 from "@/assets/award-card-1.jpg";
import card2 from "@/assets/award-card-2.jpg";
import card3 from "@/assets/award-card-3.jpg";
import card4 from "@/assets/award-card-4.jpg";
import card5 from "@/assets/award-card-5.jpg";
import card6 from "@/assets/award-card-6.jpg";
import { motion } from "framer-motion";



gsap.registerPlugin(ScrollTrigger);

type CardCfg = {
  src: string;
  x: number; // % within stage
  y: number;
  rot: number;
  scale: number;
  fromX: number; // entry offset px
  fromY: number;
  fromRot: number;
};

// 6 cards positioned across the section, overlapping naturally
const CARDS: CardCfg[] = [
  { src: card2, x: 18, y: 32, rot: -10, scale: 0.95, fromX: -300, fromY: -200, fromRot: -45 },
  { src: card1, x: 72, y: 28, rot: 8,   scale: 1.05, fromX:  300, fromY: -250, fromRot:  40 },
  { src: card3, x: 42, y: 50, rot: -5,  scale: 1.15, fromX:    0, fromY:  300, fromRot: -25 },
  { src: card4, x: 14, y: 62, rot: 10,  scale: 0.9,  fromX: -350, fromY:  250, fromRot:  35 },
  { src: card5, x: 80, y: 60, rot: -8,  scale: 0.95, fromX:  350, fromY:  200, fromRot: -30 },
  { src: card6, x: 50, y: 68, rot: 6,   scale: 1.0,  fromX:    0, fromY:  350, fromRot:  20 },
];

const WORD = "awards"; // 6 letters → one per card

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      // Initial state: cards offscreen / hidden, letters dim
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const c = CARDS[i];
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x: c.fromX,
          y: c.fromY,
          rotate: c.fromRot,
          scale: 0.4,
          opacity: 0,
        });
      });
      letterRefs.current.forEach((el) => {
        if (el) gsap.set(el, { color: "#0a0c22" });
      });

      // Master timeline pinned, one segment per card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${CARDS.length * 100}%`,
          scrub: 1,
          pin: pin,
          anticipatePin: 1,
        },
      });

      CARDS.forEach((c, i) => {
        const card = cardRefs.current[i];
        const letter = letterRefs.current[i];
        if (!card) return;

        tl.to(
          card,
          {
            x: 0,
            y: 0,
            rotate: c.rot,
            scale: c.scale,
            opacity: 1,
            ease: "power3.out",
            duration: 1,
          },
          i,
        );
        if (letter) {
          tl.to(
            letter,
            { color: "#ffffff", duration: 0.6, ease: "power2.out" },
            i + 0.3,
          );
        }
      });

      // Continuous floating loop on top (additive via separate transforms)
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const float = el.querySelector<HTMLDivElement>(".card-float");
        if (!float) return;
        gsap.to(float, {
          y: 12 + (i % 3) * 6,
          rotate: i % 2 ? 2 : -2,
          duration: 3 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, section);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const tick = () => {
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = 0.3 + (i % 3) * 0.25;
        el.style.setProperty("--px", `${mouse.x * 30 * d}px`);
        el.style.setProperty("--py", `${mouse.y * 20 * d}px`);
      });
      raf = requestAnimationFrame(tick);
    };
    section.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full  text-white"
      aria-label="Awards"
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        {/* Glow gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(99,102,241,0.15), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(236,72,153,0.10), transparent 70%)",
          }}
        />

        {/* Massive background typography — letters fill one by one */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center select-none "
        >
          <div
            className="font-black tracking-tighter leading-none flex"
            style={{
              fontSize: "clamp(140px, 26vw, 480px)",
              letterSpacing: "-0.06em",
            }}
          >
            {WORD.split("").map((ch, i) => (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className="inline-block"
                style={{ color: "#0a0c22", transition: "none" }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Header copy */}
        <div className="max-w-7xl mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
           Recognition
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
           Award-winning work, recognized{" "}
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
                worldwide
              </motion.span>
            </span>
            .
          </h2>
          </motion.div>
          </div>



        

        {/* Cards stage */}
        <div className="absolute inset-0">
          {CARDS.map((c, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute will-change-transform"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                width: "clamp(110px, 12vw, 200px)",
                aspectRatio: "3 / 4",
                zIndex: 10 + i,
                translate: "var(--px,0) var(--py,0)",
              }}
            >
              <div
                className="card-float h-full w-full will-change-transform"
                style={{
                  filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.45))",
                }}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-[14px] ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.04]"
                  style={{
                    boxShadow:
                      "0 20px 60px -10px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.10)",
                  }}
                >
                  <img
                    src={c.src}
                    alt="Award"
                    loading="lazy"
                    width={512}
                    height={704}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {CARDS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-6 rounded-full bg-white/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
}