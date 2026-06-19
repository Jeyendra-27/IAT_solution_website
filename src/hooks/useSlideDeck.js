"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Pre-paint on the client; no-op fallback during SSR.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const hexA = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
export const rgbOf = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/**
 * Drives the full-screen slide decks (services / solutions / ai-solutions).
 *
 * The active/leaving classes are toggled IMPERATIVELY on the slide DOM nodes
 * (via refs + classList) — exactly like the original inline script. This is
 * deliberate: it keeps React from re-rendering (and re-creating the innerHTML
 * of) the slide sections during navigation, which would restart their inner
 * DOM and kill the CSS entrance transitions. React state here only tracks the
 * current index for the dots + counter, which don't animate.
 *
 * @returns { current, go, paletteRef, slideRefs }
 *   - attach slideRefs.current[i] to each <section>.
 *   - paletteRef.current = { fg:[r,g,b], ac:[r,g,b] } for GridCanvas.
 */
export default function useSlideDeck(palettes, opts = {}) {
  const {
    useLeaving = false,
    leavingMs = 900,
    lockMs = 1000,
    includeArrows = false,
    muteAlpha = 0.66,
    chipAlpha = 0.1,
    gridAlpha = 0.07,
  } = opts;

  const N = palettes.length;
  const slideRefs = useRef([]);
  const [current, setCurrent] = useState(0); // dots + counter only
  const curRef = useRef(0);
  const lockedRef = useRef(false);
  const paletteRef = useRef({ fg: rgbOf(palettes[0].fg), ac: rgbOf(palettes[0].ac) });
  const motionOK = useRef(true);

  const applyPalette = (i) => {
    const p = palettes[i];
    const r = document.documentElement.style;
    r.setProperty("--bg", p.bg);
    r.setProperty("--fg", p.fg);
    r.setProperty("--ac", p.ac);
    r.setProperty("--mut", hexA(p.fg, muteAlpha));
    r.setProperty("--chip", hexA(p.fg, chipAlpha));
    r.setProperty("--gridl", hexA(p.fg, gridAlpha));
    paletteRef.current = { fg: rgbOf(p.fg), ac: rgbOf(p.ac) };
  };

  const go = (i) => {
    if (lockedRef.current || i === curRef.current || i < 0 || i >= N) return;
    lockedRef.current = true;
    const slides = slideRefs.current;

    slides[curRef.current]?.classList.remove("active");
    if (useLeaving) {
      const old = curRef.current;
      slides[old]?.classList.add("leaving");
      setTimeout(() => slides[old]?.classList.remove("leaving"), leavingMs);
    }
    curRef.current = i;
    slides[i]?.classList.add("active");
    applyPalette(i);
    setCurrent(i); // updates dots + counter (no transitions there)
    setTimeout(() => (lockedRef.current = false), motionOK.current ? lockMs : 50);
  };

  // init: palette before paint, then defer slide 0's active class two frames so
  // its entrance transition plays on load (matches the original rAF/rAF trick).
  useIsoLayoutEffect(() => {
    motionOK.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyPalette(0);
    curRef.current = 0;
    const slides = slideRefs.current;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => slides[0]?.classList.add("active"))
    );
    return () => {
      cancelAnimationFrame(id);
      const r = document.documentElement.style;
      ["--bg", "--fg", "--ac", "--mut", "--chip", "--gridl"].forEach((v) =>
        r.removeProperty(v)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // wheel / keyboard / touch navigation
  useEffect(() => {
    const onWheel = (e) => {
      if (lockedRef.current || Math.abs(e.deltaY) < 12) return;
      go(curRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    const onKey = (e) => {
      const next = ["ArrowDown", "PageDown", " "];
      const prev = ["ArrowUp", "PageUp"];
      if (includeArrows) {
        next.push("ArrowRight");
        prev.push("ArrowLeft");
      }
      if (next.includes(e.key)) go(curRef.current + 1);
      if (prev.includes(e.key)) go(curRef.current - 1);
      if (e.key === "Home") go(0);
      if (e.key === "End") go(N - 1);
    };
    let ty0 = null;
    const onTouchStart = (e) => (ty0 = e.touches[0].clientY);
    const onTouchEnd = (e) => {
      if (ty0 === null) return;
      const dy = ty0 - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 48) go(curRef.current + (dy > 0 ? 1 : -1));
      ty0 = null;
    };
    addEventListener("wheel", onWheel, { passive: true });
    addEventListener("keydown", onKey);
    addEventListener("touchstart", onTouchStart, { passive: true });
    addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      removeEventListener("wheel", onWheel);
      removeEventListener("keydown", onKey);
      removeEventListener("touchstart", onTouchStart);
      removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { current, go, paletteRef, slideRefs };
}
