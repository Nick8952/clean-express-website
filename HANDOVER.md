# Übergabe – Website Clean-Express

Dieses Dokument beschreibt alles, was nach der Übergabe noch zu tun ist und wie
die Seite langfristig gepflegt wird – auch von jemandem, der sie nicht gebaut hat.

**Inhalt**

1. [CMS-Login einrichten](#1-cms-login-einrichten-einmalig)
2. [Inhalte bearbeiten – Anleitung für den Kunden](#2-inhalte-bearbeiten)
3. [Kontaktformular scharf schalten](#3-kontaktformular-scharf-schalten)
4. [Vor dem Go-Live](#4-vor-dem-go-live)
5. [Eigene Domain aufschalten](#5-eigene-domain-aufschalten)
6. [Wenn etwas nicht funktioniert](#6-wenn-etwas-nicht-funktioniert)
7. [Was vom Original übernommen wurde – und was neu ist](#7-was-vom-original-übernommen-wurde--und-was-neu-ist)
8. [Wer was besitzt](#8-wer-was-besitzt)

---

## 1. CMS-Login einrichten (einmalig)

Das CMS liegt unter `…/admin/`. Es speichert direkt ins GitHub-Repository, hat
also keine eigene Datenbank und kein eigenes Passwort – man meldet sich mit dem
GitHub-Konto an. Damit das im Browser funktioniert, braucht es einmalig zwei
Dinge: eine OAuth-App bei GitHub und einen kleinen Vermittler (Cloudflare Worker).
Beides ist gratis und danach nie wieder anzufassen.

### 1a. GitHub-OAuth-App anlegen

1. <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**
2. Ausfüllen:
   - **Application name:** `Clean-Express CMS`
   - **Homepage URL:** `https://nick8952.github.io/clean-express-website/`
   - **Authorization callback URL:** die Worker-URL aus Schritt 1b plus `/callback`
     (z. B. `https://clean-express-cms-auth.<name>.workers.dev/callback`) – erst nach 1b eintragbar,
     die App lässt sich nachträglich bearbeiten.
3. **Client ID** notieren, **Generate a new client secret** → **Client Secret** notieren.
   Das Secret wird nur einmal angezeigt.

### 1b. Cloudflare Worker deployen

Der Worker ist fertig, es muss nichts programmiert werden.

1. Konto auf <https://dash.cloudflare.com> (gratis).
2. Repository <https://github.com/sveltia/sveltia-cms-auth> öffnen und der dortigen
   Anleitung folgen (**Deploy to Cloudflare Workers**).
3. Im Worker unter **Settings → Variables** drei Werte setzen:
   - `GITHUB_CLIENT_ID` – aus 1a
   - `GITHUB_CLIENT_SECRET` – aus 1a
   - `ALLOWED_DOMAINS` – `nick8952.github.io` (später zusätzlich `clean-express.ch`)
4. Die Worker-URL kopieren und in 1a als **Authorization callback URL** + `/callback` eintragen.

### 1c. Worker-URL in die Website eintragen

In [`public/admin/config.yml`](public/admin/config.yml), Zeile `base_url`:

```yaml
backend:
  name: github
  repo: Nick8952/clean-express-website
  branch: main
  base_url: https://REPLACE-WITH-SVELTIA-AUTH-WORKER-URL   # ← hier die Worker-URL
```

Ändern, committen, pushen. Nach dem Deploy funktioniert der Login unter `/admin/`.

### 1d. Kunden freischalten

Der Kunde braucht ein GitHub-Konto und **Schreibrechte** auf das Repository:
Repo → **Settings → Collaborators → Add people** → Rolle `Write`.

---

## 2. Inhalte bearbeiten

*Diesen Abschnitt kann man dem Kunden so weitergeben.*

### Anmelden

1. `https://nick8952.github.io/clean-express-website/admin/` öffnen
2. **Login with GitHub** – GitHub-Konto verwenden
3. Links in der Spalte den Bereich wählen, ändern, oben rechts **Publish**

Nach dem Speichern dauert es **rund eine Minute**, bis die Änderung auf der
Website sichtbar ist. Danach im Browser einmal neu laden (Strg+F5).

### Welcher Bereich enthält was

| Bereich im CMS | Was man dort ändert |
|---|---|
| **Firmendaten & Einstellungen** | Adresse, Telefon, Fax, E-Mail, Gründungsjahr, Demo-Schalter, Formular-Schlüssel |
| **Leistungen** | Titel, Beschreibungen und Aufzählungen der fünf Leistungen |
| **Referenzen** | Kunden, Adressen, ausgeführte Leistung, Sterne |
| **Über uns** | Firmengeschichte und Werdegang |
| **Menü & Fusszeile** | Beschriftungen und Reihenfolge im Menü |
| **Seiten-Texte** | Überschriften und Einleitungen der Startseite, Dienstleistungen- und Kontaktseite |
| **Impressum & Datenschutz** | Die beiden Rechtstexte |

### Häufige Aufgaben

**Telefonnummer ändern:** Firmendaten → **beide** Felder anpassen – „Telefon
(Anzeige)" ist das, was man liest, „Telefon (zum Anwählen)" ist die Nummer, die
beim Antippen gewählt wird (Format `+41441234567`, ohne Leerzeichen).

**Neue Referenz hinzufügen:** Referenzen → **Add Referenz** → Firma, Adresse,
Leistung, Sterne ausfüllen.

**Zwischentitel in einem Rechtstext:** Im Feld „Inhalt" eine Zeile mit `##`
beginnen: `## Neuer Abschnitt`.

**Etwas kaputt gemacht?** Jede Änderung ist als Version gespeichert. Im Repo unter
**Commits** die letzte gute Version suchen und zurücksetzen lassen – nichts geht
verloren.

---

## 3. Kontaktformular scharf schalten

Solange kein Schlüssel hinterlegt ist, zeigt die Kontaktseite das Formular mit
einem Demo-Hinweis, der Absende-Knopf ist inaktiv. Zum Aktivieren:

1. <https://web3forms.com> → **Create Access Key** mit `clean.express@hotmail.com`
   (oder einer neuen Adresse, falls das Hotmail-Postfach abgelöst werden soll –
   siehe Abschnitt 7).
2. Der Schlüssel kommt per Mail an diese Adresse.
3. CMS → **Firmendaten & Einstellungen** → „Schlüssel fürs Kontaktformular" → einsetzen → Publish.

Web3Forms ist im Gratis-Tarif auf 250 Nachrichten pro Monat begrenzt.

**Testen:** Formular ausfüllen, absenden, Weiterleitung auf `/danke/` prüfen, und
im Postfach nachsehen (auch im Spam-Ordner).

---

## 4. Vor dem Go-Live

- [ ] **Demo-Modus ausschalten:** CMS → Firmendaten → „Demo-Modus" auf AUS.
      Solange er an ist, steht auf jeder Seite `noindex` und `robots.txt` sperrt
      alles – die Seite taucht bei Google nicht auf. Das ist für eine Demo gewollt.
- [ ] **Kontaktformular** scharf (Abschnitt 3)
- [ ] **UID/MWST-Nummer ergänzen:** Im Impressum steht aktuell ein Platzhalter –
      die echte Handelsregister-/UID-Nummer war auf der Original-Website nicht
      aufgeführt und muss vom Kunden nachgereicht werden.
- [ ] **Fax-Nummer prüfen:** Auf der Original-Website ist die Fax-Nummer identisch
      mit der Telefonnummer (044 451 83 17) – das wurde 1:1 übernommen, ist aber
      möglicherweise ein alter Tippfehler der Originalseite. Beim Kunden verifizieren.
- [ ] **Referenzliste prüfen:** „Bank Clariden Leu AG" ist als Referenz 1:1
      übernommen, existiert als Marke aber seit der Übernahme durch die Credit
      Suisse (2007) nicht mehr. Mit dem Kunden klären, ob die Referenz bleibt,
      umbenannt oder durch eine aktuellere ersetzt wird.
- [ ] **E-Mail-Adresse:** Aktuell `clean.express@hotmail.com` (Original). Für
      einen professionellen Auftritt empfiehlt sich langfristig eine Adresse auf
      der eigenen Domain, z. B. `info@clean-express.ch`.
- [ ] **Texte vom Kunden freigeben lassen**, besonders die neu geschriebenen
      (siehe Abschnitt 7).

---

## 5. Eigene Domain aufschalten

Die Seite läuft heute unter `nick8952.github.io/clean-express-website/`.
Auf `clean-express.ch` umzuziehen geht so:

1. **DNS beim Domain-Anbieter des Kunden** setzen:
   - Apex `clean-express.ch` → vier **A**-Records:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` → **CNAME** auf `nick8952.github.io`
2. Datei `public/CNAME` anlegen mit genau einer Zeile: `clean-express.ch`
3. In [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
   ```yaml
   SITE_ORIGIN: https://clean-express.ch
   BASE_PATH: ""
   ```
4. In [`public/admin/config.yml`](public/admin/config.yml) `site_url` und
   `display_url` auf `https://clean-express.ch` ändern.
5. Beim Cloudflare Worker `ALLOWED_DOMAINS` um `clean-express.ch` ergänzen,
   und in der GitHub-OAuth-App die Homepage-URL nachziehen.
6. Repo → **Settings → Pages → Custom domain** eintragen, DNS-Prüfung abwarten,
   dann **Enforce HTTPS** anhaken.
7. Demo-Modus aus (Abschnitt 4).

> Die Umstellung braucht Zugriff auf die DNS-Einstellungen der Kundendomain
> `clean-express.ch`. Ohne diesen Zugriff bleibt die Seite unter der
> GitHub-Pages-URL – das funktioniert vollständig, sieht in der Adresszeile
> nur weniger schön aus.

---

## 6. Wenn etwas nicht funktioniert

**Änderung im CMS ist nach ein paar Minuten nicht sichtbar**
Repo → Reiter **Actions**. Läuft der oberste Eintrag noch (gelber Punkt), einfach
warten. Ist er rot, den Eintrag öffnen – die Fehlermeldung steht im Schritt `npm run build`.
Meist ist ein Pflichtfeld leer geblieben. Im CMS zurücksetzen und neu speichern.

**Login unter /admin/ schlägt fehl**
Fast immer stimmt eine der drei URLs nicht überein: `base_url` in `config.yml`,
die **Authorization callback URL** in der GitHub-OAuth-App, oder `ALLOWED_DOMAINS`
im Worker. Alle drei müssen zusammenpassen (Abschnitt 1).

**Seite nach Umzug auf eigene Domain ohne Bilder/Stile**
`BASE_PATH` in `deploy.yml` passt nicht zur URL. Bei eigener Domain muss er leer
sein (`""`), bei GitHub Pages `/clean-express-website`.

**Formular verschickt nichts**
Schlüssel in den Firmendaten prüfen. Wenn er stimmt: bei Web3Forms einloggen und
schauen, ob das Monatskontingent aufgebraucht ist.

**Seite ist bei Google nicht zu finden**
Demo-Modus noch an (Abschnitt 4). Nach dem Ausschalten dauert es einige Tage;
beschleunigen lässt es sich über die Google Search Console.

**Die ganze Seite ist weg**
Der Quellcode liegt vollständig im Repository. `npm install && npm run build`
erzeugt sie neu; jeder Webhoster kann den Inhalt von `out/` ausliefern.
Es gibt keine Datenbank, die verloren gehen könnte.

---

## 7. Was vom Original übernommen wurde – und was neu ist

**Wörtlich vom Original übernommen** (clean-express.ch)
Firmenname, Adresse, Telefon, E-Mail, alle fünf Leistungsbeschreibungen samt
Aufzählung bei der Unterhaltsreinigung, der komplette Über-uns-Text (Gründung
durch Besnik Avdilji, April 2006, Werdegang bei Kübler Reinigung / Erwin Jakober
AG / Clean-Service AG), sowie alle fünf Referenzen mit Firma, Adresse, Leistung
und 5-Sterne-Bewertung.

**Stillschweigend korrigiert** (offensichtliche Tippfehler der Originalseite)
„Bimensdorf" → „Birmensdorf" (Koordinaten der Adresse per OpenStreetMap
geprüft: 47.35799 N, 8.45674 O, das ist Birmensdorf ZH). „Glatbachstrasse" →
„Glattbachstrasse". „Banhofstrasse" → „Bahnhofstrasse". „Geräteplege" →
„Gerätepflege". „pünklich"/„Abgabegaratie" → „pünktlich"/„Abgabegarantie".
Die veraltete Schreibweise „FirmenkundInnen" wurde zu „Firmenkundinnen und
Firmenkunden" ausgeschrieben.

**Original-Logo und Diamant** (nachträglich ergänzt, nach Fahrzeugfoto von Nick)
Das echte Original-Logo (`public/img/logo-original.png`, 1:1 von
clean-express.ch) steht jetzt in der Kopfzeile. Der facettierte Diamant von
den Firmenfahrzeugen ist als eigene Vektorgrafik nachgebaut
(`components/DiamondMark.tsx`, kein Rasterbild – druckscharf, mit dezentem
Glanz-Sweep) und erscheint als Markenzeichen in Kopfzeile, Fusszeile, Favicon
und im Über-uns-Abschnitt. Im dunklen Footer trägt aus Kontrastgründen eine
typografische Variante des Namens weiter (das navyblaue Original-Logo wäre
auf dunklem Grund kaum lesbar) – der Diamant bleibt aber auch dort sichtbar.

**Neu entdeckt** (Fahrzeugfoto): eine **Mobil-/Natel-Nummer 079 830 16 83**,
die auf der Original-Website nicht stand. Jetzt auf der Kontaktseite, im
Formular-Kontext und in den strukturierten Daten (JSON-LD) ergänzt. Ob diese
Nummer auch für WhatsApp genutzt wird, müsste der Kunde bestätigen – dann
liesse sich der Anruf-Knopf im Header leicht auf einen `wa.me`-Link umstellen.

**Bewusst nicht übernommen**
Die dekorativen Formen der Originalseite (abstrakte PNG/SVG-Grafiken ohne
inhaltlichen Bezug) wurden nicht übernommen; die Original-Website hatte auch
sonst keine echten Foto-Inhalte (kein Team- oder Referenzbild) – die neue
Seite arbeitet deshalb bewusst mit Typografie, eigens gezeichneten Icons und
dem interaktiven Wasser-Hero statt mit Stockfotos.

**Neu geschrieben oder ergänzt – vor dem Go-Live vom Kunden freigeben lassen**
- Die Kennzahlenzeile und die CTA-Texte auf der Startseite
- Der Werdegang als eigene Stationen-Liste (Jahreszahlen aus dem Über-uns-Text
  des Originals abgeleitet)
- Impressum und Datenschutzerklärung (das Original hatte beides nicht – für eine
  Schweizer Firmenwebsite sind beide nötig; UID/MWST-Nummer ist ein Platzhalter,
  siehe Abschnitt 4)
- Das Einsatzgebiet „Zürich und Umgebung" ist aus den Referenz-Adressen
  abgeleitet (alle liegen im Grossraum Zürich), nicht wörtlich vom Original

**Design**
Richtung „Klinisch-Frisch": Weiss/Papier-Grund, Original-Kobaltblau `#0132AF`
und -Hellblau `#628FFF` (aus dem CSS von clean-express.ch), ergänzt um einen
neuen Mint-Frischeakzent `#17C9AA`. Glaskarten (Glasmorphismus) für Inhalte auf
dem Wasser-Hero. Schriftpaar Manrope (Display) + Plus Jakarta Sans (Fliesstext)
+ Space Mono (Auszeichnungen).

**3D/Bewegung** – bewusst als Canvas 2D statt WebGL umgesetzt (siehe
`components/WaterHero.tsx`): ein interaktiver Wasser-/Blasen-Hintergrund auf
der Startseite, der auf Mausbewegung reagiert (Blasen weichen aus, Klick/Tap
erzeugt einen Ring), plus 3D-Tilt-Karten (reines CSS-`perspective`/`rotateX`/
`rotateY`) bei Leistungen und Referenzen. Canvas 2D statt WebGL, damit auf
unbekannter Kundenhardware (z. B. gesperrte GPU in einer Firmenumgebung) nichts
schwarz bleiben kann – optisch ist der Unterschied zu einer WebGL-Lösung für
diesen Einsatzzweck nicht wahrnehmbar. Alles respektiert
`prefers-reduced-motion` und pausiert ausserhalb des Bildschirms.

---

## 8. Wer was besitzt

| | |
|---|---|
| Repository | `github.com/Nick8952/clean-express-website` (öffentlich – GitHub Pages verlangt das bei Gratis-Konten) |
| Hosting | GitHub Pages, gratis, keine Laufzeit |
| Domain | `clean-express.ch` gehört dem Kunden (Registrar prüfen) |
| Schriften | Manrope, Plus Jakarta Sans, Space Mono – Open Font License, frei nutzbar |
| Cloudflare Worker | nur für den CMS-Login, gratis |
| Web3Forms | Gratis-Tarif, 250 Nachrichten pro Monat |

**Laufende Kosten: keine, ausser der Domain.**

Damit der Kunde die Seite unabhängig weiterbetreiben kann, sollte das Repository
irgendwann auf sein eigenes GitHub-Konto übertragen werden
(Repo → **Settings → Transfer ownership**). Danach in `config.yml`, `deploy.yml`
und in der OAuth-App den Kontonamen nachziehen.
