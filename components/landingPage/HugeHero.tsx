import Link from "next/link";
import { motion } from "framer-motion";


const words = ["Unlock", "the", "Power", "of", "Intelligent" , "Automation."];

export function HugeHero({ visible }: { visible: boolean }) {
  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Background video — autoplay loop, full hero */}
<video
  src="/video/ai.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="absolute inset-0 w-full h-full object-cover z-0"
/>

      {/* Overlays */}
      <div aria-hidden className="absolute inset-0 z-[1] bg-black/55" />
        <div
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.9) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[2] opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Nav */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={visible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6"
        >
          <span className="text-2xl font-bold tracking-tight">
            ClickMasters
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {["Work", "Services", "Process", "About", "Careers"].map((l) => (
              <a key={l} href="#" className="hover:opacity-60 transition-opacity">
                {l}
              </a>
            ))}
          </div>
       <Link
  href="/contact"
  className="text-sm font-medium border border-white/40 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
>
  Let's talk
</Link>
        </motion.nav>

        {/* Hero content */}
        <motion.div
          className="relative z-10 px-6 md:px-12 pt-6 md:pt-16 pb-24 flex flex-col justify-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70 mb-6"
          >
            <span className="w-8 h-px bg-white/70" />
            Software House · Est. 2018
          </motion.span>

         <h1 className="text-[10vw]  mt-20 lg:text-[6vw] leading-[1.34] font-semibold tracking-tighter max-w-[1100px]">
  {words.map((w, i) => {
    const isGradient = i === 4 || i === 5;

    return (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom mr-[0.18em] pb-[0.12em]"
      >
        <motion.span
          className="inline-block"
          initial={{ y: "110%", rotateX: -40 }}
          animate={visible ? { y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 1,
            delay: 0.25 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            background: isGradient
              ? "linear-gradient(135deg, oklch(0.78 0.22 290), oklch(0.82 0.20 30))"
              : undefined,
            WebkitBackgroundClip: isGradient ? "text" : undefined,
            WebkitTextFillColor: isGradient ? "transparent" : undefined,
            backgroundClip: isGradient ? "text" : undefined,
          }}
        >
          {w}
        </motion.span>
      </span>
    );
  })}
</h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl"
          >
            <p className="max-w-5xl text-base md:text-xl font-semibold text-justify text-white/80">
             A software house crafting AI products, web platforms, and mobile experiences for ambitious startups and growing businesses. We combine strategy, design, and engineering to build digital products that launch faster, scale confidently, and deliver experiences users genuinely enjoy. From intelligent AI solutions to high-performance web and mobile applications, we create technology that drives growth and stands the test of time.
            </p>
            {/* <a href="#services" className="group inline-flex items-center gap-3 text-sm font-medium shrink-0">
              <span className="border-b  border-white pb-1">Explore services</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a> */}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-white/70"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-white/40"
          />
        </motion.div>
    </section>
  );
}
