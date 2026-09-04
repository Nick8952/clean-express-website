import type { Metadata } from "next";
import services from "@/data/services.json";
import { getPage } from "@/lib/content";
import PageHero from "@/components/PageHero";
import { SERVICE_ICONS } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { Btn, Container, Section } from "@/components/ui";

const page = getPage("dienstleistungen");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

export default function DienstleistungenPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={page.hero?.title ?? "Dienstleistungen"}
        lead={page.hero?.lead}
      />

      <Section tone="light">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-20">
            {services.items.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Reveal key={s.slug} delay={i * 0.04} as="section">
                  <div id={s.slug} className="scroll-mt-28">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean/8 text-ocean">
                      {Icon ? <Icon className="h-7 w-7" /> : null}
                    </span>
                    <h2 className="mt-5 text-step-2">{s.title}</h2>
                    <div className="prose-ce mt-4 max-w-prose">
                      {s.body.split("\n\n").map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                    {s.bullets.length > 0 ? (
                      <ul className="list-check mt-6 max-w-prose text-step-0">
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="rule-mint mb-6" />
              <h2 className="max-w-xl text-step-3">
                Nicht die passende Leistung dabei?
              </h2>
              <p className="mt-4 max-w-md text-step-0 text-paper/70">
                Kontaktieren Sie uns für aussergewöhnliche Einsätze – wir beraten Sie gerne.
              </p>
            </div>
            <Btn href="/kontakt" variant="mint">
              Offerte anfragen
            </Btn>
          </div>
        </Container>
      </Section>
    </>
  );
}
