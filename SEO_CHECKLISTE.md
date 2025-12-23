# SEO-Checkliste für MAPSOL

## ✅ Bereits implementiert

### Grundlagen
- ✅ HTML lang="de" (Deutsch)
- ✅ Meta-Description für alle Seiten
- ✅ Meta-Keywords
- ✅ robots.txt erstellt
- ✅ sitemap.xml erstellt
- ✅ Helmet für dynamische Meta-Tags

### Home-Seite
- ✅ Open Graph Tags (Facebook)
- ✅ Twitter Cards
- ✅ Structured Data (JSON-LD) für LocalBusiness
- ✅ Canonical URL

## ⚠️ Noch zu tun (vor Marketing-Start)

### 1. WICHTIG: Domain-spezifische Anpassungen

**In folgenden Dateien musst du `mapsol.ch` durch deine echte Domain ersetzen:**
- `public/sitemap.xml` - Alle URLs
- `src/pages/Home.js` - Open Graph URLs, Canonical URLs
- `public/robots.txt` - Sitemap URL

**Suche nach:** `https://mapsol.ch` und ersetze mit deiner Domain

### 2. Kontaktdaten aktualisieren

**In `src/pages/Home.js` (Structured Data):**
- ❌ Telefonnummer: `+41-XXX-XXX-XXX` → Deine echte Nummer
- ❌ Adresse: Prüfe ob Zürich korrekt ist
- ❌ Geo-Koordinaten: Prüfe ob korrekt
- ❌ Social Media Links: LinkedIn, GitHub → Deine echten Links

### 3. Open Graph Image erstellen

**Benötigt:**
- Ein Bild für Social Media (1200x630px)
- Name: `og-image.jpg`
- Speichern in: `public/og-image.jpg`
- Oder URL in `Home.js` anpassen

**Was sollte drauf sein:**
- Logo
- Firmenname
- Kurzer Slogan
- Professionelles Design

### 4. Google Search Console einrichten

**Schritte:**
1. Gehe zu [Google Search Console](https://search.google.com/search-console)
2. Füge deine Website hinzu
3. Verifiziere die Website (HTML-Tag oder DNS)
4. Sende die sitemap.xml ein: `https://deine-domain.ch/sitemap.xml`

### 5. Google Analytics einrichten (optional aber empfohlen)

**Schritte:**
1. Erstelle Google Analytics 4 Property
2. Füge Tracking-Code in `public/index.html` ein
3. Oder verwende Google Tag Manager

### 6. Performance optimieren

**Prüfen:**
- ✅ Bilder optimieren (WebP Format)
- ✅ Lazy Loading für Bilder
- ✅ Code Splitting (React macht das automatisch)
- ✅ Gzip/Brotli Kompression (Hosting-Provider)

### 7. Mobile-First prüfen

**Testen:**
- ✅ Responsive Design auf verschiedenen Geräten
- ✅ Mobile PageSpeed testen: [PageSpeed Insights](https://pagespeed.web.dev/)
- ✅ Ziel: Score über 90

### 8. SSL-Zertifikat

**Wichtig:**
- ✅ HTTPS muss aktiv sein
- ✅ Alle Links müssen HTTPS verwenden
- ✅ Mixed Content vermeiden

## 📊 SEO-Score vor Marketing

**Bevor du mit Marketing startest, prüfe:**

1. **Google PageSpeed Insights:**
   - URL: https://pagespeed.web.dev/
   - Ziel: Score > 90 (Desktop & Mobile)

2. **Google Rich Results Test:**
   - URL: https://search.google.com/test/rich-results
   - Prüfe ob Structured Data korrekt ist

3. **Mobile-Friendly Test:**
   - URL: https://search.google.com/test/mobile-friendly
   - Sollte "Mobile-friendly" anzeigen

4. **Meta Tags Checker:**
   - URL: https://www.opengraph.xyz/
   - Prüfe Open Graph Tags

## 🎯 Marketing-Empfehlung

### Mit 50-100€ Budget:

**Option 1: Google Ads (empfohlen)**
- ✅ Sofort sichtbar
- ✅ Gute Conversion-Rate
- ✅ Lokale Zielgruppe möglich
- ⚠️ Budget schnell aufgebraucht

**Option 2: Facebook/Instagram Ads**
- ✅ Gute Reichweite
- ✅ Visuell ansprechend
- ✅ Günstiger als Google Ads
- ⚠️ Weniger direkte Conversions

**Option 3: Kombination**
- 60€ Google Ads (Suchmaschinen)
- 40€ Facebook Ads (Awareness)

### Wichtig vor Marketing-Start:

1. ✅ **Landing Page optimieren** - Klare Call-to-Actions
2. ✅ **Kontaktformular testen** - Funktioniert es?
3. ✅ **Tracking einrichten** - Woher kommen die Leads?
4. ✅ **Conversion-Ziele definieren** - Was ist ein Erfolg?

## 📝 Quick-Win SEO-Verbesserungen

### Noch heute umsetzbar:

1. **Alt-Texte für Bilder hinzufügen**
   - Alle Bilder sollten beschreibende Alt-Texte haben
   - Beispiel: `alt="MAPSOL Webentwicklung Services"`

2. **Interne Verlinkung**
   - Links zwischen Seiten (z.B. Services → Kontakt)
   - Verbessert SEO und User Experience

3. **Content erweitern**
   - Mehr Text auf Home-Seite (500+ Wörter)
   - Blog-Sektion (optional, aber sehr gut für SEO)

4. **Lokale SEO**
   - Google My Business Profil erstellen
   - Lokale Keywords verwenden (z.B. "Webentwicklung Zürich")

## ⏱️ Zeitplan

**Diese Woche (vor Marketing):**
- [ ] Domain in sitemap.xml und Home.js ersetzen
- [ ] Kontaktdaten aktualisieren
- [ ] OG-Image erstellen
- [ ] Google Search Console einrichten
- [ ] PageSpeed testen und optimieren

**Nächste Woche (Marketing-Start):**
- [ ] Google Ads Kampagne erstellen
- [ ] Tracking einrichten
- [ ] Erste Test-Kampagne starten (kleines Budget)
- [ ] Conversion-Rate messen

## 💡 Pro-Tipp

**SEO ist ein Marathon, nicht ein Sprint:**
- Marketing bringt sofort Traffic
- SEO bringt langfristig kostenlosen Traffic
- Kombiniere beides für beste Ergebnisse

**Mit 50-100€ Budget:**
- Starte mit 30-50€ für erste Tests
- Behalte 50€ für Optimierung nach ersten Daten
- Investiere parallel in SEO (kostet nur Zeit, kein Geld)

