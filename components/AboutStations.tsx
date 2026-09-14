import about from "@/data/about.json";
import Reveal from "./Reveal";

type Station = { year: string; role: string; place: string };

/**
 * Werdegang von Besnik Avdilji als kompakte Stationen-Liste – bewusst kein
 * animiertes Timeline-Bauteil (das ist bereits das Signature-Element eines
 * anderen Kundenprojekts), sondern eine ruhige, nummerierte Reihe.
 */
export default function AboutStations() {
  const stations = about.stations as Station[];

  return (
    <ol className="space-y-0">
      {stations.map((s, i) => (
        <Reveal key={s.year + s.place} delay={i * 0.06} as="li">
          <div className="flex items-baseline gap-4 border-b border-mist py-4 last:border-none">
            <span className="w-24 shrink-0 font-semibold text-step--1 tabular-nums text-mint-deep">
              {s.year}
            </span>
            <p className="text-step-0">
              <span className="font-semibold text-ink">{s.role}</span>
              <span className="text-ink-soft"> · {s.place}</span>
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
