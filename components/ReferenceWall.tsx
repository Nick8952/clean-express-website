import references from "@/data/references.json";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { Stars } from "./ui";

export default function ReferenceWall() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {references.items.map((ref, i) => (
        <Reveal key={ref.company} delay={i * 0.05}>
          <TiltCard max={6} className="h-full">
            <div className="glass-card flex h-full flex-col gap-4 p-6">
              <Stars count={ref.stars} />
              <p className="text-step-0 font-medium text-ink">{ref.service}</p>
              <div className="mt-auto border-t border-mist pt-4">
                <p className="font-display text-step--1 font-semibold text-ocean">
                  {ref.company}
                </p>
                <p className="mt-1 text-step--1 text-ink-soft">{ref.address}</p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
