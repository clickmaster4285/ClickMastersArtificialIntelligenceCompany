import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import teamsAsset from "@/assets/teams.mp4";

export function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Responsive timeline adjustments
  const expandStart = isMobile ? 0.25 : 0.35;
  const expandEnd = isMobile ? 0.45 : 0.55;
  const textFadeOutStart = isMobile ? 0.25 : 0.35;
  const textFadeOutEnd = isMobile ? 0.4 : 0.48;
  const textMoveStart = isMobile ? 0.25 : 0.35;
  const textMoveEnd = isMobile ? 0.45 : 0.5;

  // Responsive values
  const initialWidth = isMobile ? "80vw" : "44vw";
  const finalWidth = "100vw";
  const initialHeight = isMobile ? "70vh" : "58vh";
  const finalHeight = "100vh";
  const initialLeft = isMobile ? "10vw" : "6vw";
  const finalLeft = "0vw";
  const initialTop = isMobile ? "15vh" : "21vh";
  const finalTop = "0vh";
  const initialBorderRadius = isMobile ? "16px" : "24px";
  const finalBorderRadius = "0px";

  const width = useTransform(progress, [expandStart, expandEnd], [initialWidth, finalWidth]);
  const height = useTransform(progress, [expandStart, expandEnd], [initialHeight, finalHeight]);
  const left = useTransform(progress, [expandStart, expandEnd], [initialLeft, finalLeft]);
  const top = useTransform(progress, [expandStart, expandEnd], [initialTop, finalTop]);
  const borderRadius = useTransform(progress, [expandStart, expandEnd], [initialBorderRadius, finalBorderRadius]);
  const textOpacity = useTransform(progress, [textFadeOutStart, textFadeOutEnd], [1, 0]);
  const textX = useTransform(progress, [textMoveStart, textMoveEnd], ["0px", isMobile ? "80px" : "120px"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: isMobile ? "280vh" : "360vh" }}
    >
      {/* Text Section - Mobile optimised */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 md:mb-6">
            Our Teams
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.15] md:leading-[1.02]">
            Built To Impress. Designed To{" "}
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
                Perform
              </motion.span>
            </span>
            .
          </h2>
        </motion.div>
      </div>

      {/* Sticky stage */}
      <div className="sticky top-0 h-screen -mt-20 w-full overflow-hidden">
        {/* Right: text - hidden on mobile, shown on desktop */}
        <motion.div
          style={{ opacity: textOpacity, x: textX }}
          className="pointer-events-none absolute right-[5vw] md:right-[10vw] top-1/2 z-10 hidden md:block max-w-xl -translate-y-1/2"
        >
          <p className="text-lg md:text-2xl leading-relaxed text-foreground text-justify">
          We combine design, motion, 3D, and development to create digital experiences that feel visually striking and technically seamless. Every detail is shaped with intent, from subtle animations to full interactive flows that guide how users feel and respond.

From campaign launches to immersive brand worlds, we build digital products that go beyond static interfaces. Our work focuses on clarity, movement, and interaction turning ideas into experiences that feel alive, engaging, and easy to explore.

We care about performance, making sure everything feels smooth and fast.
We build with scalability in mind so products grow without losing quality.
          </p>

          <button className="mt-6 md:mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 md:px-6 shadow-sm text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 active:scale-95">
            <span className="text-xs md:text-sm font-semibold tracking-widest">
              Contact Us
            </span>
          </button>
        </motion.div>

        {/* Mobile Text Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-8 left-0 right-0 z-20 px-4 md:hidden"
        >
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <p className="text-sm leading-relaxed text-white/90 text-justify mb-4">
              We combine design, motion, 3D, and development to create digital experiences that feel visually striking and technically seamless. From campaign launches to immersive brand worlds, we build digital products that go beyond static interfaces.
            </p>
            <button className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-white/10 backdrop-blur-md px-5 py-3 shadow-sm text-white transition-all duration-300 active:scale-95 border border-white/20">
              <span className="text-xs font-semibold tracking-widest">
                Contact Us
              </span>
            </button>
          </div>
        </motion.div>

        {/* Video container */}
        <motion.div
          style={{
            width,
            height,
            top,
            left,
            borderRadius,
            background: "linear-gradient(120deg, #4f46e5, #ec1c4b)",
          }}
          className="absolute overflow-hidden shadow-2xl"
        >
          <video
            src={teamsAsset}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover mix-blend-luminosity opacity-90"
          />
          
          {/* Video overlay controls - responsive */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 md:px-8 lg:px-24">
            <span className="text-xl md:text-4xl lg:text-7xl font-bold tracking-widest text-white">
              PLAY
            </span>
            <div className="flex h-10 w-10 md:h-16 md:w-16 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-white/90">
              <svg 
                width={isMobile ? "16" : "28"} 
                height={isMobile ? "16" : "28"} 
                viewBox="0 0 24 24" 
                fill="black"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-xl md:text-4xl lg:text-7xl font-bold tracking-widest text-white">
              REEL
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}