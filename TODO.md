# TODO

- [ ] Fix Framer Motion `useScroll` hydration error in `components/landingPage/ScrollVideoSection.tsx` by preventing `useScroll` from running until after mount (client-only).
- [ ] Implement a `mounted` guard (and optionally `useIsomorphicLayoutEffect`-like behavior) so `target` ref is defined before `useScroll` starts tracking.
- [ ] Re-run dev server / refresh page to confirm error is gone.

