"use client";

import { useEffect, useRef } from "react";

// [class, text] — class maps to the colour styles in home.css (.term-body .w/.g/.o)
const LINES = [
  ["w", "$ linework deploy --client acme-logistics"],
  ["g", "✓ invoice-automation        live"],
  ["g", "✓ support-agent (24/7)      live"],
  ["g", "✓ demand-forecast model     live"],
  ["o", "→ 312 hours/month returned to the team"],
];

/**
 * Types the deploy log line-by-line once the terminal scrolls into view —
 * a faithful port of the original setTimeout typing loop.
 */
export default function Terminal() {
  const termRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const term = termRef.current;
    const body = bodyRef.current;
    if (!term || !body) return;

    let li = 0;
    let timers = [];
    const t = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
    };

    const typeLine = () => {
      if (li >= LINES.length) {
        body.innerHTML += '<span class="cursor"></span>';
        return;
      }
      const [cls, text] = LINES[li++];
      const span = document.createElement("span");
      span.className = cls;
      body.appendChild(span);
      body.appendChild(document.createElement("br"));
      let ci = 0;
      const typeChar = () => {
        span.textContent = text.slice(0, ++ci);
        if (ci < text.length) t(typeChar, 16);
        else t(typeLine, 260);
      };
      typeChar();
    };

    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        t(typeLine, 300);
      },
      { threshold: 0.4 }
    );
    io.observe(term);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="term" ref={termRef}>
      <div className="term-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="term-body" id="termBody" ref={bodyRef} />
    </div>
  );
}
