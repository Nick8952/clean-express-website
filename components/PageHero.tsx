import type { ReactNode } from "react";
import { Container } from "./ui";

/**
 * Kopfbereich der Unterseiten – ruhiger dunkler Block mit einem leisen,
 * statischen Verlaufsschimmer (kein Canvas: nur der Startseiten-Hero
 * bekommt die volle interaktive Wasserfläche, damit Unterseiten schlank
 * bleiben).
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ocean-deep pb-16 pt-16 text-paper sm:pb-20 sm:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 80% at 85% -10%, rgba(98,143,255,0.35), transparent 60%), radial-gradient(45% 60% at 10% 110%, rgba(23,201,170,0.18), transparent 60%)",
        }}
      />
      <Container className="relative">
        <div className="rule-mint mb-7 max-w-md" />
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-4xl text-step-4">{title}</h1>
        {lead ? (
          <p className="mt-6 max-w-prose text-step-1 text-paper/75">{lead}</p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
