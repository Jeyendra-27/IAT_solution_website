import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
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
            <small>
              Custom software and AI solutions for businesses that have outgrown
              off-the-shelf tools.
            </small>
          </div>
          <div className="foot-links">
            <div>
              <span className="mono">Company</span>
              <ul>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/solutions">Work</Link></li>
                <li><Link href="/ai-solutions">AI Solutions</Link></li>
                <li><Link href="/web-ecommerce">Web &amp; E-commerce</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <span className="mono">Contact</span>
              <ul>
                <li><a href="mailto:info@iattechnologies.com">info@iattechnologies.com</a></li>
                <li><a href="#">+91 8925671055</a></li>
                <li><a href="#">Chennai, India</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copy">
          <span>© 2026 Linework</span>
          <span>FIG. 00 — DRAWN TO SPEC</span>
        </div>
      </div>
    </footer>
  );
}
