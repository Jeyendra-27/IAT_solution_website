"use client";

import { useEffect } from "react";
import Link from "next/link";
import useRouteClass from "@/hooks/useRouteClass";
import useScrollReveal from "@/hooks/useScrollReveal";
import useCountUp from "@/hooks/useCountUp";
import GridCanvas from "@/components/GridCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import Ticker from "@/components/Ticker";
import ServiceCard from "@/components/ServiceCard";
import Terminal from "@/components/Terminal";
import TechGrid from "@/components/TechGrid";
import ClientsConveyor from "@/components/ClientsConveyor";
import Footer from "@/components/Footer";
import {
  HOME_DECO_1,
  HOME_DECO_2,
  HOME_BLUEPRINT,
  HOME_SVC_ICON_1,
  HOME_SVC_ICON_2,
  HOME_SICON_1,
  HOME_SICON_2,
  HOME_SICON_3,
  HOME_SICON_4,
  HOME_DATAFLOW,
  HOME_PLANE,
} from "@/lib/raw-svg";
import "./home.css";

const BLUE = [39, 66, 245];
const SIGNAL = [255, 107, 53];

// inline raw SVG without adding a layout box (so absolute children resolve to the section)
const RawC = ({ html }) => (
  <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
);

const DRIFT = [
  { left: "6%", dur: "15s", delay: "0s", ch: "+" },
  { left: "22%", dur: "19s", delay: "4s", ch: "{ }" },
  { left: "47%", dur: "13s", delay: "2s", ch: "+" },
  { left: "68%", dur: "21s", delay: "7s", ch: "</>" },
  { left: "88%", dur: "16s", delay: "1s", ch: "+" },
  { left: "35%", dur: "24s", delay: "9s", ch: "▢" },
];

