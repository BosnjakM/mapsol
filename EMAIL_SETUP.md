# EmailJS-Setup für das Kontaktformular

Diese Anleitung erklärt, wie du EmailJS einrichtest, um das Kontaktformular auf deiner Website funktionsfähig zu machen. EmailJS ermöglicht das Versenden von E-Mails direkt vom Frontend ohne eigenen Server.

## 1. Erstelle einen EmailJS-Account

1. Besuche [EmailJS.com](https://www.emailjs.com/) und erstelle ein kostenloses Konto
2. Der kostenlose Plan erlaubt 200 E-Mails pro Monat

## 2. E-Mail-Service einrichten

1. Melde dich bei deinem EmailJS-Konto an
2. Gehe zu "Email Services" im Dashboard
3. Klicke auf "Add New Service"
4. Wähle "Gmail" als Service-Provider
5. Autorisiere EmailJS, dein Gmail-Konto zu nutzen (du musst dich mit deinem Gmail-Konto einloggen)
6. Gib dem Service einen Namen (z.B. "MAPSOL Contact")
7. Notiere dir die **Service-ID** (wird in der Kontakt.js-Datei benötigt)

## 3. E-Mail-Vorlage erstellen

1. Gehe zu "Email Templates" im Dashboard
2. Klicke auf "Create New Template"
3. Gib der Vorlage einen Namen (z.B. "Kontaktformular")
4. Gestalte die E-Mail-Vorlage. Du kannst die folgenden Variablen verwenden:
   - `{{name}}` - Name des Absenders
   - `{{email}}` - E-Mail des Absenders
   - `{{subject}}` - Betreff
   - `{{message}}` - Nachricht
5. Beispiel für den Inhalt:
   ```
   Neue Kontaktanfrage von Ihrer Website
   
   Name: {{name}}
   E-Mail: {{email}}
   Betreff: {{subject}}
   
   Nachricht:
   {{message}}
   ```
6. Speichere die Vorlage
7. Notiere dir die **Template-ID** (wird in der Kontakt.js-Datei benötigt)

## 4. Öffentlichen Schlüssel abrufen

1. Gehe zu "Account" > "API Keys" im Dashboard
2. Notiere dir den **Public Key** (wird in der Kontakt.js-Datei benötigt)

## 5. Aktualisiere die Kontakt.js-Datei

Öffne die Datei `src/pages/Kontakt.js` und aktualisiere die folgenden Zeilen mit deinen EmailJS-Daten:

```javascript
// EmailJS-Parameter
const serviceId = 'YOUR_SERVICE_ID'; // Ersetze mit deiner Service-ID von EmailJS
const templateId = 'YOUR_TEMPLATE_ID'; // Ersetze mit deiner Template-ID
const publicKey = 'YOUR_PUBLIC_KEY'; // Ersetze mit deinem Public Key
```

Ersetze:
- `YOUR_SERVICE_ID` mit der ID deines E-Mail-Services
- `YOUR_TEMPLATE_ID` mit der ID deiner E-Mail-Vorlage
- `YOUR_PUBLIC_KEY` mit deinem öffentlichen API-Schlüssel

## 6. Formularfeldnamen anpassen

Stelle sicher, dass die Namen der Formularfelder (`name`, `email`, `subject`, `message`) mit den Variablen in deiner EmailJS-Vorlage übereinstimmen.

## 7. Admin-Benachrichtigungs-Template erstellen (Optional, aber empfohlen)

Um auch eine Benachrichtigungs-E-Mail an `facility.mapsol@gmail.com` zu erhalten, wenn jemand das Kontaktformular absendet:

1. Gehe zu "Email Templates" im EmailJS-Dashboard
2. Klicke auf "Create New Template"
3. Gib der Vorlage einen Namen (z.B. "Admin Benachrichtigung")
4. Setze die E-Mail-Adresse auf `facility.mapsol@gmail.com` (im "To Email" Feld)
5. Gestalte die E-Mail-Vorlage mit folgenden Variablen:
   - `{{name}}` - Name des Absenders
   - `{{email}}` - E-Mail des Absenders
   - `{{phone}}` - Telefonnummer (falls angegeben)
   - `{{subject}}` - Betreff (wird automatisch mit "🔔 Neue Kontaktanfrage:" vorangestellt)
   - `{{message}}` - Vollständige Nachricht mit allen Details
6. Beispiel für den Inhalt:
   ```
   🔔 Neue Kontaktanfrage von mapsol.ch
   
   Name: {{name}}
   E-Mail: {{email}}
   Telefon: {{phone}}
   
   Betreff: {{subject}}
   
   Nachricht:
   {{message}}
   ```
7. Speichere die Vorlage
8. Notiere dir die **Template-ID** und aktualisiere `adminTemplateId` in `src/pages/Kontakt.js` (Zeile 161)

**Alternative:** Du kannst auch das bestehende Template verwenden, aber dann musst du sicherstellen, dass es an beide E-Mail-Adressen sendet (Kunde und Admin).

## 8. Testen

Starte deine React-Anwendung und teste das Kontaktformular. Überprüfe, ob:
- Die Bestätigungs-E-Mail beim Kunden ankommt
- Die Benachrichtigungs-E-Mail an `facility.mapsol@gmail.com` ankommt

## Wichtige Hinweise

- Die kostenlose Version von EmailJS hat ein Limit von 200 E-Mails pro Monat
- Halte deine API-Schlüssel privat (nicht in öffentlichen Repositories einchecken)
- Bei Problemen prüfe die Konsole auf Fehlermeldungen
- Falls du mehrere Empfänger hinzufügen möchtest, kannst du das in den EmailJS-Vorlageneinstellungen konfigurieren
- Jede Kontaktanfrage wird automatisch im Admin-Dashboard unter `/admin` gespeichert 