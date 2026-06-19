"use client";

import { useRef } from "react";

/**
 * Service card with the original pointer-driven 3D tilt.
 * `className` lets the caller add the variant classes (e.g. "svc ai rv d1").
 */
export default function ServiceCard({ className = "svc", children }) {
  const ref = useRef(null);
  const motionOK = useRef(
    typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const onMove = (e) => {
    if (!motionOK.current) return;
    const card = ref.current;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div className={className} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
