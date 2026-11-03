/**
 * GSAP is loaded on demand, after hydration, so it never competes with the
 * hero image for bandwidth (vercel-react-best-practices: bundle-dynamic-imports).
 */
let loading: Promise<Gsap> | null = null;

type Gsap = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
};

/** Resolve once the browser is idle after load, so animation never delays first render. */
const whenIdle = () =>
  new Promise<void>((resolve) => {
    const go = () => {
      // Safari has no requestIdleCallback.
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(() => resolve(), { timeout: 1200 });
      else setTimeout(resolve, 200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
  });

export function loadGsap(): Promise<Gsap> {
  loading ??= whenIdle().then(() => Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
  ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    return { gsap, ScrollTrigger, SplitText };
  }));
  return loading;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
