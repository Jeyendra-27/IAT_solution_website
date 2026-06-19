"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Our Works" },
  { href: "/ai-solutions", label: "AI Solutions" },
  { href: "/web-ecommerce", label: "Web & E-commerce" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav>
        <Link href="/" className="logo">
          <img
            src="/images/iatt-logo.png"
            className="logo-mark"
            alt="IAT Solutions logo"
            width={26}
            height={26}
          />
          IAT Solutions
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "on" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link href="/contact" className="nav-cta nav-cta-desktop">
          Start a project <span className="arr">→</span>
        </Link>

        {/* Hamburger button — mobile/tablet only */}
        <button
          className={`nav-burger${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`nav-drawer-overlay${open ? " active" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? " active" : ""}`} role="dialog" aria-modal="true">
        <div className="nav-drawer-header">
          <Link href="/" className="logo" onClick={() => setOpen(false)}>
            <img
              src="/images/iatt-logo.png"
              className="logo-mark"
              alt="IAT Solutions logo"
              width={26}
              height={26}
            />
            IAT Solutions
          </Link>
          <button
            className="nav-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="nav-drawer-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "on" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link href="/contact" className="nav-cta nav-drawer-cta" onClick={() => setOpen(false)}>
          Start a project <span className="arr">→</span>
        </Link>
      </div>
    </>
  );
}
