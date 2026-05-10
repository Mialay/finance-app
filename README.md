# Finance App

Eine private Finanzübersicht für Haushalt, Transaktionen, Belege, Budgets,
Auswertungen, Sparpotenziale und Ziele. Das Projekt ist aktuell ein
frontendnaher Prototyp mit Mockdaten und einer vorbereiteten Dashboard-Struktur.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui Basisstruktur
- lucide-react Icons
- npm mit `package-lock.json`

## Lokal Starten

Voraussetzung: Node.js und npm.

```bash
npm ci
npm run dev
```

Die App läuft danach unter:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

- `dev`: startet den lokalen Next-Dev-Server
- `lint`: prüft den Code mit ESLint
- `build`: erstellt den Produktions-Build
- `start`: startet den Produktionsserver nach einem Build

## Routes

Die Hauptnavigation ist als echte Next.js Routes umgesetzt.

```txt
/              Übersicht
/transactions  Transaktionen
/receipts      Belege
/budgets       Budgets
/analytics     Auswertungen
/savings       Einsparpotenzial
/goals         Ziele
/settings      Einstellungen
```

Im App Router wird eine Route über einen Ordner mit `page.tsx` definiert,
zum Beispiel `app/transactions/page.tsx` für `/transactions`.

## Projektstruktur

```txt
app/
  page.tsx                  Übersicht
  transactions/page.tsx     Transaktionen
  receipts/page.tsx         Belege
  budgets/page.tsx          Budgets
  analytics/page.tsx        Auswertungen
  savings/page.tsx          Einsparpotenzial
  goals/page.tsx            Ziele
  settings/page.tsx         Einstellungen
  layout.tsx                globales Root Layout

components/
  dashboard/
    dashboard-shell.tsx     Sidebar, Header, Mobile Nav, App-Rahmen
    placeholder-page.tsx    einfacher Platzhalter für neue Seiten
  ui/                       wiederverwendbare UI-Basiskomponenten

lib/
  utils.ts                  kleine Hilfsfunktionen

public/
  sw.js                     Service Worker
```

## Konventionen

- Hauptbereiche in der Sidebar sind eigene Routes.
- Wiederverwendbare Layout-Elemente liegen unter `components/dashboard`.
- Fachliche Komponenten können später pro Bereich gruppiert werden, zum Beispiel
  `components/transactions/transaction-list.tsx`.
- Kommentare im Code bleiben sparsam und erklären nur Verhalten, das nicht direkt
  aus Namen und Struktur ersichtlich ist.
- Aktuell sind Finanzwerte, Transaktionen und Auswertungen Mockdaten.

## Nicht Committen

Die `.gitignore` schließt lokale und generierte Dateien aus. Ins Repo gehören
insbesondere nicht:

- `node_modules/`
- `.next/`
- `next-env.d.ts`
- `.env` und andere lokale Secret-Dateien
- Logs, Coverage, Test-Reports und Cache-Verzeichnisse

Für einen frischen Checkout sollten `package.json` und `package-lock.json`
committed bleiben, damit `npm ci` reproduzierbar funktioniert.
