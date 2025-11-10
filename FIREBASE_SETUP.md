# Firebase Firestore Setup für Kontaktanfragen

Diese Anleitung erklärt, wie du Firebase Firestore einrichtest, um Kontaktanfragen zentral zu speichern (statt in localStorage).

## 1. Firebase-Projekt erstellen

1. Gehe zu [Firebase Console](https://console.firebase.google.com/)
2. Klicke auf "Add project" oder wähle ein bestehendes Projekt
3. Gib deinem Projekt einen Namen (z.B. "MAPSOL")
4. Folge den Anweisungen (Google Analytics ist optional)

## 2. Firestore Database erstellen

1. Im Firebase Console, gehe zu "Firestore Database"
2. Klicke auf "Create database"
3. Wähle "Start in test mode" (für Entwicklung) oder "Start in production mode" (für Produktion)
4. Wähle eine Region (z.B. "europe-west" für bessere Performance in Europa)
5. Klicke auf "Enable"

## 3. Firestore Security Rules einrichten

1. Gehe zu "Firestore Database" → "Rules"
2. Ersetze die Rules mit folgendem Code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kontaktanfragen: Jeder kann lesen und schreiben (für öffentliches Kontaktformular)
    // In Produktion solltest du das einschränken!
    match /contactRequests/{requestId} {
      allow read, write: if true;
    }
  }
}
```

**WICHTIG für Produktion:** Für mehr Sicherheit solltest du die Rules anpassen:
- Nur authentifizierte Admins können lesen
- Jeder kann schreiben (für Kontaktformular)

## 4. Firebase-Konfiguration abrufen

1. Im Firebase Console, gehe zu "Project Settings" (Zahnrad-Symbol)
2. Scrolle nach unten zu "Your apps"
3. Klicke auf das Web-Symbol (`</>`) um eine Web-App hinzuzufügen
4. Gib einen App-Namen ein (z.B. "MAPSOL Web")
5. Kopiere die Firebase-Konfiguration (sie sieht so aus):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## 5. .env-Datei erstellen

Erstelle eine `.env`-Datei im Root-Verzeichnis deines Projekts:

```bash
REACT_APP_FIREBASE_API_KEY=deine_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=dein_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=dein_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=dein_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=deine_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=deine_app_id
```

**WICHTIG:** Die `.env`-Datei ist bereits in `.gitignore` und wird nicht ins Repository committed.

## 6. Firebase-Konfiguration aktualisieren

Öffne `src/firebase/config.js` und ersetze die Platzhalter mit deinen Werten aus der `.env`-Datei.

Die Datei verwendet bereits `process.env.REACT_APP_*` Variablen, also sollten die Werte automatisch aus der `.env`-Datei geladen werden.

## 7. Firestore Index erstellen (falls nötig)

Wenn du Filter oder Sortierungen verwendest, musst du möglicherweise einen Index erstellen:

1. Gehe zu "Firestore Database" → "Indexes"
2. Wenn du eine Fehlermeldung siehst, klicke auf den Link zum Erstellen des Index
3. Der Index wird automatisch erstellt

## 8. Testen

1. Starte deine React-Anwendung: `npm start`
2. Fülle das Kontaktformular aus und sende es ab
3. Gehe zum Admin-Dashboard (`/admin`)
4. Die Anfrage sollte jetzt in Firestore gespeichert sein und von überall aus sichtbar sein

## Vorteile von Firestore

- ✅ Zentrale Datenbank (alle Browser sehen die gleichen Daten)
- ✅ Echtzeit-Updates (neue Anfragen erscheinen automatisch)
- ✅ Keine Browser-Abhängigkeit mehr
- ✅ Skalierbar für viele Anfragen
- ✅ Kostenloser Plan (50.000 Reads, 20.000 Writes pro Tag)

## Wichtige Hinweise

- Der kostenlose Firebase-Plan ist für die meisten Projekte ausreichend
- Firestore Security Rules sollten für Produktion angepasst werden
- Die `.env`-Datei sollte niemals ins Repository committed werden
- Bei Problemen prüfe die Browser-Konsole auf Fehlermeldungen

