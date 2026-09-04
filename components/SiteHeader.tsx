"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { IconClose, IconMenu, IconPhone } from "./Icons";

/**
 * Typografische Wortmarke, neu gestaltet nach dem Original-Logo (blaues
 * "Clean-Express" + "Reinigung"-Zusatz) – als Schrift statt Rasterbild,
 * damit sie auf jeder Fläche/Auflösung scharf bleibt.
 */
function Wordmark() {
  return (
    <span className="flex items-center gap-2 leading-none">
      <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em] text-ocean">
        Clean<span className="text-mint-deep">·</span>Express
      </span>
      <span className="hidden rounded-pill bg-mist px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ocean/70 sm:inline">
        Reinigung
      </span>
    </span>
  );
}

/**
 * Eigenes Kopfzeilen-Konzept: eine schwebende Glas-Pille mit Abstand zu
 * allen Rändern statt einer randlosen zweizeiligen Kopfleiste – anders als
 * bei den bisherigen Kundenseiten.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname === `${href}/`;

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ocean focus:px-5 focus:py-3 focus:text-paper"
      >
        Zum Inhalt springen
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-gutter pt-3 sm:pt-4">
        <div
          className={`glass-bar flex w-full max-w-shell items-center justify-between gap-4 rounded-pill px-4 py-2 transition-all duration-300 ease-calm sm:px-5 ${
            scrolled ? "shadow-lift" : "shadow-glass"
          }`}
        >
          <Link href="/" className="shrink-0" aria-label={`${site.name} – zur Startseite`}>
            <Wordmark />
          </Link>

          <nav aria-label="Hauptmenü" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`inline-flex min-h-[42px] items-center rounded-pill px-4 text-step--1 font-medium transition-colors duration-150 hover:bg-mist hover:text-ocean ${
                      isActive(item.href) ? "bg-mist text-ocean" : "text-ink-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={nav.ctaHref}
              className="hidden items-center gap-2 rounded-pill bg-ocean px-4 py-2.5 text-step--1 font-semibold text-paper shadow-card transition-all duration-200 ease-calm hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex"
            >
              <IconPhone className="h-4 w-4" />
              {nav.ctaLabel}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-ocean transition-colors hover:bg-mist lg:hidden"
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-ocean-deep/97 pt-24 backdrop-blur-md lg:hidden"
        >
          <nav aria-label="Mobiles Hauptmenü" className="px-gutter">
            <ul className="space-y-1">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-4 py-4 text-step-2 font-display font-semibold text-paper hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={nav.ctaHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-mint px-5 py-4 text-step-0 font-semibold text-ocean-deep"
            >
              <IconPhone className="h-5 w-5" />
              {nav.ctaLabel}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
