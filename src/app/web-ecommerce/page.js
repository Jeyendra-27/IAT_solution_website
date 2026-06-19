"use client";

import Link from "next/link";
import useRouteClass from "@/hooks/useRouteClass";
import GridCanvas from "@/components/GridCanvas";
import "./web-ecommerce.css";

const INK = [13, 27, 51];
const BLUE = [39, 66, 245];

// List your screenshots here — one entry per image.
// Put the files in /public/images/ and reference them with a leading slash.
const CARDS = [
  "/images/clinic.png",
  "/images/century tool.png",
  "/images/GCW.png",
  "/images/kingmakers.png",
  "/images/neotouch.png",
  "/images/serenity wellness.png"
];

function Card({ img }) {
  return (
    <div className="site">
      <div className="site-bar">
        <i />
        <i />
        <i />
        <span className="url" />
      </div>
      <div className="site-body">
        <img className="site-img" src={img} alt="Website screenshot" />
      </div>
    </div>
  );
}

export default function WebEcommercePage() {
  useRouteClass("web-ecommerce");

  // duplicated set for a seamless loop (matches the original)
  const loop = [...CARDS, ...CARDS];

  return (
    <div className="route-web-ecommerce">
      <div id="gridbg" />
      <GridCanvas
        gap={48}
        radius={190}
        spotlight={{ color: BLUE, alpha: 0.06 }}
        link={{ color: BLUE, mult: 0.55 }}
        coldCross={{ color: INK, base: 0.12, range: 0.55 }}
        hotCross={{ color: BLUE, base: 0.35, range: 0.65 }}
        crosshair={{ color: INK, alpha: 0.4 }}
        center={{ color: BLUE, alpha: 0.95 }}
      />

      <div id="page">
        <div className="head">
          <span className="eyebrow mono">Websites &amp; E-commerce</span>
          <h1>
            Sites that look the part — <em>and sell.</em>
          </h1>
          <p>
            From brochure sites to full online stores, we design and build fast,
            responsive websites and e-commerce experiences — pixel-perfect,
            SEO-ready, and easy for your team to run without a developer on call.
          </p>
        </div>

        {/* centered moving screenshots (left → right) */}
        <div className="row">
          <div className="track right" id="rowMid">
            {loop.map((img, i) => (
              <Card key={i} img={img} />
            ))}
          </div>
        </div>

        <div className="foot">
          <div className="chips">
            <span className="chip">Corporate websites</span>
            <span className="chip">Online stores</span>
            <span className="chip">Headless CMS</span>
            <span className="chip">Payments &amp; checkout</span>
            <span className="chip">SEO &amp; performance</span>
          </div>
          <Link href="/#contact" className="cta">
            Start your website <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}