import siteData from "@/data/site.json";
import navData from "@/data/nav.json";

export const site = siteData;
export const nav = navData;

/**
 * Beim Betrieb unter einem Unterpfad (GitHub Pages) muss jeder Pfad aus
 * `public/` von Hand geprefixt werden – Next.js macht das nur für <Link>.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

/**
 * Bildpfad auflösen.
 *   "logo.svg"              → /img/logo.svg           (Bestand aus dem Original)
 *   "/img/uploads/neu.jpg"  → unverändert              (vom CMS hochgeladen)
 * In beiden Fällen kommt der Basispfad davor.
 */
export function img(value: string): string {
  return value.startsWith("/") ? asset(value) : asset(`/img/${value}`);
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://nick8952.github.io/clean-express-website";

export const addressLine = `${site.address.street}, ${site.address.zip} ${site.address.city}`;
