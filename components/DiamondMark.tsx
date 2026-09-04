"use client";

import { useId } from "react";

/**
 * Der Diamant von den Firmenfahrzeugen – Nicks Referenzfoto zeigt ihn als
 * eigenständiges Markenzeichen neben dem Schriftzug. Als facettierte
 * Vektorgrafik nachgebaut (6 Facetten, hell/dunkel schattiert statt Verlauf
 * – druckscharf, kein Rasterbild). Optional mit einem sanften Glanz-Sweep
 * über die Facetten (`animated`), der `prefers-reduced-motion` automatisch
 * über die globale Regel in globals.css respektiert.
 */
export default function DiamondMark({
  className = "h-8 w-8",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const id = useId();
  const clipId = `diamond-clip-${id}`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <polygon points="35,15 65,15 92,40 50,92 8,40" />
        </clipPath>
      </defs>

      {/* Facetten – Kronenfacetten oben (heller), Pavillon unten (dunkler) */}
      <polygon points="35,15 8,40 30,40" fill="#628FFF" />
      <polygon points="35,15 30,40 70,40 65,15" fill="#EAF1FF" />
      <polygon points="65,15 70,40 92,40" fill="#0132AF" />
      <polygon points="8,40 50,92 30,40" fill="#0A1F52" />
      <polygon points="30,40 50,92 70,40" fill="#081B44" />
      <polygon points="70,40 50,92 92,40" fill="#1C3E8F" />

      {/* Facettenkanten */}
      <g fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.4" strokeLinejoin="round">
        <polygon points="35,15 65,15 92,40 50,92 8,40" />
        <path d="M35,15 30,40 M65,15 70,40 M30,40 70,40 M30,40 50,92 M70,40 50,92" />
      </g>

      {/* kleines Glanzlicht */}
      <path
        d="M42 22 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z"
        fill="#FFFFFF"
        opacity="0.85"
      />

      {animated ? (
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="-40"
            y="0"
            width="30"
            height="100"
            fill="#FFFFFF"
            opacity="0.5"
            transform="skewX(-20)"
            className="diamond-shine"
          />
        </g>
      ) : null}
    </svg>
  );
}
