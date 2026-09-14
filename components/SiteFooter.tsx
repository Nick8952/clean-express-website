import Link from "next/link";
import { addressLine, nav, site } from "@/lib/site";
import DiamondMark from "./DiamondMark";
import { IconClock, IconMail, IconPhone, IconPin } from "./Icons";
import { Container } from "./ui";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="block-dark">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="flex items-center gap-2.5">
              <DiamondMark className="h-8 w-8 shrink-0" />
              <span className="font-display text-[1.5rem] font-extrabold tracking-[-0.03em] text-paper">
                Clean<span className="text-mint">·</span>Express
              </span>
            </span>
            <p className="mt-4 max-w-xs text-step--1 leading-relaxed text-paper/65">
              {site.blurb}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-2 font-semibold text-[0.68rem] uppercase tracking-[0.14em] text-mint">
              <IconClock className="h-3.5 w-3.5" />
              {site.availability}
            </p>
          </div>

          <div>
            <p className="eyebrow">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-step--1 text-paper/75 hover:text-mint">
                    {item.label}
                  </Link>
                </li>
              ))}
              {nav.footerLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-step--1 text-paper/75 hover:text-mint">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Kontakt</p>
            <ul className="mt-4 space-y-3 text-step--1 text-paper/75">
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                <span>{addressLine}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 shrink-0 text-mint" />
                <a href={`tel:${site.phoneTel}`} className="hover:text-mint">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconMail className="h-4 w-4 shrink-0 text-mint" />
                <a href={`mailto:${site.email}`} className="hover:text-mint break-all">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-step--1 text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundedYear}–{year} {site.legalName}. Alle Rechte vorbehalten.
          </p>
          <p>Gegründet {site.foundedYear} von {site.founder}</p>
        </div>
      </Container>
    </footer>
  );
}
