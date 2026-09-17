import type { Metadata } from "next";
import { Poppins, Montserrat, Caveat } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manavgoel.dev"),
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Font variables go on <html>: Tailwind's @theme resolves --font-sans and
    // friends at :root, so the faces they point at must be defined there too.
    <html
      lang="en"
      // <Splash> stamps data-splash here before paint, so this element is
      // expected to differ from the server HTML at hydration.
      suppressHydrationWarning
      className={`${poppins.variable} ${montserrat.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
