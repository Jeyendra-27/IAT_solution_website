"use client";

import useRouteClass from "@/hooks/useRouteClass";
import GridCanvas from "@/components/GridCanvas";
import ContactForm from "@/components/ContactForm";
import "./contact.css";

// Standard light-page grid (blue crosses, orange hot/center) — matches the original.
const BLUE = [39, 66, 245];
const SIGNAL = [255, 107, 53];

export default function ContactPage() {
  useRouteClass("contact");

  return (
    <div className="route-contact">
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

      <header className="chead">
        <div className="wrap">
          <span className="eyebrow mono">Get in touch</span>
          <h1>
            Let&apos;s build <em>something</em> together.
          </h1>
          <p>
            Tell us about your project, your timeline, or just the problem
            that&apos;s slowing your team down. We reply within one business day.
          </p>
        </div>
      </header>

      <main className="wrap">
        <div className="cgrid">
          {/* LEFT: form */}
          <section className="panel" id="form">
            <svg className="env" viewBox="0 0 120 120">
              <g className="fly">
                <rect className="ln" x="20" y="36" width="80" height="56" rx="6" />
                <path className="ln" d="M20 42 L60 70 L100 42" />
              </g>
            </svg>
            <span
              className="spark"
              style={{ width: "8px", height: "8px", right: "30px", top: "120px", animationDelay: ".5s" }}
            />
            <span
              className="spark"
              style={{ width: "6px", height: "6px", right: "70px", top: "90px", animationDelay: "1.4s" }}
            />
            <h2>Send us a message</h2>
            <p className="sub">
              Fill in a few details and we&apos;ll get the right person back to you.
            </p>
            <ContactForm />
          </section>

          {/* RIGHT: company info */}
          <aside className="panel right">
            <span className="mono">Company details</span>
            <h2 style={{ marginTop: "12px" }}>Reach us directly.</h2>
            <div className="info">
              <div className="irow">
                <div className="iico">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h16v12H4z" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                </div>
                <div>
                  <div className="ilab">Email</div>
                  <div className="ival">
                    info@iattechnologies.com
                  </div>
                </div>
              </div>
              <div className="irow">
                <div className="iico">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                  </svg>
                </div>
                <div>
                  <div className="ilab">Phone</div>
                  <div className="ival">
                    +91 8925671055<span>Mon–Fri, 9:30am–6:30pm IST</span>
                  </div>
                </div>
              </div>
              <div className="irow">
                <div className="iico">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="ilab">Office</div>
                  <div className="ival">
                    Chennai, India<span>Tamil Nadu — open to remote worldwide</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hours">
              <span className="pulse-dot" /> Currently accepting new projects
            </div>

            <div className="socials">
              <a className="soc" href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4 0 4.75 2.65 4.75 6.1V21H19v-5.6c0-1.34-.02-3.06-1.86-3.06-1.86 0-2.15 1.46-2.15 2.96V21h-4z" />
                </svg>
              </a>
              <a className="soc" href="#" aria-label="X">
                <svg viewBox="0 0 24 24">
                  <path d="M18 3h3l-7 8 8 10h-6l-5-6-5 6H3l8-9L3 3h6l4 5z" />
                </svg>
              </a>
              <a className="soc" href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-5a3.9 3.9 0 011-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0012 2z" />
                </svg>
              </a>
              <a className="soc" href="#" aria-label="Dribbble">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.5 6a8.2 8.2 0 011.8 4.7c-.3 0-3-.6-5.7-.3-.1-.3-.2-.5-.4-.9 3-1.2 4-2.9 4.3-3.5zM12 3.8c2 0 3.8.7 5.2 2-.2.4-1.1 2-3.9 3-.9-1.7-2-3.2-2.6-4a8 8 0 011.3-1zM8.7 4.5c.6.8 1.6 2.2 2.5 3.9-3.2.8-6 .8-6.4.8a8.2 8.2 0 013.9-4.7zM3.8 12v-.3c.3 0 3.6.1 7.1-1 .2.4.4.8.5 1.2-2.8.8-5 3-5.9 4.2A8.2 8.2 0 013.8 12zm3.1 5.5c.6-.9 2.3-2.7 5-3.6.9 2.3 1.3 4.3 1.4 4.9a8.2 8.2 0 01-6.4-1.3zm8.1.5c-.1-.6-.5-2.4-1.3-4.6 2.5-.4 4.7.3 5 .4a8.2 8.2 0 01-3.7 4.2z" />
                </svg>
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
