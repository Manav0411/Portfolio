"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";
import { Keycaps } from "./Keycaps";

// ~2 MB of runtime, pure client work — keep it off the server and off the
// critical path. NOTE: the "/next" entry is an async SERVER component; wrapping
// it in next/dynamic from a client component makes it an async CLIENT component,
// which React rejects. The base entry is the client one.
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
        <Spline
          scene={SCENE_URL}
          onLoad={(app: Application) => {
            setReady(true);
            if (process.env.NODE_ENV !== "production") {
              (window as unknown as { __spline?: Application }).__spline = app;
            }
          }}
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}
