"use client";

import { useEffect, useRef } from "react";

// Thin progress bar across the top, width tracks scroll position.
export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const bar = ref.current;
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = pct + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return <div id="progress" ref={ref} />;
}
