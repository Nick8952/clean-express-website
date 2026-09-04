import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { addressLine, site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/Icons";
import { Container, Section } from "@/components/ui";

const page = getPage("kontakt");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

const CARDS = [
  { icon: IconPin, label: "Adresse", value: addressLine },
  { icon: IconPhone, label: "Telefon & Fax", value: `${site.phoneDisplay} · Fax ${site.faxDisplay}` },
  { icon: IconMail, label: "E-Mail", value: site.email },
  { icon: IconClock, label: "Erreichbarkeit", value: site.availability },
];

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={page.hero?.title ?? "Kontakt"}
        lead={page.hero?.lead}
      />

      <Section tone="light">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card p-5">
                <Icon className="h-5 w-5 text-mint-deep" />
                <p className="mt-3 eyebrow">{label}</p>
                <p className="mt-1 text-step-0 font-medium text-ink">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="glass-card p-7 sm:p-9">
              <h2 className="text-step-2">Schreiben Sie uns</h2>
              <p className="mt-2 text-step--1 text-ink-soft">
                Wir melden uns in der Regel innerhalb eines Werktags zurück.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
            <div>
              <MapEmbed />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
