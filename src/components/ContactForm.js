"use client";

import { useState } from "react";

export default function ContactForm() {
  const [filled, setFilled] = useState(false);
  const [sent, setSent] = useState(false);
  const [flash, setFlash] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 2000);
  };

  return (
    <form id="cform" noValidate onSubmit={onSubmit}>
      <div className="two">
        <div className="field">
          <input type="text" id="name" placeholder=" " required />
          <label htmlFor="name">Full name</label>
        </div>
        <div className="field">
          <input type="text" id="company" placeholder=" " />
          <label htmlFor="company">Company</label>
        </div>
      </div>
      <div className="two">
        <div className="field">
          <input type="email" id="email" placeholder=" " required />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="field">
          <input type="tel" id="phone" placeholder=" " />
          <label htmlFor="phone">Phone (optional)</label>
        </div>
      </div>
      <div className="field">
        <select
          id="topic"
          required
          defaultValue=""
          className={filled ? "filled" : undefined}
          onChange={(e) => setFilled(!!e.target.value)}
        >
          <option value="" disabled hidden></option>
          <option>Custom software</option>
          <option>AI / ML solution</option>
          <option>Website / E-commerce</option>
          <option>Mobile application</option>
          <option>Something else</option>
        </select>
        <label htmlFor="topic">What can we help with?</label>
        <svg className="chev" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="field">
        <textarea id="msg" placeholder=" " required></textarea>
        <label htmlFor="msg">Tell us about your project</label>
      </div>
      <button
        type="submit"
        className="submit"
        style={flash ? { background: "#0E7C66" } : undefined}
      >
        Send message <span className="arr">→</span>
      </button>
      <div className={sent ? "sent show" : "sent"} id="sent">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8l3.5 3.5L13 5"
            stroke="#0E7C66"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Thanks — your message is ready to send! (Demo form)
      </div>
    </form>
  );
}
