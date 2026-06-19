"use client";

import Link from "next/link";
import useRouteClass from "@/hooks/useRouteClass";
import useScrollReveal from "@/hooks/useScrollReveal";
import useCountUp from "@/hooks/useCountUp";
import GridCanvas from "@/components/GridCanvas";
import { ABOUT_ORBIT, ABOUT_WHOART } from "@/lib/raw-svg";
import "./about.css";

const BLUE = [39, 66, 245];
const SIGNAL = [255, 107, 53];

export default function AboutPage() {
  useRouteClass("about");
  useScrollReveal(".rv,.who-art");
  useCountUp();

  return (
    <div className="route-about">
      <GridCanvas
        gap={48}
        radius={190}
        spotlight={{ color: BLUE, alpha: 0.07 }}
        link={{ color: BLUE, mult: 0.5 }}
        coldCross={{ color: BLUE, base: 0.15, range: 0.75 }}
        hotCross={{ color: SIGNAL, base: 0.35, range: 0.65 }}
        crosshair={{ color: BLUE, alpha: 0.4 }}
        center={{ color: SIGNAL, alpha: 0.9 }}
      />

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow mono">About IAT Solutions</span>
            <h1>
              <span className="ln">
                <span>We turn business</span>
              </span>
              <span className="ln">
                <span>
                  problems into <em>software.</em>
                </span>
              </span>
            </h1>
            <p>
              We are a software studio that designs and builds custom platforms and
              AI solutions for businesses that have outgrown off-the-shelf tools. We
              start with your workflow — never a template.
            </p>
          </div>
          <div className="orbit" dangerouslySetInnerHTML={{ __html: ABOUT_ORBIT }} />
        </div>
      </section>

      {/* STAT STRIP */}
      <div className="strip">
        <div className="wrap">
          <div className="strip-grid">
            <div className="stat">
              <div className="n"><span data-count="60">0</span><sup>+</sup></div>
              <div className="l">Projects delivered</div>
            </div>
            <div className="stat">
              <div className="n"><span data-count="40">0</span><sup>+</sup></div>
              <div className="l">Happy clients</div>
            </div>
            <div className="stat">
              <div className="n"><span data-count="12">0</span><sup>+</sup></div>
              <div className="l">Industries</div>
            </div>
            <div className="stat">
              <div className="n"><span data-count="8">0</span><sup>+</sup></div>
              <div className="l">Years building</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHO WE ARE */}
      <div className="wrap">
        <div className="who-grid">
          <div className="who-text rv">
            <span className="mono">Who we are</span>
            <h2 style={{ fontSize: "clamp(1.9rem,3.4vw,2.7rem)", lineHeight: 1.15, margin: "14px 0 24px" }}>
              A small team that ships serious software.
            </h2>
            <p>
              We&apos;re engineers, designers, and problem-solvers who believe the
              best software disappears into the work — it just makes things faster,
              clearer, and less frustrating.{" "}
              <strong>No bloated teams, no endless meetings.</strong>
            </p>
            <p>
              We sit with your team, map how work actually flows, and then build the
              platform that fits it. From CRMs and HRMS to AI assistants and full
              e-commerce systems, we&apos;ve shipped across logistics, healthcare,
              education, retail, and manufacturing.
            </p>
            <p>
              When we hand something over, it&apos;s fast, documented, and built to
              grow with you — and we stay on to support it.
            </p>
          </div>
          <div className="who-art rv d1">
            <div className="float" dangerouslySetInnerHTML={{ __html: ABOUT_WHOART }} />
          </div>
        </div>
      </div>

      {/* MISSION & VISION */}
      <section className="mv">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="mono" style={{ color: "var(--signal)" }}>
              What drives us
            </span>
            <h2>Mission &amp; Vision.</h2>
          </div>
          <div className="mv-grid">
            <div className="mvcard m rv">
              <div className="ring" />
              <div className="ico">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </div>
              <span className="tag">Our mission</span>
              <h3>Make great software accessible to every business.</h3>
              <p>
                To free businesses from the limits of off-the-shelf tools by building
                custom software and AI that fits exactly how they work — practical,
                reliable, and genuinely useful from day one.
              </p>
            </div>
            <div className="mvcard v rv d1">
              <div className="ring" />
              <div className="ico">
                <svg viewBox="0 0 24 24">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="tag">Our vision</span>
              <h3>A world where software is built around people.</h3>
              <p>
                To be the team businesses trust to turn their hardest problems into
                elegant systems — pushing AI and automation to give every company,
                large or small, the kind of tools only giants once had.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="mono">How we work</span>
            <h2>The values behind every build.</h2>
          </div>
          <div className="values-grid">
            <div className="val rv">
              <div className="vico">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l8 4v5c0 4.5-3.4 7.5-8 9-4.6-1.5-8-4.5-8-9V7z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Built to fit</h3>
              <p>
                We shape the software around your workflow, not the other way around.
                The tool should serve the team.
              </p>
            </div>
            <div className="val rv d1">
              <div className="vico">
                <svg viewBox="0 0 24 24">
                  <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
                </svg>
              </div>
              <h3>Ship fast, ship real</h3>
              <p>
                Working software every couple of weeks, not slideware. You see real
                progress you can click through.
              </p>
            </div>
            <div className="val rv d2">
              <div className="vico">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3>In it with you</h3>
              <p>
                Launch is the start, not the finish. We monitor, maintain, and evolve
                the system as you grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="wrap">
        <div className="cta-box rv">
          <h2>Let&apos;s build something that lasts.</h2>
          <p>
            Tell us what&apos;s slowing your team down. We&apos;ll come back with a
            blueprint, a timeline, and a fixed quote.
          </p>
          <Link href="/contact" className="btn">
            Get in touch <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
