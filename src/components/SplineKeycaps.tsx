"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";
import { Keycaps } from "./Keycaps";

// ~2 MB of runtime, pure client work — keep it off the server and off the
// critical path. NOTE: the "/next" entry is an async SERVER component; wrapping
// it in next/dynamic from a client component makes it an async CLIENT
// component, which React rejects. The base entry is the client one.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Keycaps className="h-full w-full" />,
});

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE?.trim();

// Spline hands out two different URLs and they embed differently:
//   prod.spline.design/<id>/scene.splinecode — the raw scene, React runtime
//   my.spline.design/<slug>/                 — the published viewer, iframe
const isSceneFile = SCENE_URL ? /\.splinecode(\?|$)/.test(SCENE_URL) : false;
const isViewer = SCENE_URL ? /my\.spline\.design/.test(SCENE_URL) : false;

const CAP_NAMES = [
  "Keycap M 1",
  "Keycap A 2",
  "Keycap N 3",
  "Keycap A 4",
  "Keycap V 5",
];

const RELEASE_MS = 150;

type SceneObject = { position: { x: number; y: number; z: number } };

/**
 * The hero object.
 *
 * Renders the 3D keycaps when a Spline URL is configured, and falls back to the
 * hand-drawn SVG otherwise — or if the scene fails. The fallback is the point:
 * the hero must never be empty because a third-party runtime didn't arrive.
 */
export function SplineKeycaps({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cleanupRef.current?.(), []);

  function onLoad(app: Application) {
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __spline?: Application }).__spline = app;
    }

    setReady(true);

    const caps = CAP_NAMES.map(
      (n) => app.findObjectByName(n) as SceneObject | undefined,
    ).filter((c): c is SceneObject => Boolean(c));
    const rest = new Map(caps.map((c) => [c, c.position.y]));

    // The scene's MouseDown transition drives a cap down but never brings it
    // back, so every key would stay sunk. Ease them home on release — that's
    // what turns a latch into a keypress.
    let raf = 0;
    function release() {
      cancelAnimationFrame(raf);
      const from = new Map(caps.map((c) => [c, c.position.y]));
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / RELEASE_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        for (const c of caps) {
          const a = from.get(c)!;
          const b = rest.get(c)!;
          if (a !== b) c.position.y = a + (b - a) * eased;
        }
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }

  if (!SCENE_URL || failed || (!isSceneFile && !isViewer)) {
    return <Keycaps className={className} />;
  }

  if (isViewer) {
    return (
      <div className={`relative ${className}`}>
        {!ready ? <Keycaps className="absolute inset-0 h-full w-full" /> : null}
        <iframe
          src={SCENE_URL}
          title="Interactive 3D keycaps spelling MANAV"
          loading="lazy"
          onLoad={() => setReady(true)}
          className="h-full w-full border-0 transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
          allow="autoplay"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      aria-label="Interactive 3D keycaps spelling MANAV"
    >
      {!ready ? <Keycaps className="absolute inset-0 h-full w-full" /> : null}
      <div
        className="h-full w-full transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Spline scene={SCENE_URL} onLoad={onLoad} onError={() => setFailed(true)} />
      </div>
    </div>
  );
}
