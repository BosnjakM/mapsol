# Firebase Authentication Setup für Admin-Login

Diese Anleitung erklärt, wie du Firebase Authentication für das sichere Admin-Login einrichtest.

## Warum Firebase Authentication?

✅ **Viel sicherer** als hardcodierte Passwörter im Code
✅ **Bcrypt-Hashing** - Passwörter werden sicher gespeichert
✅ **Automatisches Session-Management** - keine manuelle Token-Verwaltung
✅ **Sicherheitsfeatures** - Rate Limiting, Brute-Force-Schutz
✅ **Firestore Security Rules** können Auth-Status prüfen

## 1. Firebase Authentication aktivieren

1. Gehe zur [Firebase Console](https://console.firebase.google.com/)
2. Wähle dein Projekt aus (z.B. "mapsol-7e43e")
3. Klicke auf "Authentication" im linken Menü
4. Klicke auf "Get started"
5. Gehe zum Tab "Sign-in method"
6. Aktiviere "Email/Password" als Sign-in provider:
   - Klicke auf "Email/Password"
   - Aktiviere "Enable"
   - Klicke auf "Save"

## 2. Admin-User erstellen

### Option A: Über Firebase Console (empfohlen für ersten User)

1. Gehe zu "Authentication" → "Users"
2. Klicke auf "Add user"
3. Gib eine E-Mail-Adresse ein (z.B. `admin@mapsol.de`)
4. Gib ein sicheres Passwort ein (mindestens 6 Zeichen)
5. Klicke auf "Add user"

**WICHTIG:** Notiere dir die E-Mail-Adresse und das Passwort!

### Option B: Über die App (für zusätzliche Admins)

1. Starte die App: `npm start`
2. Gehe zu `/admin/login`
3. Klicke auf "Registrieren" (falls du eine Registrierungsfunktion hinzufügst)
4. Oder verwende die Firebase Console wie oben beschrieben

## 3. Firestore Security Rules aktualisieren

Aktualisiere die Firestore Security Rules, damit nur authentifizierte Admins auf die Kontaktanfragen zugreifen können:

1. Gehe zu "Firestore Database" → "Rules"
2. Ersetze die Rules mit folgendem Code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kontaktanfragen: Jeder kann schreiben (für öffentliches Kontaktformular)
    // Nur authentifizierte Admins können lesen
    match /contactRequests/{requestId} {
      allow read: if request.auth != null; // Nur eingeloggte User können lesen
      allow write: if true; // Jeder kann Kontaktanfragen erstellen
    }
    
    // Optional: Admin-Collection für zusätzliche Admin-Daten
    match /admins/{adminId} {
      allow read, write: if request.auth != null && request.auth.uid == adminId;
    }
  }
}
```

## 4. Login testen

1. Starte die App: `npm start`
2. Gehe zu `http://localhost:3001/admin/login`
3. Gib die E-Mail-Adresse und das Passwort ein, die du in Schritt 2 erstellt hast
4. Du solltest zum Admin-Dashboard weitergeleitet werden

## 5. Passwort zurücksetzen (falls nötig)

Falls du das Passwort vergessen hast:

1. Gehe zur Firebase Console → "Authentication" → "Users"
2. Klicke auf den User
3. Klicke auf "Reset password"
4. Eine E-Mail wird an die registrierte E-Mail-Adresse gesendet

## Sicherheitshinweise

✅ **Nie Passwörter im Code speichern** - Firebase Auth verwaltet das sicher
✅ **Starke Passwörter verwenden** - mindestens 12 Zeichen, Groß-/Kleinbuchstaben, Zahlen, Sonderzeichen
✅ **Firestore Security Rules** - stellen sicher, dass nur Admins Daten lesen können
✅ **Regelmäßige Passwort-Updates** - ändere Passwörter regelmäßig
✅ **Zwei-Faktor-Authentifizierung** - optional in Firebase Console aktivierbar

## Vorteile gegenüber der alten Lösung

| Alte Lösung | Firebase Auth |
|------------|---------------|
| ❌ Passwort im Code hardcodiert | ✅ Passwort sicher in Firebase gespeichert |
| ❌ SHA-256 Hash (unsicher für Passwörter) | ✅ Bcrypt (sicher für Passwörter) |
| ❌ Manuelle Session-Verwaltung | ✅ Automatisches Session-Management |
| ❌ Kein Brute-Force-Schutz | ✅ Automatischer Schutz |
| ❌ Jeder kann Code sehen | ✅ Keine Credentials im Code |

## Troubleshooting

**Problem:** "User not found" oder "Wrong password"
- Lösung: Prüfe, ob der User in Firebase Console existiert
- Lösung: Prüfe E-Mail-Adresse und Passwort

**Problem:** "Too many requests"
- Lösung: Warte ein paar Minuten und versuche es erneut
- Firebase hat automatischen Brute-Force-Schutz aktiviert

**Problem:** Login funktioniert nicht
- Lösung: Prüfe Browser-Konsole auf Fehlermeldungen
- Lösung: Prüfe, ob Firebase Authentication aktiviert ist
- Lösung: Prüfe Firebase-Konfiguration in `src/firebase/config.js`

