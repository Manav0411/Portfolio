"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

// Runs before paint, so the gate never flashes for people who should skip it:
// anyone on a deep link, and anyone who already went through it this session.
const DECIDE = `(function(){try{
var skip = location.hash.length > 1 || sessionStorage.getItem('seen-splash') === '1';
document.documentElement.setAttribute('data-splash', skip ? 'hide' : 'show');
}catch(e){document.documentElement.setAttribute('data-splash','hide');}})();`;

/**
 * The landing gate: signature, role, one button through to the portfolio.
 * The markup always renders — CSS and the script above decide whether it shows,
 * which keeps the server and client HTML identical.
 */
export function Splash() {
  const [leaving, setLeaving] = useState(false);

  function enter() {
    try {
      sessionStorage.setItem("seen-splash", "1");
    } catch {
      // private mode — the gate just shows again next time
    }
    setLeaving(true);
    window.setTimeout(() => {
      document.documentElement.setAttribute("data-splash", "hide");
    }, 480);
  }

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: DECIDE }} />
      <div
        className="splash fixed inset-0 z-[100] flex flex-col items-center justify-center bg-alt px-6 transition-opacity duration-[480ms]"
        style={{ opacity: leaving ? 0 : 1 }}
      >
        <p
          className="text-center text-[clamp(3.5rem,13vw,7.5rem)] leading-[0.95] text-ink-3"
          style={{ fontFamily: "var(--font-script)" }}
        >
          <span className="block">{profile.firstName}</span>
          <span className="block pl-[0.4em]">{profile.lastName}</span>
        </p>

        <p className="mt-10 text-[1.0625rem] text-ink-2">{profile.title}</p>

        <button
          type="button"
          onClick={enter}
          className="mt-8 rounded-full border border-[#bdbdbd] px-8 py-3 text-[0.9375rem] text-ink-2 transition-colors hover:border-ink-2 hover:bg-white"
        >
          See Portfolio
        </button>
      </div>
    </>
  );
}
