import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Btn, Container, Section } from "@/components/ui";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

const page = getPage("danke");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  robots: { index: false, follow: false },
};

export default function Danke() {
  const hero = page.hero ?? {};

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title!} lead={hero.lead} />

      <Section tone="light">
        <Container>
          <div className="flex flex-wrap gap-3">
            <Btn href="/">Zur Startseite</Btn>
            <Btn href={`tel:${site.phoneTel}`} variant="outline">
              {site.phoneDisplay} anrufen
            </Btn>
          </div>
        </Container>
      </Section>
    </>
  );
}
