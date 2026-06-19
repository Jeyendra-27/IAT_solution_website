"use client";

import { useEffect, useMemo, useRef } from "react";
import GridCanvas from "@/components/GridCanvas";
import useSlideDeck from "@/hooks/useSlideDeck";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/";

/**
 * Generic full-screen slide deck used by /services, /solutions and
 * /ai-solutions. The slide bodies are the original markup (rendered as-is);
 * navigation, palette switching, dots, counter and the data-tech chip builder
 * are handled in React.
 */
export default function SlideDeck({
  slides,
  deckOptions = {},
  grid,
  drift = [],
  aura = false,
  techMap = null,
  dotAria = "Go to slide",
  hintLabel = "Scroll to explore",
}) {
  const palettes = slides.map((s) => ({ bg: s.bg, fg: s.fg, ac: s.ac }));
  const N = slides.length;
  const { current, go, paletteRef, slideRefs } = useSlideDeck(palettes, deckOptions);
  const stageRef = useRef(null);

  // resolve a palette slot ('fg' | 'ac') to a per-frame colour function
  const col = (src) => () => paletteRef.current[src];
  const gridColors = {
    gap: grid.gap,
    radius: grid.radius,
    spotlight: { color: col(grid.spotlight.src), alpha: grid.spotlight.alpha },
    link: { color: col(grid.link.src), mult: grid.link.mult },
    coldCross: { color: col(grid.coldCross.src), base: grid.coldCross.base, range: grid.coldCross.range },
    hotCross: { color: col(grid.hotCross.src), base: grid.hotCross.base, range: grid.hotCross.range },
    crosshair: { color: col(grid.crosshair.src), alpha: grid.crosshair.alpha },
    center: { color: col(grid.center.src), alpha: grid.center.alpha },
  };

  // Port of the original tech-chip builder: fill every .chips[data-tech].
  useEffect(() => {
    if (!techMap || !stageRef.current) return;
    stageRef.current.querySelectorAll(".chips[data-tech]").forEach((box) => {
      if (box.dataset.built) return; // idempotent
      box.dataset.built = "1";
      box.dataset.tech.split(",").forEach((name) => {
        const c = document.createElement("span");
        c.className = "tchip";
        if (techMap[name]) {
          const img = document.createElement("img");
          img.src = DEVICON + techMap[name];
          img.alt = "";
          img.loading = "lazy";
          img.onerror = () => img.remove();
          c.appendChild(img);
        }
        c.append(name);
        box.appendChild(c);
      });
    });
  }, [techMap]);

  const active = current < 0 ? 0 : current;
  const pad = (x) => String(x).padStart(2, "0");

  // Build the slide sections ONCE. Because `slides` is stable, this memo returns
  // the same element references on every render, so React bails out of
  // reconciling the sections when the dots/counter update — leaving the
  // imperative classList toggles (in useSlideDeck) as their sole controller.
  // That's what makes the entrance transition fire on every slide change.
  const sections = useMemo(
    () =>
      slides.map((s, i) => (
        <section
          key={i}
          ref={(el) => (slideRefs.current[i] = el)}
          className={["slide", s.extra].filter(Boolean).join(" ")}
          dangerouslySetInnerHTML={{ __html: s.html }}
        />
      )),
    [slides, slideRefs]
  );

  return (
    <>
      <div id="gridbg" />
      {aura && <div id="aura" />}
      <GridCanvas {...gridColors} />

      {drift.map((d, i) => (
        <span
          key={i}
          className="drift"
          style={{
            left: d.left,
            animationDuration: d.dur,
            ...(d.delay ? { animationDelay: d.delay } : {}),
          }}
        >
          {d.ch}
        </span>
      ))}

      <div id="stage" ref={stageRef}>
        {sections}
      </div>

      <div id="hud">
        <div id="counter">
          <b>{pad(active + 1)}</b> / {pad(N)}
        </div>
        <div id="dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === active ? "dot on" : "dot"}
              aria-label={`${dotAria} ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div id="hint">
          <div className="wheel" />
          <span>{hintLabel}</span>
        </div>
      </div>
    </>
  );
}
