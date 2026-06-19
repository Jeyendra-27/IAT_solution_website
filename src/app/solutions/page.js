"use client";

import useRouteClass from "@/hooks/useRouteClass";
import SlideDeck from "@/components/SlideDeck";
import slides from "@/lib/solutions-slides";
import "./solutions.css";

const TECH = {
  React: "react/react-original.svg",
  "React Native": "react/react-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  Redis: "redis/redis-original.svg",
  Angular: "angularjs/angularjs-original.svg",
  ".NET Core": "dotnetcore/dotnetcore-original.svg",
  "SQL Server": "microsoftsqlserver/microsoftsqlserver-plain.svg",
  "Vue.js": "vuejs/vuejs-original.svg",
  Laravel: "laravel/laravel-plain.svg",
  MySQL: "mysql/mysql-original.svg",
  Django: "django/django-plain.svg",
  Flutter: "flutter/flutter-original.svg",
  Firebase: "firebase/firebase-plain.svg",
  FastAPI: "fastapi/fastapi-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  "AWS S3": "amazonwebservices/amazonwebservices-original.svg",
  "Amazon SES": "amazonwebservices/amazonwebservices-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  "Spring Boot": "spring/spring-original.svg",
};

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

export default function SolutionsPage() {
  useRouteClass("solutions");
  return (
    <div className="route-solutions">
      <SlideDeck
        slides={slides}
        grid={grid}
        drift={drift}
        techMap={TECH}
        deckOptions={{
          useLeaving: true,
          leavingMs: 900,
          lockMs: 1000,
          includeArrows: true,
          muteAlpha: 0.66,
          chipAlpha: 0.1,
          gridAlpha: 0.07,
        }}
        dotAria="Go to project"
        hintLabel="Scroll to explore"
      />
    </div>
  );
}
