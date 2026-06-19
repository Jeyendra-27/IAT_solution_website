"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive "drafting pen" grid that lights up crosses near the pointer.
 * A single, configurable port of the per-page canvas scripts.
 *
 * Each colour slot accepts either an [r,g,b] array (static pages) or a
 * function returning [r,g,b] (palette-aware slide decks), evaluated per frame.
 *   - spotlight: { color, alpha }
 *   - coldCross: { color, base, range }   // cross when glow <= 0.8
 *   - hotCross:  { color, base, range }   // cross when glow >  0.8
 *   - crosshair: { color, alpha }
 *   - center:    { color, alpha }
 */
export default function GridCanvas({
  gap = 48,
  radius = 190,
  spotlight = { color: [39, 66, 245], alpha: 0.07 },
  link = { color: [255, 107, 53], mult: 0.5 },
  coldCross = { color: [39, 66, 245], base: 0.15, range: 0.75 },
  hotCross = { color: [255, 107, 53], base: 0.35, range: 0.65 },
  crosshair = { color: [39, 66, 245], alpha: 0.4 },
  center = { color: [255, 107, 53], alpha: 0.9 },
}) {
  const canvasRef = useRef(null);

  // keep latest config in a ref so the animation loop always reads fresh values
  const cfgRef = useRef();
  cfgRef.current = { gap, radius, spotlight, link, coldCross, hotCross, crosshair, center };

  useEffect(() => {
    const canvas = canvasRef.current;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvas || !motionOK || window.matchMedia("(hover: none)").matches) return;

    const ctx = canvas.getContext("2d");
    const R = cfgRef.current.radius;
    const GAP = cfgRef.current.gap;
    let pts = [];
    let w = 0;
    let h = 0;
    let raf = null;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const resolve = (c) => (typeof c === "function" ? c() : c);

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let x = GAP; x < w; x += GAP)
        for (let y = GAP; y < h; y += GAP) pts.push({ x, y, glow: 0 });
    }

    function frame() {
      const cfg = cfgRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.14;
      mouse.y += (mouse.ty - mouse.y) * 0.14;
      ctx.clearRect(0, 0, w, h);

      const [sr, sg, sb] = resolve(cfg.spotlight.color);
      const lnk = resolve(cfg.link.color);
      const cold = resolve(cfg.coldCross.color);
      const hot = resolve(cfg.hotCross.color);
      const [chr, chg, chb] = resolve(cfg.crosshair.color);
      const [cer, ceg, ceb] = resolve(cfg.center.color);

      if (mouse.tx > -999) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, R);
        g.addColorStop(0, `rgba(${sr},${sg},${sb},${cfg.spotlight.alpha})`);
        g.addColorStop(1, `rgba(${sr},${sg},${sb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - R, mouse.y - R, R * 2, R * 2);
      }

      let anyGlow = false;
      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const target = d < R ? 1 - d / R : 0;
        p.glow += (target - p.glow) * 0.12;
        if (p.glow < 0.015) continue;
        anyGlow = true;

        const push = p.glow * 10;
        const px = p.x + (d > 0 ? (dx / d) * push : 0);
        const py = p.y + (d > 0 ? (dy / d) * push : 0);
        const s = 2.5 + p.glow * 4.5;

        if (p.glow > 0.55) {
          ctx.strokeStyle = `rgba(${lnk[0]},${lnk[1]},${lnk[2]},${(p.glow - 0.55) * cfg.link.mult})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        const isHot = p.glow > 0.8;
        ctx.strokeStyle = isHot
          ? `rgba(${hot[0]},${hot[1]},${hot[2]},${cfg.hotCross.base + p.glow * cfg.hotCross.range})`
          : `rgba(${cold[0]},${cold[1]},${cold[2]},${cfg.coldCross.base + p.glow * cfg.coldCross.range})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(px - s, py);
        ctx.lineTo(px + s, py);
        ctx.moveTo(px, py - s);
        ctx.lineTo(px, py + s);
        ctx.stroke();
      }

      if (mouse.tx > -999) {
        ctx.strokeStyle = `rgba(${chr},${chg},${chb},${cfg.crosshair.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouse.x - 22, mouse.y);
        ctx.lineTo(mouse.x - 8, mouse.y);
        ctx.moveTo(mouse.x + 8, mouse.y);
        ctx.lineTo(mouse.x + 22, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 22);
        ctx.lineTo(mouse.x, mouse.y - 8);
        ctx.moveTo(mouse.x, mouse.y + 8);
        ctx.lineTo(mouse.x, mouse.y + 22);
        ctx.stroke();
        ctx.fillStyle = `rgba(${cer},${ceg},${ceb},${cfg.center.alpha})`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = anyGlow || mouse.tx > -999 ? requestAnimationFrame(frame) : null;
    }

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      wake();
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
      wake();
    };
    const onResize = () => {
      build();
      wake();
    };

    addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    addEventListener("resize", onResize);
    build();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas id="gridCanvas" ref={canvasRef} />;
}
