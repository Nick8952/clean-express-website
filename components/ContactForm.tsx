import services from "@/data/services.json";
import { SITE_URL, site } from "@/lib/site";

const LEISTUNGEN = [...services.items.map((s) => s.title), "Etwas anderes"];

const field =
  "w-full rounded-2xl border border-mist bg-white px-4 py-3 text-step-0 " +
  "text-ink transition-colors duration-150 placeholder:text-ink-soft/45 " +
  "hover:border-ocean/30 focus:border-ocean";

const label = "block text-step--1 font-semibold text-ink";

/**
 * Kontaktformular über Web3Forms – reines HTML-POST, damit es auch im
 * statischen Export ohne Server funktioniert. Nach dem Absenden leitet
 * Web3Forms auf /danke/ weiter.
 */
export default function ContactForm() {
  const key = site.web3formsKey;
  const live = Boolean(key);

  return (
    <form
      action={live ? "https://api.web3forms.com/submit" : undefined}
      method={live ? "POST" : undefined}
      className="space-y-5"
    >
      {!live && (
        <div className="rounded-2xl border border-dashed border-mint-deep/40 bg-foam px-5 py-4">
          <p className="font-semibold text-[0.68rem] uppercase tracking-[0.16em] text-mint-deep">
            Demo
          </p>
          <p className="mt-1.5 text-step--1 leading-relaxed text-ink-soft">
            Der Versand wird beim Aufschalten aktiviert. Bis dahin bitte anrufen
            oder an{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>{" "}
            schreiben.
          </p>
        </div>
      )}

      {live && (
        <>
          <input type="hidden" name="access_key" value={key} />
          <input type="hidden" name="subject" value="Neue Anfrage über clean-express.ch" />
          <input type="hidden" name="from_name" value={site.legalName} />
          <input type="hidden" name="redirect" value={`${SITE_URL}/danke/`} />
          {/* Spam-Falle: von Menschen nie ausgefüllt. */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
        </>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={`${field} mt-2`} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Telefon
          </label>
          <input id="phone" name="telefon" type="tel" autoComplete="tel" className={`${field} mt-2`} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>
          E-Mail <span aria-hidden="true">*</span>
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={`${field} mt-2`} />
      </div>

      <div>
        <label htmlFor="leistung" className={label}>
          Worum geht es?
        </label>
        <select id="leistung" name="leistung" className={`${field} mt-2`}>
          {LEISTUNGEN.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Ihre Nachricht <span aria-hidden="true">*</span>
        </label>
        <textarea id="message" name="nachricht" rows={6} required className={`${field} mt-2 resize-y`} />
        <p className="mt-2 text-step--1 text-ink-soft">
          Objektadresse und Wunschtermin helfen uns bei der Offerte.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={!live}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
        >
          Anfrage senden
        </button>
        <p className="text-step--1 text-ink-soft">
          <span aria-hidden="true">*</span> Pflichtfeld
        </p>
      </div>
    </form>
  );
}
