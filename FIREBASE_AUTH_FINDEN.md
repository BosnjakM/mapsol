# Firebase Authentication finden und aktivieren

## Schritt-für-Schritt Anleitung

### 1. Öffne die Firebase Console

1. Gehe zu: **https://console.firebase.google.com/**
2. Melde dich mit deinem Google-Konto an
3. Wähle dein Projekt aus: **mapsol-7e43e** (oder das Projekt, das du verwendest)

### 2. Navigation im linken Menü

In der Firebase Console siehst du ein **linkes Menü** mit verschiedenen Optionen. Suche nach:

**Mögliche Namen für "Authentication":**
- 🔐 **"Authentication"** (meistens so genannt)
- 🔐 **"Authentifizierung"** (wenn die Sprache Deutsch ist)
- 🔐 **"Build" → "Authentication"** (manchmal unter "Build" gruppiert)

### 3. Wenn du "Authentication" nicht siehst:

**Option A: Direkter Link**
- Gehe direkt zu: **https://console.firebase.google.com/project/mapsol-7e43e/authentication**

**Option B: Über Project Overview**
1. Klicke auf das **Zahnrad-Symbol** (⚙️) oben rechts
2. Wähle **"Project settings"**
3. Im linken Menü sollte jetzt **"Authentication"** sichtbar sein

**Option C: Build-Menü erweitern**
1. Im linken Menü siehst du möglicherweise **"Build"**
2. Klicke darauf, um es zu erweitern
3. Darunter sollte **"Authentication"** sein

### 4. Authentication aktivieren

Wenn du auf "Authentication" klickst:

1. Du siehst möglicherweise eine Seite mit **"Get started"** Button
   - Klicke auf **"Get started"**

2. Oder du siehst direkt die Übersicht mit verschiedenen Tabs:
   - **"Users"** (Benutzer)
   - **"Sign-in method"** (Anmeldemethoden) ← **HIER MUSSST DU HIN!**

### 5. E-Mail/Passwort aktivieren

1. Klicke auf den Tab **"Sign-in method"** (oder "Anmeldemethoden")
2. Du siehst eine Liste mit verschiedenen Anbietern:
   - Email/Password
   - Google
   - Facebook
   - etc.

3. Klicke auf **"Email/Password"** (oder "E-Mail/Passwort")
4. Du siehst einen Schalter:
   - **Aktiviere den ersten Schalter** (Enable)
   - **Optional:** Aktiviere auch "Email link (passwordless sign-in)" wenn gewünscht
5. Klicke auf **"Save"** (Speichern)

### 6. Admin-User erstellen

Nachdem Email/Password aktiviert ist:

1. Gehe zum Tab **"Users"** (oben in der Authentication-Seite)
2. Klicke auf **"Add user"** (Benutzer hinzufügen)
3. Gib ein:
   - **E-Mail:** z.B. `admin@mapsol.de` oder `admin@deine-domain.de`
   - **Passwort:** Ein sicheres Passwort (mindestens 6 Zeichen)
4. Klicke auf **"Add user"**

**WICHTIG:** Notiere dir diese Daten!

### 7. Screenshots-Beschreibung (falls du es nicht findest)

Die Firebase Console sollte so aussehen:

```
┌─────────────────────────────────────┐
│ Firebase Console                    │
├─────────────────────────────────────┤
│                                     │
│  📊 Overview                        │
│  🔐 Authentication  ← HIER!         │
│  💾 Firestore Database              │
│  📦 Storage                         │
│  ⚡ Functions                       │
│  ...                                │
│                                     │
└─────────────────────────────────────┘
```

### 8. Alternative: Über die URL direkt

Falls du es immer noch nicht findest, gehe direkt zu:

**Für dein Projekt:**
```
https://console.firebase.google.com/project/mapsol-7e43e/authentication
```

**Oder allgemein:**
```
https://console.firebase.google.com/project/[DEINE-PROJECT-ID]/authentication
```

### 9. Prüfen ob es funktioniert

Nach der Aktivierung:

1. Gehe zurück zu deiner App: `http://localhost:3001/admin/login`
2. Versuche dich mit der erstellten E-Mail und dem Passwort anzumelden
3. Falls es nicht funktioniert, prüfe die Browser-Konsole (F12) auf Fehlermeldungen

### Troubleshooting

**Problem: "Authentication" fehlt komplett**
- Lösung: Möglicherweise ist dein Firebase-Projekt noch im "Spark Plan" (kostenlos) - das ist OK, Authentication ist verfügbar
- Lösung: Prüfe, ob du das richtige Projekt ausgewählt hast
- Lösung: Versuche die Seite zu aktualisieren (F5)

**Problem: "Get started" Button führt zu nichts**
- Lösung: Warte ein paar Sekunden, manchmal dauert die Initialisierung
- Lösung: Versuche die Seite zu aktualisieren

**Problem: Email/Password ist grau ausgegraut**
- Lösung: Prüfe, ob du die richtigen Berechtigungen hast (Projekt-Owner oder Editor)
- Lösung: Kontaktiere den Projekt-Owner

### Noch einfacher: Screenshot machen

Falls du immer noch Probleme hast:
1. Mache einen Screenshot von deiner Firebase Console
2. Zeige mir, was du siehst
3. Dann kann ich dir genau sagen, wo du klicken musst

### Direkter Link für dein Projekt

**Kopiere diesen Link und öffne ihn im Browser:**
```
https://console.firebase.google.com/project/mapsol-7e43e/authentication/users
```

Das sollte dich direkt zur User-Verwaltung bringen!

