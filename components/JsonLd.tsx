import services from "@/data/services.json";
import { SITE_URL, site } from "@/lib/site";

/**
 * Strukturierte Daten für Google (LocalBusiness).
 * Nur belegte Angaben – keine erfundenen Bewertungen oder Öffnungszeiten
 * über das hinaus, was die Original-Website selbst behauptet (24/7).
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    alternateName: site.name,
    description: site.blurb,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo-original.png`,
    image: `${SITE_URL}/img/logo-original.png`,
    email: site.email,
    telephone: [site.phoneTel, site.mobileTel].filter(Boolean),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: "ZH",
      addressCountry: "CH",
    },
    areaServed: site.region,
    founder: { "@type": "Person", name: site.founder },
    foundingDate: site.foundedYear,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dienstleistungen",
      itemListElement: services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
