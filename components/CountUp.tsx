"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Zählt beim Sichtbarwerden von 0 auf `to` hoch (Kundenwunsch: „Zahlen
 * sollen auf der Startseite automatisch hochzählen, wirkt moderner").
 * Läuft einmalig, sobald das Element in den sichtbaren Bereich scrollt
 * (IntersectionObserver, gleiches Muster wie Reveal.tsx). Bei
 * `prefers-reduced-motion` erscheint sofort der Endwert.
 *
 * Start-Zustand ist bewusst `to`, nicht 0: ohne JavaScript (oder falls die
 * Hydration scheitert) zeigt die Seite so trotzdem den korrekten Wert statt
 * dauerhaft „0" – wichtig, weil diese Kennzahlen auch von Suchmaschinen-
 * Crawlern gelesen werden. Beim Sichtbarwerden wird kurz auf 0 zurückgesetzt
 * und dann hochgezählt (Codex-Review-Fund).
 */
export default function CountUp({
  to,
  duration = 1400,
}: {
  to: number;
  duration?: number;
}) {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        setValue(0);
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out
          setValue(Math.round(eased * to));
          raf.current = progress < 1 ? requestAnimationFrame(tick) : null;
        }
        raf.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [to, duration]);

  return <span ref={ref}>{value}</span>;
}
