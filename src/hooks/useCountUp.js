"use client";

import { useEffect } from "react";

/**
 * Animates every `[data-count]` element from 0 to its target when it scrolls
 * into view (cubic ease-out over 1.4s) — a direct port of the original
 * counter IntersectionObserver. Scope it to a container ref so multiple
 * pages don't fight over the same nodes.
 */
export default function useCountUp(containerRef, threshold = 0.6) {
  useEffect(() => {
    const root = containerRef?.current ?? document;
    const els = Array.from(root.querySelectorAll("[data-count]"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const end = +el.dataset.count;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / 1400, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        }),
      { threshold }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef, threshold]);
}
