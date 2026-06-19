import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";


export function HugeAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImg = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  // hover tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const rotateY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);

  const onMove = (e: React.MouseEvent) => {
    const el = imgWrapRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-12 py-24 md:py-36 border-t border-border/30"
    >
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        style={{ perspective: "1400px" }}
      >
        {/* LEFT CONTENT */}
        <motion.div style={{ y: yText }} className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-muted-foreground" />
            About us
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-6xl font-semibold tracking-tight max-w-3xl leading-tight"
          >
            We build products people remember.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed text-justify"
          >
          We&apos;re a software house of engineers, designers and product thinkers.
For over eight years, we&apos;ve partnered with ambitious startups and global brands to design, build and scale digital products that don&apos;t just work they feel effortless, intuitive, and alive.

From early-stage MVPs to large-scale platforms serving millions of users, we focus on crafting systems that balance clarity, performance, and long-term scalability. Every product we touch is shaped with a deep respect for detail, user experience, and engineering precision.

We don&apos;t just ship features we build experiences that people return to, trust, and remember. Our work lives at the intersection of design thinking, modern engineering, and product strategy, where simplicity is engineered and complexity is hidden beneath the surface.
          </motion.p>

 

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 grid grid-cols-2 gap-6 max-w-md"
          >
            {[
              { k: "Founded", v: "2018" },
              { k: "Team", v: "42 people" },
              { k: "HQ", v: "Berlin · Remote" },
              { k: "Focus", v: "Product · AI" },
            ].map((row) => (
              <div key={row.k} className="border-t border-border/40 pt-3">
                <p className="text-sm uppercase tracking-widest font-medium text-muted-foreground">
                  {row.k}
                </p>
                <p className="text-lg font-medium mt-1">{row.v}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT VIDEO */}
      <motion.div style={{ y: yImg }} className="lg:col-span-6">
  <motion.div
    ref={imgWrapRef}
    onMouseMove={onMove}
    onMouseLeave={onLeave}
    style={{
      rotateX,
      rotateY,
      scale: scaleImg,
      rotate: rotateImg,
      transformStyle: "preserve-3d",
    }}
    className="relative w-full aspect-[4/5] max-w-[560px] mx-auto"
  >
    {/* glow */}
    <div
      className="absolute -inset-10 blur-3xl opacity-30 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, oklch(0.6 0.2 290 / 0.35), transparent 70%)",
      }}
    />

    {/* VIDEO */}
    <motion.video
        src="/video/heroVideo.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="relative w-full h-full object-cover rounded-2xl"
      style={{
        transform: "translateZ(40px)",
      }}
    />

    {/* BLACK OVERLAY */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none z-10"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
      }}
    />

    {/* FLOATING CARD 1 */}
    {/* <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-4 -left-4 z-20 bg-background/80 backdrop-blur-md border border-border/60 rounded-2xl px-4 py-3 shadow-2xl"
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        Building
      </p>
      <p className="text-sm font-semibold">3 active product launches</p>
    </motion.div> */}

    {/* FLOATING CARD 2 */}
    {/* <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay: 1,
        ease: "easeInOut",
      }}
      className="absolute -bottom-4 -right-2 z-20 bg-background/80 backdrop-blur-md border border-border/60 rounded-2xl px-4 py-3 shadow-2xl"
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        Client success
      </p>
      <p className="text-sm font-semibold">98% repeat collaborations</p>
            </motion.div> */}
            

  </motion.div>
</motion.div>
      </div>
    </section>
  );
}