# mapsol.ch — Website Audit (Stand: Juni 2026)

## Gesamturteil
Die Website **sieht gut aus**, aber die **Botschaft und Angebote widersprechen sich**. Ein Besucher weiss nach 30 Sekunden nicht genau: Was kauf ich? Was kostet es? Ist das echt?

**Priorität: Klarheit vor Schönheit.**

---

## Kritisch (sofort fixen)

### 1. Angebot widerspricht sich
| Ort | Was steht da | Problem |
|-----|--------------|---------|
| Services | Web + **n8n/make.com Automatisierung** | Das willst du verkaufen |
| Preise (`Preise.js`) | Web + **AI Chatbots** | Route ist **auskommentiert** in App.js — Seite nicht erreichbar |
| Projekte | Fake Kunden (StyleBoutique, ImmoFinder…) | **Vertrauens-Killer** wenn jemand nachfragt |
| Hero | Rotiert „n8n-Integrationen“ | Zu technisch / zu nischig für Erstkontakt |

**Fix:**
- EIN klares Hauptangebot auf der Startseite: **Website** oder **„Website + Automatisierung“**
- Projekte-Seite: nur **echte Demos** (deine `/demos`) oder „Coming soon / Referenzen in Arbeit“
- Preise: entweder reaktivieren mit **richtigen Paketen** oder komplett durch „Kostenloses Erstgespräch“ ersetzen

### 2. Wichtige Seiten versteckt
Navbar zeigt nur: Home, Services, Demos, Kontakt

**Nicht in Navbar:** Über uns, Projekte, Preise (deaktiviert)

**Fix:** Navbar erweitern oder Footer-Links prominenter. Mindestens **„Über uns“** + klarer CTA **„Angebot anfragen“**.

### 3. Kein Slogan / keine MAPSOL-Bedeutung
LinkedIn: *Modern AI Platform Solutions*  
Website Hero: nur „MAPSOL“ + rotierende Wörter

**Fix:** Unter dem Namen ein fester Slogan:
```
Modern AI Platform Solutions
Webentwicklung & Prozessautomatisierung aus Zürich
```

### 4. Falsche / placeholder Daten
- Schema.org Telefon: `+41-XXX-XXX-XXX` → echte Nummer (`+41 76 310 15 12`)
- Home: „10+ Projekte“ → nur wenn stimmt, sonst weg
- og-image.jpg — prüfen ob existiert

### 5. Design-Inkonsistenz
- Kontakt-Seite: lila/grüner Gradient — **nicht** MAPSOL Blau/Orange
- Preise-Seite: rosa/lila Gradient — gleiches Problem

---

## Mittel (Phase 1b)

### 6. Automatisierung nicht productisiert
Services beschreiben Automatisierung gut, aber:
- Kein Preis
- Kein „So läuft's ab“
- Kein konkretes Beispiel („Rechnung → CRM → E-Mail in 1 Klick“)

**Fix:** Eigene Sektion oder Landing:
- **„Automatisierungs-Audit“** CHF 500 (2h Analyse)
- **„Workflow-Paket“** ab CHF 3'000
- 3 konkrete Use Cases (Lead-Erfassung, Rechnungsflow, Terminbuchung)

### 7. Demos vs. Projekte verwirrend
- `/demos` = echte Demo-Websites ✅ gut
- `/projekte` = erfundene Case Studies ❌ schlecht

**Fix:** Projekte umbenennen zu „Showcase“ und nur Demos verlinken, ODER Projekte-Route entfernen.

### 8. CTA zu schwach
Überall „Kontakt“ — besser:
- „Kostenloses Erstgespräch (15 Min)“
- „Website-Angebot anfragen“
- „Automatisierung besprechen“

---

## Nice to have (später)
- Testimonials (echt)
- Blog / LinkedIn Feed einbetten
- Calendly-Link für Buchung
- Englische Version
- Case Study: eigenes SmartGarden als „wir bauen auch Produkte“

---

## Konkrete Dateien zum Anfassen

| Task | Datei |
|------|-------|
| Hero + Slogan | `src/pages/Home.js` |
| Navbar Links | `src/components/Navbar.js` |
| Fake Projekte fixen | `src/pages/Projekte.js` |
| Preise reaktivieren/ersetzen | `src/App.js`, `src/pages/Preise.js` |
| Telefon Schema | `src/pages/Home.js` (JSON-LD) |
| Kontakt Farben | `src/pages/Kontakt.js` |
| „10+ Projekte“ | `src/pages/Home.js` |
