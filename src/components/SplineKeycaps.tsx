"use client";

import { useEffect, useState } from "react";
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

// Typing a letter presses the matching cap. Both A caps answer to A.
const KEY_TO_CAPS: Record<string, string[]> = {
  M: ["Keycap M 1"],
  A: ["Keycap A 2", "Keycap A 4"],
  N: ["Keycap N 3"],
  V: ["Keycap V 5"],
};

const PRESS_DEPTH = 12;
const PRESS_MS = 80;
const RELEASE_MS = 150;
// A click's pointerup lands ~10ms after pointerdown while the scene's own
// MouseDown tween runs 80ms, so releasing immediately cancels the press before
// the cap travels. Hold long enough for it to land.
const PRESS_HOLD_MS = 160;

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
  const [app, setApp] = useState<Application | null>(null);
  const ready = app !== null;

  // Keyed to the app, NOT to mount: StrictMode mounts, unmounts and remounts in
  // development, and onLoad only ever fires once. Registering these in a
  // mount-only effect meant the unmount tore the listeners off for good.
  useEffect(() => {
    if (!app) return;

    // Resolve objects at CALL time, not here: right after onLoad the runtime
    // has not finished registering the scene graph, so looking them up now
    // yields nothing and every later write silently targets undefined.
    const rest = new Map<string, number>();
    const frames = new Map<string, number>();

    function getCap(name: string): SceneObject | undefined {
      const cap = app!.findObjectByName(name) as SceneObject | undefined;
      if (cap && !rest.has(name)) rest.set(name, cap.position.y);
      return cap;
    }

    function tweenTo(name: string, offset: number, ms: number) {
      const cap = getCap(name);
      if (!cap) return;
      const targetY = (rest.get(name) ?? cap.position.y) + offset;
      cancelAnimationFrame(frames.get(name) ?? 0);
      const from = cap.position.y;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        const eased = 1 - Math.pow(1 - t, 3);
        cap.position.y = from + (targetY - from) * eased;
        if (t < 1) frames.set(name, requestAnimationFrame(step));
      };
      frames.set(name, requestAnimationFrame(step));
    }

    // When each cap started travelling down, so a release can wait for it.
    const pressedAt = new Map<string, number>();
    const releaseTimers = new Set<number>();

    // Prime the rest positions once the runtime is settled.
    const prime = window.setTimeout(() => CAP_NAMES.forEach(getCap), 400);

    // Spline's own KeyDown events never fire through the React runtime — the
    // page receives the keystroke and the scene ignores it — so the keyboard
    // press is driven here.
    function onKeyDown(e: KeyboardEvent) {
      if (process.env.NODE_ENV !== "production") {
        const w = window as unknown as { __kbLog?: string[] };
        (w.__kbLog ??= []).push("down:" + e.key);
      }
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      for (const n of KEY_TO_CAPS[e.key.toUpperCase()] ?? []) {
        pressedAt.set(n, performance.now());
        tweenTo(n, -PRESS_DEPTH, PRESS_MS);
      }
    }

    // A tap's keyup lands almost immediately after keydown, so releasing at once
    // cancels the press before the cap has travelled and nothing visibly moves.
    // Hold each cap down until its press has actually completed.
    function onKeyUp(e: KeyboardEvent) {
      for (const n of KEY_TO_CAPS[e.key.toUpperCase()] ?? []) {
        const elapsed = performance.now() - (pressedAt.get(n) ?? 0);
        const wait = Math.max(0, PRESS_HOLD_MS - elapsed);
        const id = window.setTimeout(() => {
          releaseTimers.delete(id);
          tweenTo(n, 0, RELEASE_MS);
        }, wait);
        releaseTimers.add(id);
      }
    }

    // Clicks go through the scene's own MouseDown transition, which drives a
    // cap down and never brings it back; this is what lifts it again.
    let holdTimer = 0;
    function releaseAll() {
      for (const n of CAP_NAMES) tweenTo(n, 0, RELEASE_MS);
    }
    function scheduleRelease() {
      clearTimeout(holdTimer);
      holdTimer = window.setTimeout(releaseAll, PRESS_HOLD_MS);
    }

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __kb?: unknown }).__kb = { tweenTo, getCap };
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerup", scheduleRelease);
    window.addEventListener("pointercancel", scheduleRelease);
    window.addEventListener("blur", releaseAll);

    return () => {
      for (const id of frames.values()) cancelAnimationFrame(id);
      clearTimeout(holdTimer);
      clearTimeout(prime);
      for (const id of releaseTimers) clearTimeout(id);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerup", scheduleRelease);
      window.removeEventListener("pointercancel", scheduleRelease);
      window.removeEventListener("blur", releaseAll);
    };
  }, [app]);

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
          className="h-full w-full border-0"
          allow="autoplay"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      aria-label="Interactive 3D keycaps spelling MANAV. Type M, A, N or V."
    >
      {!ready ? <Keycaps className="absolute inset-0 h-full w-full" /> : null}
      <div
        className="h-full w-full transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Spline
          scene={SCENE_URL}
          onLoad={(a: Application) => {
            if (process.env.NODE_ENV !== "production") {
              (window as unknown as { __spline?: Application }).__spline = a;
            }
            setApp(a);
          }}
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}
