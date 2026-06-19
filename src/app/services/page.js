"use client";

import useRouteClass from "@/hooks/useRouteClass";
import SlideDeck from "@/components/SlideDeck";
import slides from "@/lib/services-slides";
import "./services.css";

const grid = {
  gap: 48,
  radius: 190,
  spotlight: { src: "fg", alpha: 0.09 },
  link: { src: "ac", mult: 0.55 },
  coldCross: { src: "fg", base: 0.2, range: 0.7 },
  hotCross: { src: "ac", base: 0.35, range: 0.65 },
  crosshair: { src: "fg", alpha: 0.4 },
  center: { src: "ac", alpha: 0.95 },
};

const drift = [
  { left: "7%", dur: "16s", ch: "+" },
  { left: "28%", dur: "22s", delay: "5s", ch: "{ }" },
  { left: "52%", dur: "14s", delay: "2s", ch: "+" },
  { left: "74%", dur: "19s", delay: "8s", ch: "</>" },
  { left: "90%", dur: "17s", delay: "3s", ch: "+" },
];

export default function ServicesPage() {
  useRouteClass("services");
  return (
    <div className="route-services">
      <SlideDeck
        slides={slides}
        grid={grid}
        drift={drift}
        deckOptions={{
          useLeaving: false,
          lockMs: 950,
          includeArrows: false,
          muteAlpha: 0.66,
          chipAlpha: 0.1,
          gridAlpha: 0.07,
        }}
        dotAria="Go to slide"
        hintLabel="Scroll to explore"
      />
    </div>
  );
}
