# Clean-Express – Website

Demo-Neubau der Website von **Clean-Express Reinigung**, Sternenstrasse 36a, 8903 Birmensdorf
(Inh. Besnik Avdilji). Vorlage: <https://clean-express.ch>

**Live:** <https://nick8952.github.io/clean-express-website/>
**Inhalte bearbeiten:** `/admin/` → siehe [HANDOVER.md](HANDOVER.md)

---

## Was drin ist

| | |
|---|---|
| Framework | Next.js 15 (App Router), statischer Export – keine Server nötig |
| Sprache | TypeScript |
| Styling | Tailwind CSS 3, Design-Tokens in `tailwind.config.ts` |
| Animation | Framer Motion (Einblenden), eigenes Canvas-2D-Hero (Wasser/Blasen), CSS-3D-Tilt-Karten – respektieren `prefers-reduced-motion` |
| CMS | Sveltia CMS unter `/admin/`, Inhalte als JSON und Markdown im Repo |
| Formular | Web3Forms (reines HTML-POST, kein JavaScript nötig) |
| Karte | OpenStreetMap-Einbettung – kein Google, keine Einwilligung nötig |
| Hosting | GitHub Pages via GitHub Actions |

Die Seite setzt **keine Cookies** und bindet **keine Tracker** ein. Schriften werden
beim Build mitgeliefert, es gibt keine Verbindung zu Google Fonts zur Laufzeit.

## Seiten

```
/                  Startseite (Hero, Leistungen, Referenzen, Über uns, CTA)
/dienstleistungen/ Alle fünf Leistungen im Detail
/kontakt/          Formular, Adresse, Telefon, Karte
/danke/            Bestätigung nach dem Formular
/impressum/  /datenschutz/  Rechtstexte
/admin/            CMS
```

## Lokal starten

```bash
npm install
npm run dev          # http://localhost:3000
```

Statischen Export bauen:

```bash
npm run build         # Ergebnis liegt in out/
```

Ohne Umgebungsvariablen baut das Projekt für die GitHub-Pages-URL
(`BASE_PATH=/clean-express-website`). Für eine Vorschau ohne Unterpfad:

```bash
BASE_PATH= npm run build
```

## Wo welcher Inhalt liegt

| Inhalt | Datei |
|---|---|
| Adresse, Telefon, E-Mail, Demo-Schalter | `data/site.json` |
| Die fünf Leistungen | `data/services.json` |
| Referenzen | `data/references.json` |
| Über uns & Werdegang | `data/about.json` |
| Menü und Fusszeile | `data/nav.json` |
| Seitentexte (Hero-Überschriften) | `content/pages/*.md` |
| Impressum, Datenschutz | `content/legal/*.md` |
| Bilder (falls der Kunde welche ergänzt) | `public/img/` |

Alle diese Dateien sind über das CMS unter `/admin/` bearbeitbar – niemand muss
dafür Code anfassen.

## Veröffentlichen

Jeder Push auf `main` löst `.github/workflows/deploy.yml` aus: Build und Upload
nach GitHub Pages, rund eine Minute. Änderungen aus dem CMS sind ganz normale
Commits und lösen denselben Ablauf aus.

## Weiter

Einrichtung des CMS-Logins, Kontaktformular scharf schalten, Go-Live und eigene
Domain: **[HANDOVER.md](HANDOVER.md)**.
