"use client";

import { useEffect } from "react";

/**
 * Replaces the original IntersectionObserver that added the `in` class to
 * `.rv` (and `.who-art`) elements as they scroll into view.
 * Pass the selector(s) to observe within the document.
 */
export default function useScrollReveal(selector = ".rv", threshold = 0.15) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, threshold]);
}
