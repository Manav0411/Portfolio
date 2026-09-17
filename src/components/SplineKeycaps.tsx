"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Keycaps } from "./Keycaps";

// The runtime is ~2 MB and pure client work — keep it out of the server
// bundle and off the critical path.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Keycaps className="w-full" />,
});

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE?.trim();

// Spline gives out two different URLs and they embed differently:
//   my.spline.design/<slug>/        — the published viewer page, use an iframe
//   prod.spline.design/.../*.splinecode — the raw scene, use the React runtime
const isViewer = SCENE_URL ? /my\.spline\.design/.test(SCENE_URL) : false;
const isSceneFile = SCENE_URL ? /\.splinecode(\?|$)/.test(SCENE_URL) : false;

/**
 * The hero object.
 *
 * Renders the real 3D keycaps when a Spline URL is configured, and falls back
 * to the hand-drawn SVG otherwise — or if the scene fails to load. The
 * fallback is the point: the hero must never be empty because a third-party
 * runtime didn't arrive.
 */
export function SplineKeycaps({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  if (!SCENE_URL || failed || (!isViewer && !isSceneFile)) {
    return <Keycaps className={className} />;
  }

  if (isViewer) {
    return (
      <div className={`relative ${className}`}>
        {/* The Spline viewer takes several seconds to boot. Hold the space with
            the SVG so the hero is never an empty box, and cross-fade when the
            real scene paints. */}
        {!ready ? (
          <Keycaps className="absolute inset-0 h-full w-full" />
        ) : null}
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
    <div className={className} aria-label="Interactive 3D keycaps spelling MANAV">
      <Spline scene={SCENE_URL} onError={() => setFailed(true)} />
    </div>
  );
}
