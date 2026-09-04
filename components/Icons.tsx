/**
 * Eigenes, schlichtes Strich-Icon-Set (24×24, 1.75px, runde Kappen) –
 * keine Icon-Bibliothek, damit das Bundle klein bleibt und der Stil
 * konsequent zur Typografie passt.
 */
import type { ReactElement } from "react";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconPhone({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 21.5s7-6.6 7-12A7 7 0 0 0 5 9.5c0 5.4 7 12 7 12Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconBoxes({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="10.5" width="8" height="8" rx="1" />
      <rect x="12.5" y="6.5" width="8" height="8" rx="1" />
      <path d="M3.5 13.5h8M12.5 9.5h8" />
    </svg>
  );
}

export function IconHelmet({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M3 16h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2Z" />
      <path d="M12 6V4" />
    </svg>
  );
}

export function IconKey({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="8" cy="9" r="4" />
      <path d="m11 12 9 9M17 15l2.5 2.5M15 17l2.5 2.5" />
    </svg>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.5c.6 3.4 1.7 4.5 5 5-3.3.5-4.4 1.6-5 5-.6-3.4-1.7-4.5-5-5 3.3-.5 4.4-1.6 5-5Z" />
      <path d="M19 15c.3 1.6.8 2.1 2.3 2.4-1.5.3-2 .8-2.3 2.4-.3-1.6-.8-2.1-2.3-2.4 1.5-.3 2-.8 2.3-2.4Z" />
    </svg>
  );
}

export function IconSpray({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4H12" />
      <path d="M14 4.5 16.5 2M15.5 6l3-1M16 8.5l3 .5" />
      <rect x="6" y="8" width="9" height="13" rx="2" />
      <path d="M6 12.5h9" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.5 12h15M13.5 5.5 20 12l-6.5 6.5" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  spray: IconSpray,
  boxes: IconBoxes,
  crane: IconHelmet,
  key: IconKey,
  sparkle: IconSparkle,
};
