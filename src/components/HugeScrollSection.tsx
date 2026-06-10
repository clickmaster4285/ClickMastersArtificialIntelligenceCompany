import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import serviceWeb from "@/assets/service-web.jpg";
import serviceMobile from "@/assets/service-mobile.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceCloud from "@/assets/service-cloud.jpg";
import serviceUiux from "@/assets/service-uiux.jpg";
import serviceSecurity from "@/assets/service-security.jpg";

const services = [
  {
    n: "01",
    title: "Web Engineering",
    tag: "React · Next · TanStack",
    img: serviceWeb,
    desc: "High-performance web platforms built with modern stacks, edge runtimes and obsessive attention to UX.",
  },
  {
    n: "02",
    title: "Mobile Apps",
    tag: "iOS · Android · Flutter",
    img: serviceMobile,
    desc: "Native-feeling mobile products that delight users from the first tap and ship to both stores.",
  },
  {
    n: "03",
    title: "AI & Machine Learning",
    tag: "LLMs · RAG · Agents",
    img: serviceAi,
    desc: "Production-grade AI features — from copilots and agents to custom RAG pipelines and fine-tuning.",
  },
  {
    n: "04",
    title: "Cloud & DevOps",
    tag: "AWS · GCP · Kubernetes",
    img: serviceCloud,
    desc: "Resilient cloud infrastructure, CI/CD pipelines and observability that lets your team move fast.",
  },
  {
    n: "05",
    title: "Product Design",
    tag: "UI · UX · Brand",
    img: serviceUiux,
    desc: "Design systems and interfaces that turn complex software into something teams love to use.",
  },
  {
    n: "06",
    title: "Security & Audit",
    tag: "SOC2 · Pentest · Compliance",
    img: serviceSecurity,
    desc: "Hardening, penetration testing and compliance to make your platform trustworthy at scale.",
  },
];

const stats = [
  { k: "120+", v: "Products shipped" },
  { k: "40+", v: "Engineers & designers" },
  { k: "9", v: "Years in business" },
  { k: "18", v: "Countries served" },
];

const steps = [
  { n: "01", t: "Discover", d: "Workshops, audits and product strategy to align on the bet." },
  { n: "02", t: "Design", d: "Prototypes, design systems and interaction models you can feel." },
  { n: "03", t: "Build", d: "Weekly shipping, code reviews and a tight feedback loop." },
  { n: "04", t: "Scale", d: "Performance, observability and growth engineering as you grow." },
];

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -3 : 3, i % 2 === 0 ? 2 : -2]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ y, rotate }}
      className="group relative rounded-3xl overflow-hidden bg-card border border-border"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={s.img}
          alt={s.title}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <span className="absolute top-5 left-5 text-xs font-mono text-muted-foreground">{s.n}</span>
        <span className="absolute top-5 right-5 text-[10px] uppercase tracking-widest bg-background/60 backdrop-blur-md px-3 py-1 rounded-full border border-border">
          {s.tag}
        </span>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{s.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
          <span className="border-b border-foreground pb-0.5">Learn more</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.article>
  );
}

export function HugeScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <>
    

      {/* Services grid with scroll parallax */}
      {/* <section id="services" ref={ref} className="relative bg-background text-foreground py-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
                What we do
              </p>
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter max-w-3xl leading-[0.95]">
                Services engineered <br /> for ambition.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-muted-foreground max-w-xs"
            >
              Six disciplines, one team. Everything you need from idea to scale, under one roof.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>
        </div>
      </section> */}

 

    
      {/* CTA */}
      <section className="relative bg-background text-foreground py-40 px-6 md:px-12 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.65 0.25 290) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-semibold tracking-tighter leading-[0.95]"
          >
            Got a hard problem? <br />
            <span
              style={{
                background: "linear-gradient(135deg, oklch(0.7 0.25 290), oklch(0.75 0.2 30))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Let's build it.
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex items-center justify-center gap-4 flex-wrap"
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start a project <span>→</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 border border-border rounded-full px-8 py-4 text-sm font-medium hover:bg-card transition-colors"
            >
              hello@clickmasters.studio
            </a>
          </motion.div>
        </div>
        
      </section>


        {/* Marquee */}
      <section className="bg-background text-foreground py-20 overflow-hidden border-y border-border">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex gap-12 whitespace-nowrap text-6xl md:text-8xl font-semibold tracking-tighter"
        >
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 items-center pr-12">
              {["Design", "✱", "Engineer", "✱", "Ship", "✱", "Scale", "✱", "Repeat", "✱"].map((t, i) => (
                <span
                  key={i}
                  className={i % 2 === 0 ? "" : "text-muted-foreground"}
                  style={
                    t === "Ship"
                      ? {
                          background: "linear-gradient(135deg, oklch(0.7 0.25 290), oklch(0.75 0.2 30))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : undefined
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

    </>
  );
}
