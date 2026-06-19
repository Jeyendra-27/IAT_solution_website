"use client";

import { useEffect, useRef } from "react";

// Client logos — place these files in /public/images/Clients/ (exact names).
const CLIENTS = [
  "apex-logo.jpg",
  "Balckswan2.png",
  "donbasco.png",
  "e-royal.png",
  "Kingmakers-IAS-Academy-logo.webp",
  "PBIS.png",
  "sais.png",
  "Sanleva.png",
  "Solara.png.webp",
  "TNQTech.png",
  "Vesa.png",
  "logo (1).png",
  "envisage-logo.jpg",
  "Century tool.webp",
  "GC.png"
];

const LOGO_W = 180;
const LOGO_H = 104;
const SPAN = 1.6; // path length = 1.6 * viewport -> ~5 of 13 visible at once

/**
 * Vertical curved logo conveyor (top -> bottom, bows out to the right,
 * pauses on hover). Direct port of the original rAF positioning loop.
 */
export default function ClientsConveyor() {
  const carouselRef = useRef(null);
  const stageRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const nodes = nodeRefs.current.filter(Boolean);
    if (!carousel || nodes.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = nodes.length;
    let H = carousel.clientHeight;
    let W = carousel.clientWidth;
    const onResize = () => {
      H = carousel.clientHeight;
      W = carousel.clientWidth;
    };
    addEventListener("resize", onResize);

    let t = 0;
    let paused = false;
    let last = performance.now();
    let raf = null;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    carousel.addEventListener("mouseenter", onEnter);
    carousel.addEventListener("mouseleave", onLeave);

    function place(el, p) {
      const y = (-0.3 + p * SPAN) * H;
      const vy = y / H;
      const bow = Math.sin(Math.max(0, Math.min(1, vy)) * Math.PI);
      const centerX = W / 2 - LOGO_W / 2;
      const x = centerX + bow * (W * 0.22);
      const scale = 0.74 + bow * 0.34;
      let op = 1;
      if (vy < 0.16) op = Math.max(0, vy / 0.16);
      else if (vy > 0.84) op = Math.max(0, (1 - vy) / 0.16);
      el.style.transform = `translate(${x}px, ${y - LOGO_H / 2}px) scale(${scale})`;
      el.style.opacity = op;
      el.style.zIndex = String(Math.round(bow * 10));
    }

    function frame(now) {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) t = (t + dt * 0.045) % 1;
      nodes.forEach((el, i) => place(el, (t + i / n) % 1));
      raf = requestAnimationFrame(frame);
    }

    if (reduce) {
      nodes.forEach((el, i) => place(el, i / n));
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      carousel.removeEventListener("mouseenter", onEnter);
      carousel.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="cstage" id="cstage" ref={stageRef}>
        {CLIENTS.map((file, i) => (
          <div
            className="clogo"
            key={file}
            ref={(el) => (nodeRefs.current[i] = el)}
          >
            <img src={`/images/Clients/${file}`} alt="Client logo" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
