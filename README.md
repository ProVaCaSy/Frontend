# Frontend

Vue 3, Vite, Tailwind CSS, Pinia, Vue Router, keycloak-js, FullCalendar 7 (mit temporal-polyfill).
Aufbau nach Abschnitt 5.2.3 der Dokumentation.

```
src/
├── main.ts            Anmeldung initialisieren, dann App mounten
├── App.vue            Rahmen (AppShell) für Nutzer mit Rolle, sonst nur die Seite
├── style.css          Tailwind, HSE-Farben, Hell/Dunkel
├── assets/            Logo
├── router/            index.ts, guards.ts, navigation.ts
├── views/             Welcome, Calendar, Overview, Applications, Stats
├── components/        AppShell, AbsenceForm, PersonPicker, StatsChart,
│                      Modal, StatusBadge, YearSwitch, ExportButton, ThemeToggle,
│                      WelcomeScreen, LoginScreen, AppIcon, TeamKalender (FullCalendar 7)
├── composables/       useHolidays, useTheme, useAbsenceForm
├── stores/            auth, vacations (Pinia)
├── services/          keycloak.ts, api.ts, vacationService, userService, config.ts
│   └── generated/     aus api/openapi.yaml erzeugt, nicht eingecheckt
├── utils/             dates, workdays, csv, access, icons, styles
├── mocks/             Mock-Daten (Benutzer, Abwesenheiten, Feiertage), nur von services genutzt
└── types/             User, Vacation, Status, Kind, Draft, Range
tests/unit/            Vitest
```

Abhängigkeiten zwischen den Paketen: router → views, stores; views → components,
composables, stores; components → composables; composables → stores; stores → services.
Utils, types und assets dürfen alle Pakete nutzen.
Nur `services` spricht mit Keycloak und dem Backend.

## Start ohne Keycloak und Backend

```
npm install
npm run dev               # http://localhost:5173, Mock-Modus ist in .env.development eingeschaltet
```

Im Mock-Modus liefern die Services Daten aus `src/mocks/` (Benutzer mit Rollen, Abwesenheiten, Feiertage).
Auf der Startseite wählt man einen Mock-Benutzer, um die Rollen zu testen. Die Auswahl
bleibt bis zum Schließen des Tabs erhalten. Nur `services/` kennt den Mock-Modus.

## Anbindung an Keycloak und Backend

1. `.env.example` nach `.env.local` kopieren (wird nicht eingecheckt) und die `VITE_KEYCLOAK_*`-Werte eintragen.
   `VITE_USE_MOCKS=false` schaltet den Mock-Modus ab. Der Dev-Server leitet `/api` an `http://localhost:8080` weiter.
2. `npm run generate:api` erzeugt den Client aus der OpenAPI-Datei (benötigt Java). Danach die Services
   (`userService`, `vacationService`) auf den generierten Client umstellen.
3. Rollennamen in `src/utils/access.ts` an Keycloak anpassen.

Der Produktions-Build (`npm run build`) nutzt `.env.production` und läuft ohne Mock-Modus.

## Weitere Befehle

```
npm run type-check
npm test
npm run generate:api
```
