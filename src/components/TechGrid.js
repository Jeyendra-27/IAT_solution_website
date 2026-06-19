"use client";

import { useEffect, useState } from "react";

const DEVI = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/";

const STACK = [
  ["React", "react/react-original.svg"],
  ["Next.js", "nextjs/nextjs-original.svg"],
  ["Vue.js", "vuejs/vuejs-original.svg"],
  ["Angular", "angularjs/angularjs-original.svg"],
  ["TypeScript", "typescript/typescript-original.svg"],
  ["Node.js", "nodejs/nodejs-original.svg"],
  ["Python", "python/python-original.svg"],
  ["Django", "django/django-plain.svg"],
  ["FastAPI", "fastapi/fastapi-original.svg"],
  ["Laravel", "laravel/laravel-plain.svg"],
  [".NET Core", "dotnetcore/dotnetcore-original.svg"],
  ["Spring", "spring/spring-original.svg"],
  ["Flutter", "flutter/flutter-original.svg"],
  ["Swift", "swift/swift-original.svg"],
  ["Kotlin", "kotlin/kotlin-original.svg"],
  ["PostgreSQL", "postgresql/postgresql-original.svg"],
  ["MySQL", "mysql/mysql-original.svg"],
  ["MongoDB", "mongodb/mongodb-original.svg"],
  ["Redis", "redis/redis-original.svg"],
  ["TensorFlow", "tensorflow/tensorflow-original.svg"],
  ["PyTorch", "pytorch/pytorch-original.svg"],
  ["Docker", "docker/docker-original.svg"],
  ["Kubernetes", "kubernetes/kubernetes-plain.svg"],
  ["AWS", "amazonwebservices/amazonwebservices-original-wordmark.svg"],
];

/**
 * Grid of technology icons, each swaying at its own random pace (the random
 * timing is assigned after mount to avoid a server/client hydration mismatch).
 */
export default function TechGrid() {
  const [cells, setCells] = useState(() =>
    STACK.map(([name, path]) => ({ name, path, dur: "4s", del: "0s" }))
  );

  useEffect(() => {
    setCells(
      STACK.map(([name, path]) => ({
        name,
        path,
        dur: `${(3.4 + Math.random() * 2.4).toFixed(2)}s`,
        del: `${(-Math.random() * 3).toFixed(2)}s`,
      }))
    );
  }, []);

  return (
    <div className="tech-grid rv" id="techGrid">
      {cells.map((c) => (
        <div className="tcell" key={c.name}>
          <img
            src={DEVI + c.path}
            alt={c.name}
            loading="lazy"
            style={{ "--dur": c.dur, "--del": c.del }}
            onError={(e) => {
              e.currentTarget.style.opacity = ".25";
            }}
          />
          <span className="tname">{c.name}</span>
        </div>
      ))}
    </div>
  );
}
