"use client";

import { useLayoutEffect, useEffect } from "react";

// Run before paint on the client, but fall back to useEffect during SSR.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Adds a `route-<name>` class to <html> while the page is mounted.
 * This lets each route own its <body> background / overflow / CSS tokens
 * without those styles leaking onto other routes (see each route's CSS file).
 */
export default function useRouteClass(route) {
  useIsoLayoutEffect(() => {
    const el = document.documentElement;
    const cls = `route-${route}`;
    el.classList.add(cls);
    return () => el.classList.remove(cls);
  }, [route]);
}
