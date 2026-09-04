import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "light" | "foam" | "dark";

const toneClass: Record<Tone, string> = {
  light: "block-light",
  foam: "block-foam",
  dark: "block-dark",
};

export function Section({
  tone = "light",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${toneClass[tone]} py-section ${className}`}>
      {children}
    </section>
  );
}

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell px-gutter ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/**
 * Abschnitts-Kopf: Überzeile, Titel, Lead. Die Hairline markiert den
 * Sektionsanfang – neben den Glaskarten das einzige wiederkehrende
 * Zierelement.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  return (
    <div className={`${alignment} ${className}`}>
      <div className={`rule-mint mb-6 ${align === "center" ? "mx-auto" : ""}`} />
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-step-3">{title}</h2>
      {lead ? (
        <p
          className={`mt-5 text-step-1 opacity-80 ${
            align === "center" ? "mx-auto max-w-prose" : "max-w-prose"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Die Klassennamen stehen hier ausgeschrieben: Tailwind durchsucht den
 * Quelltext nach Zeichenketten und würde eine zusammengesetzte Klasse wie
 * `btn-${variant}` nicht finden – die Regel fiele beim Build heraus.
 */
const BTN_VARIANT = {
  primary: "btn btn-primary",
  mint: "btn btn-mint",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
} as const;

type BtnVariant = keyof typeof BTN_VARIANT;

export function Btn({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: BtnVariant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `${BTN_VARIANT[variant]} ${className}`;
  if (
    external ||
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("/#")
  ) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Kennzahl / Faktenzeile – Zahl in der Utility-Schrift, Label darunter. */
export function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-mono text-step-2 tabular-nums">{value}</p>
      <p className="mt-1 text-step--1 uppercase tracking-[0.12em] opacity-60">
        {label}
      </p>
    </div>
  );
}

/** Fünf-Sterne-Reihe – reines SVG, keine Icon-Bibliothek. */
export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < count ? "fill-mint-deep" : "fill-mist"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
