import { SERVICE_ICONS } from "./Icons";
import TiltCard from "./TiltCard";

type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <TiltCard className="h-full">
      <a
        href={`/dienstleistungen/#${service.slug}`}
        className="glass-card group flex h-full flex-col gap-4 p-6"
      >
        <span className="font-semibold text-[0.68rem] uppercase tracking-[0.16em] text-ocean/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean/8 text-ocean transition-colors duration-200 group-hover:bg-ocean group-hover:text-paper">
          {Icon ? <Icon className="h-6 w-6" /> : null}
        </span>
        <h3 className="text-step-1 font-display font-semibold">{service.title}</h3>
        <p className="text-step--1 leading-relaxed text-ink-soft">{service.short}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-step--1 font-semibold text-ocean">
          Mehr erfahren
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </a>
    </TiltCard>
  );
}
