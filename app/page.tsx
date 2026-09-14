import type { Metadata } from "next";
import about from "@/data/about.json";
import services from "@/data/services.json";
import references from "@/data/references.json";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

import AboutStations from "@/components/AboutStations";
import CountUp from "@/components/CountUp";
import DiamondMark from "@/components/DiamondMark";
import ReferenceWall from "@/components/ReferenceWall";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import WaterHero from "@/components/WaterHero";
import { Btn, Container, Eyebrow, Fact, Section, SectionHead } from "@/components/ui";
import { IconArrowRight, IconClock, IconMail, IconPhone } from "@/components/Icons";

const page = getPage("home");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ocean-deep pt-24 sm:pt-28">
        <div className="absolute inset-0 -z-10">
          <WaterHero />
        </div>

        <Container className="relative">
          <div className="glass-card max-w-2xl p-7 sm:p-10">
            <Eyebrow>{page.hero?.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-step-5">
              {page.hero?.titlePrefix}{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-mint-deep bg-clip-text text-transparent">
                {page.hero?.titleAccent}
              </span>
            </h1>
            <p className="mt-6 max-w-md text-step-1 text-ink-soft">{page.hero?.lead}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Btn href="/dienstleistungen">
                Dienstleistungen ansehen
                <IconArrowRight className="h-4 w-4" />
              </Btn>
              <Btn href="/kontakt" variant="outline">
                Kontaktieren
              </Btn>
            </div>

            <p className="mt-7 inline-flex items-center gap-2 rounded-pill bg-foam px-3.5 py-2 font-semibold text-[0.68rem] uppercase tracking-[0.14em] text-mint-deep">
              <IconClock className="h-3.5 w-3.5" />
              {site.availability}
            </p>
          </div>

          {/* Grosser Diamant im offenen Wasser rechts – vom Firmenfahrzeug
              übernommenes Markenzeichen, hier als Hero-Blickfang. Schwebt
              sanft (CSS, respektiert prefers-reduced-motion global). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block xl:right-16"
          >
            <div className="hero-diamond-float">
              <DiamondMark
                className="h-64 w-64 drop-shadow-[0_50px_90px_rgba(1,50,175,0.5)] xl:h-80 xl:w-80"
                animated
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Kennzahlen ───────────────────────────────────────────── */}
      <Section tone="light" className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Fact
              value={
                <>
                  seit <CountUp to={Number(site.foundedYear)} />
                </>
              }
              label="Am Markt in Zürich"
            />
            <Fact
              value={
                <>
                  <CountUp to={24} /> / <CountUp to={7} />
                </>
              }
              label="Erreichbar, jeden Tag"
            />
            <Fact value={<CountUp to={5} />} label="Leistungsbereiche" />
            <Fact value="Privat & Firmen" label="Für beide da" />
          </div>
        </Container>
      </Section>

      {/* ── Leistungen ───────────────────────────────────────────── */}
      <Section tone="foam" id="leistungen">
        <Container>
          <SectionHead
            eyebrow="Was wir tun"
            title="Reinigung, auf die man sich verlassen kann"
            lead="Von der laufenden Unterhaltsreinigung bis zur Übergabe nach dem Umbau – fünf Leistungsbereiche, ein Ansprechpartner."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Referenzen ───────────────────────────────────────────── */}
      <Section tone="light" id="referenzen">
        <Container>
          <SectionHead
            eyebrow="Referenzen"
            title={references.heading}
            lead={references.lead}
          />
          <div className="mt-12">
            <ReferenceWall />
          </div>
        </Container>
      </Section>

      {/* ── Über uns ─────────────────────────────────────────────── */}
      <Section tone="foam" id="ueber-uns">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <div className="rule-mint mb-6" />
              <Eyebrow>Über uns</Eyebrow>
              <h2 className="mt-3 max-w-md text-step-3">
                Ein Betrieb, ein Name: {site.founder}
              </h2>
              <div className="prose-ce mt-6 max-w-prose">
                {about.body.split("\n\n").map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <DiamondMark className="h-10 w-10 shrink-0" animated />
                <p className="eyebrow">Werdegang</p>
              </div>
              <div className="mt-4">
                <AboutStations />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── CTA-Banner ───────────────────────────────────────────── */}
      <Section tone="dark">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="rule-mint mb-6" />
              <h2 className="max-w-xl text-step-3">
                Verlangen Sie jetzt Ihre unverbindliche Offerte
              </h2>
              <p className="mt-4 max-w-md text-step-0 text-paper/70">
                Rund um die Uhr erreichbar – rufen Sie an oder schreiben Sie uns.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${site.phoneTel}`} className="btn btn-mint">
                <IconPhone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-outline">
                <IconMail className="h-4 w-4" />
                E-Mail schreiben
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
