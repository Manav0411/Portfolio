import { NextResponse } from "next/server";
import { profile } from "@/content/profile";

// Resend's shared sender. It needs no DNS, but only delivers to the address
// that owns the Resend account — which is exactly what a contact form wants.
// To send from your own domain later, verify it in Resend and change this.
const FROM = "Portfolio <onboarding@resend.dev>";

const MAX = { name: 120, email: 200, message: 5000 };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Misconfiguration, not the visitor's fault — don't blame the input.
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a field hidden from people but filled by naive bots. Answer 200
  // so the bot believes it worked and doesn't retry.
  if (clean(payload.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const message = clean(payload.message, MAX.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [profile.email],
      // Hitting Reply in the inbox answers the visitor, not Resend.
      reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n—\n${name}\n${email}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend send failed", res.status, detail);
    return NextResponse.json(
      { error: "Could not send just now. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
