import { addressLine, site } from "@/lib/site";

/**
 * OpenStreetMap-Einbettung – kein Google-Maps-Skript, also keine
 * Einwilligung nötig und kein Tracking auf der Seite.
 * Koordinaten für Sternenstrasse 36a, 8903 Birmensdorf per
 * Nominatim geprüft (47.35799, 8.45674).
 */
export default function MapEmbed() {
  const query = encodeURIComponent(site.mapQuery);
  const bbox = "8.4507,47.3540,8.4627,47.3620";
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=47.35799,8.45674`;

  return (
    <figure className="glass-card overflow-hidden p-0">
      <iframe
        src={src}
        title={`Karte: ${addressLine}`}
        loading="lazy"
        className="block h-[340px] w-full border-0"
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-mist bg-white px-5 py-4">
        <span className="text-step--1 text-ink-soft">{addressLine}</span>
        <a
          href={`https://www.openstreetmap.org/search?query=${query}`}
          target="_blank"
          rel="noreferrer noopener"
          className="link text-step--1"
        >
          Route öffnen
        </a>
      </figcaption>
    </figure>
  );
}
