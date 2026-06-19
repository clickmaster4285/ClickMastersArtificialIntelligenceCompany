import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Lightweight scroll reveal using IntersectionObserver + GSAP if available.
 * Falls back gracefully to CSS transition.
 */
export function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      gsap.set(el, { opacity: 0, y: 32 });
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                delay,
                ease: "power3.out",
              });
              observer?.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      observer.observe(el);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [delay]);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
