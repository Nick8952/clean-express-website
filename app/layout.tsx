import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL, asset, site } from "@/lib/site";

/**
 * Eine einzige Schriftfamilie sitewide (Kundenwunsch: „die Schrift soll
 * überall gleich sein") – Manrope, geometrisch-klar, trägt sowohl grosse
 * Überschriften (800) als auch Fliesstext (400/500) gut. Frühere Version
 * hatte drei Fonts (Manrope/Plus Jakarta Sans/Space Mono); Unterscheidung
 * läuft jetzt nur noch über Schriftschnitt/-grad, nicht mehr über die
 * Schriftart selbst. `display`/`sans`/`mono` in tailwind.config.ts zeigen
 * absichtlich alle auf dieselbe Variable, damit bestehende Klassennamen
 * (font-display/font-sans/font-mono) im Code nicht überall angefasst werden
 * mussten.
 */
const font = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} – Reinigung in ${site.address.city} & Zürich`,
    template: `%s · ${site.name}`,
  },
  description: site.blurb,
  // Solange `demo` in data/site.json an ist, bleibt die Seite aus Google raus.
  robots: site.demo
    ? { index: false, follow: false }
    : { index: true, follow: true },
  icons: { icon: asset("/favicon.svg") },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: site.name,
    url: SITE_URL,
    title: `${site.name} – ${site.tagline}`,
    description: site.blurb,
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className={font.variable}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd />
      </body>
    </html>
  );
}
