"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // No backend: submitting opens the visitor's mail client with the message
  // already composed. Honest about where it goes, and nothing to keep running.
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-lg bg-alt px-5 py-4 text-[0.9375rem] text-ink-2 placeholder:text-ink-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-2";

  return (
    <section id="contact" className="bg-page px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title text-center">Get in Touch</h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-ink-3">
          Looking for a full-time software engineering role in 2027. If you&apos;re
          hiring, or want to talk about agents and retrieval, say hello.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label className="sr-only" htmlFor="c-name">Name</label>
            <input
              id="c-name"
              className={field}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="sr-only" htmlFor="c-email">Email</label>
            <input
              id="c-email"
              type="email"
              className={field}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="sr-only" htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              rows={6}
              className={`${field} resize-y`}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-solid mt-1 w-full">
              Send Message
            </button>
          </form>

          <div>
            <h3 className="text-[1.375rem] font-light text-ink-2">Connect With Me</h3>

            <ul className="mt-5 flex items-center gap-5">
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                   className="block text-ink-2 transition-opacity hover:opacity-60">
                  <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                   className="block text-ink-2 transition-opacity hover:opacity-60">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} aria-label="Email"
                   className="block text-ink-2 transition-opacity hover:opacity-60">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M24 5.46v13.08c0 .8-.66 1.46-1.46 1.46h-2.19V9.72L12 15.54 3.65 9.72V20H1.46C.66 20 0 19.34 0 18.54V5.46C0 4.24 1.4 3.54 2.37 4.27L3.65 5.23 12 11.05l8.35-5.82 1.28-.96C22.6 3.54 24 4.24 24 5.46Z" />
                  </svg>
                </a>
              </li>
            </ul>

            <hr className="my-7 border-line" />

            <dl className="flex flex-col gap-3 text-[0.9375rem]">
              <div>
                <dt className="inline text-ink-2">Location: </dt>
                <dd className="inline text-ink-3">{profile.location}</dd>
              </div>
              <div>
                <dt className="inline text-ink-2">Status: </dt>
                <dd className="inline text-ink-3">{profile.status}</dd>
              </div>
              <div>
                <dt className="inline text-ink-2">Email: </dt>
                <dd className="inline">
                  <a href={`mailto:${profile.email}`} className="text-ink-3 underline underline-offset-4 hover:text-ink-2">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="inline text-ink-2">Résumé: </dt>
                <dd className="inline">
                  <a href="/Manav_Goel_Resume.pdf" className="text-ink-3 underline underline-offset-4 hover:text-ink-2">
                    Download PDF
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
