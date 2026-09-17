import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manavgoel.dev"),
  title: `${profile.name} — ${profile.role}`,
  description: profile.thesis,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.thesis,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must live on <html>, not <body>: Tailwind's @theme
    // resolves --font-display/body/mono at :root, so the faces they point at
    // have to be defined there too or every family silently falls back.
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