export default function HomePage() {
  useRouteClass("home");
  useScrollReveal(".rv");
  useCountUp();

  // hero blueprint parallax (mouse-follow)
  useEffect(() => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.querySelector(".route-home .hero");
    const bpSvg = document.querySelector(".route-home .bp svg");
    if (!motionOK || !hero || !bpSvg) return;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      bpSvg.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
      bpSvg.style.transition = "transform .25s ease-out";
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="route-home">
      <ScrollProgress />
      <GridCanvas
        gap={48}
        radius={190}
        spotlight={{ color: BLUE, alpha: 0.07 }}
        link={{ color: SIGNAL, mult: 0.5 }}
        coldCross={{ color: BLUE, base: 0.15, range: 0.75 }}
        hotCross={{ color: SIGNAL, base: 0.35, range: 0.65 }}
        crosshair={{ color: BLUE, alpha: 0.4 }}
        center={{ color: SIGNAL, alpha: 0.9 }}
      />

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <RawC html={HOME_DECO_1} />
        <RawC html={HOME_DECO_2} />
        {DRIFT.map((d, i) => (
          <span
            key={i}
            className="drift"
            style={{ left: d.left, animationDuration: d.dur, animationDelay: d.delay }}
          >
            {d.ch}
          </span>
        ))}

        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow mono">Custom software · AI solutions</span>
            <h1>
              <span className="ln">
                <span>Software built</span>
              </span>
              <span className="ln">
                <span>
                  to <span className="accent">your</span> exact
                </span>
              </span>
              <span className="ln">
                <span>blueprint.</span>
              </span>
            </h1>
            <p>
              Off-the-shelf tools force your business to bend. We design, engineer,
              and ship custom software and AI systems that fit the way you actually
              work.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-solid">
                Book a discovery call <span className="arr">→</span>
              </a>
              <Link href="/services" className="btn btn-line">
                See what we build
              </Link>
            </div>
          </div>

          <div className="bp">
            <div
              className="bp-float"
              dangerouslySetInnerHTML={{ __html: HOME_BLUEPRINT }}
            />
          </div>
        </div>
      </section>

      <Ticker />

      {/* ---------------- SERVICES ---------------- */}
      <section>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="mono">What we build</span>
            <h2>Two disciplines. One team that ships.</h2>
          </div>
          <div className="svc-grid">
            <ServiceCard className="svc rv">
              <div className="svc-icon" dangerouslySetInnerHTML={{ __html: HOME_SVC_ICON_1 }} />
              <h3>Custom business software</h3>
              <p>
                Purpose-built platforms that replace spreadsheets, patchwork tools,
                and manual processes with one system your team actually enjoys using.
              </p>
              <div className="mini">
                <div className="mini-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="codeline" style={{ "--w": "82%", "--d": "0s" }} />
                <div className="codeline" style={{ "--w": "58%", "--d": ".5s" }} />
                <div className="codeline" style={{ "--w": "70%", "--d": "1s" }} />
                <div className="codeline" style={{ "--w": "44%", "--d": "1.5s" }} />
              </div>
              <ul className="svc-list">
                <li><span className="dot" />Web &amp; mobile applications</li>
                <li><span className="dot" />Custom internal tools including, CRMs, HRMs &amp; ERPs</li>
                <li><span className="dot" />API &amp; third-party integrations</li>
                <li><span className="dot" />Software testing &amp; QA</li>
              </ul>
            </ServiceCard>

            <ServiceCard className="svc ai rv d1">
              <div className="svc-icon" dangerouslySetInnerHTML={{ __html: HOME_SVC_ICON_2 }} />
              <h3>AI solutions</h3>
              <p>
                Practical AI that pays for itself — automating the repetitive work,
                surfacing answers from your data, and handling customers around the
                clock.
              </p>
              <div className="mini radar">
                <span className="ring" />
                <span className="ring r2" />
                <span className="ring r3" />
                <span className="core" />
              </div>
              <ul className="svc-list">
                <li><span className="dot" />Workflow &amp; document automation</li>
                <li><span className="dot" />Chatbots &amp; AI agents</li>
                <li><span className="dot" />Analytics &amp; prediction models</li>
                <li><span className="dot" />AI integrated into your software</li>
              </ul>
            </ServiceCard>
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="proc">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="mono">How we work</span>
            <h2>From first sketch to live system in four moves.</h2>
          </div>
          <div className="proc-grid rv">
            <div className="step">
              <span className="num">STEP 01</span>
              <RawC html={HOME_SICON_1} />
              <h3>Discover</h3>
              <p>We map your workflow, pain points, and goals before a single line of code is written.</p>
              <span className="bar" />
            </div>
            <div className="step">
              <span className="num">STEP 02</span>
              <RawC html={HOME_SICON_2} />
              <h3>Design</h3>
              <p>Interactive prototypes you can click through — so you see the product before we build it.</p>
              <span className="bar" />
            </div>
            <div className="step">
              <span className="num">STEP 03</span>
              <RawC html={HOME_SICON_3} />
              <h3>Build</h3>
              <p>Short sprints, working software every two weeks, and full visibility on progress.</p>
              <span className="bar" />
            </div>
            <div className="step">
              <span className="num">STEP 04</span>
              <RawC html={HOME_SICON_4} />
              <h3>Support</h3>
              <p>Launch is the start. We monitor, maintain, and evolve the system as you grow.</p>
              <span className="bar" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- AI BAND ---------------- */}
      <section className="ai-band">
        <div className="wrap ai-inner">
          <div className="rv">
            <span className="mono">AI, applied</span>
            <h2>Your data already knows the answer. We build the AI that asks.</h2>
            <p>
              Most businesses sit on years of operational data and hours of
              repeatable work. We turn both into automation — from invoice
              processing and support triage to forecasting and intelligent search
              across your documents.
            </p>
            <RawC html={HOME_DATAFLOW} />
            <div className="ai-feats">
              <div className="ai-feat"><span className="mono">Automate</span>Repetitive back-office work</div>
              <div className="ai-feat"><span className="mono">Assist</span>24/7 customer-facing agents</div>
              <div className="ai-feat"><span className="mono">Analyse</span>Forecasts from your own data</div>
              <div className="ai-feat"><span className="mono">Augment</span>AI inside the tools you use</div>
            </div>
          </div>
          <div className="rv d1">
            <Terminal />
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section>
        <div className="wrap">
          <div className="stats-grid">
            <div className="stat rv">
              <div className="n"><span data-count="20">0</span><sup>+</sup></div>
              <div className="l">Systems delivered</div>
            </div>
            <div className="stat rv d1">
              <div className="n"><span data-count="10">0</span><sup>+</sup></div>
              <div className="l">Industries served</div>
            </div>
            <div className="stat rv d2">
              <div className="n"><span data-count="40">0</span><sup>%</sup></div>
              <div className="l">Avg. hours saved by automation</div>
            </div>
            <div className="stat rv d3">
              <div className="n"><span data-count="98">0</span><sup>%</sup></div>
              <div className="l">Clients who return</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TECH ---------------- */}
      <section className="tech" id="tech">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="mono">Our toolkit</span>
            <h2>Technologies we work with.</h2>
            <p>
              A pragmatic, modern stack — we pick the right tool for each job rather
              than forcing every project through the same framework.
            </p>
          </div>
          <TechGrid />
        </div>
      </section>

      {/* ---------------- CLIENTS ---------------- */}
      <section className="clients" id="clients">
        <div className="wrap">
          <div className="clients-grid">
            <div className="rv">
              <span className="mono">Clients &amp; partners</span>
              <h2>Teams that build with us.</h2>
              <p>
                From fast-moving startups to established enterprises, we&apos;ve
                shipped software for companies across logistics, healthcare,
                education, retail, and more — many of whom come back for their next
                build.
              </p>
              <div className="client-stats">
                <div><div className="n">15+</div><div className="l">Clients served</div></div>
                <div><div className="n">10+</div><div className="l">Industries</div></div>
                <div><div className="n">98%</div><div className="l">Return rate</div></div>
              </div>
            </div>
            <div className="rv d1">
              <ClientsConveyor />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section id="contact">
        <div className="wrap">
          <div className="cta-box rv">
            <RawC html={HOME_PLANE} />
            <h2>Have a process worth automating?</h2>
            <p>
              Tell us what slows your team down. We&apos;ll come back with a
              blueprint, a timeline, and a fixed quote — free, within 48 hours.
            </p>
            <a href="mailto:info@iattechnologies.com" className="btn">
              Book a free discovery call <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
