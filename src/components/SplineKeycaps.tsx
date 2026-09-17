"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Keycaps } from "./Keycaps";

// The Spline runtime is ~2 MB and pure client work — keep it out of the
// server bundle and off the critical path.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Keycaps className="w-full" />,
});

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE;

/**
 * The hero object.
 *
 * With a published Spline scene URL set, this renders the real 3D keycaps —
 * lit, shadowed, and pressable. Without one (or if the scene fails to load)
 * it falls back to the hand-drawn SVG, which also presses and costs ~2 KB.
 * The fallback is the point: the page must never ship an empty hero because
 * a third-party runtime didn't load.
 */
export function SplineKeycaps({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!SCENE_URL || failed) {
    return <Keycaps className={className} />;
  }

  return (
    <div className={className} aria-label="Interactive 3D keycaps spelling MANAV">
      <Spline scene={SCENE_URL} onError={() => setFailed(true)} />
    </div>
  );
}
