import { getLegal } from "@/lib/content";
import PageHero from "./PageHero";
import Prose from "./Prose";
import { Container, Section } from "./ui";

export default function LegalPage({ slug }: { slug: string }) {
  const page = getLegal(slug);

  return (
    <>
      <PageHero eyebrow="Rechtliches" title={page.title} lead={page.subtitle} />
      <Section tone="light">
        <Container>
          <Prose markdown={page.body} />
        </Container>
      </Section>
    </>
  );
}
