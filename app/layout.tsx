import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL, asset, site } from "@/lib/site";

/**
 * Schriftpaar:
 *   Manrope – Display. Geometrisch-klar, extrabold in grossen Graden –
 *     trägt die «klinisch-frische» Bildsprache ohne Ornament.
 *   Plus Jakarta Sans – Fliesstext. Humanistisch-warm, bleibt bei langen
 *     Komposita ("Umbau- und Neubaureinigung") gut lesbar.
 *   Space Mono – Auszeichnungen: Telefonnummer, Jahreszahlen, Adressen.
 */
const display = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
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
    <html
      lang="de-CH"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
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
