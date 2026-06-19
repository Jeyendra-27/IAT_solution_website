"use client";

import useRouteClass from "@/hooks/useRouteClass";
import SlideDeck from "@/components/SlideDeck";
import slides from "@/lib/ai-solutions-slides";
import "./ai-solutions.css";

const TECH = {
  Python: "python/python-original.svg",
  TensorFlow: "tensorflow/tensorflow-original.svg",
  PyTorch: "pytorch/pytorch-original.svg",
  OpenCV: "opencv/opencv-original.svg",
  FastAPI: "fastapi/fastapi-original.svg",
  React: "react/react-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  AWS: "amazonwebservices/amazonwebservices-original-wordmark.svg",
};

const grid = {
  gap: 54,
  radius: 200,
  spotlight: { src: "ac", alpha: 0.08 },
  link: { src: "ac", mult: 0.55 },
  coldCross: { src: "fg", base: 0.16, range: 0.7 },
  hotCross: { src: "ac", base: 0.4, range: 0.6 },
  crosshair: { src: "ac", alpha: 0.45 },
  center: { src: "ac", alpha: 0.95 },
};

const drift = [
  { left: "12%", dur: "18s", ch: "∑" },
  { left: "38%", dur: "24s", delay: "5s", ch: "{ }" },
  { left: "64%", dur: "15s", delay: "2s", ch: "01" },
  { left: "86%", dur: "20s", delay: "8s", ch: "∇" },
];

export default function AiSolutionsPage() {
  useRouteClass("ai-solutions");
  return (
    <div className="route-ai-solutions">
      <SlideDeck
        slides={slides}
        grid={grid}
        drift={drift}
        aura
        techMap={TECH}
        deckOptions={{
          useLeaving: true,
          leavingMs: 950,
          lockMs: 1000,
          includeArrows: true,
          muteAlpha: 0.6,
          chipAlpha: 0.08,
          gridAlpha: 0.05,
        }}
        dotAria="Go to solution"
        hintLabel="Scroll to explore"
      />
    </div>
  );
}
