# SmartWake Web App

Web application for **SmartWake**, implemented from the team's Figma mockups.

Course project for MISW-4302 (UX) — Maestría en Ingeniería de Software, Universidad de los Andes.

## Stack

- [Vite](https://vite.dev) + React + TypeScript
- [Material UI](https://mui.com/material-ui/) v9 with a custom theme built from the Figma "M3 Warm Dawn" color tokens (`src/theme.ts`)
- Plus Jakarta Sans via `@fontsource/plus-jakarta-sans`
- [React Router](https://reactrouter.com) v8

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (type-check + production build), `npm run lint` (oxlint), `npm run preview`.

## Screens

| Screen | Route | Figma node | Code |
| --- | --- | --- | --- |
| Vincular Dispositivo | `/vincular` (start of the flow; `/` redirects here) | `310:915` | `src/features/link-device/` |
| Gestión de Alarmas — Todas | `/alarmas` | `310:1604` | `src/features/alarms/` |
| Gestión de Alarmas — Activas | `/alarmas?estado=activas` | `337:1286` | `src/features/alarms/` |
| Gestión de Alarmas — Pausadas | `/alarmas?estado=pausadas` | `337:1645` | `src/features/alarms/` |
| Gestión de Tareas (Colecciones) | `/colecciones` | `310:993`, after creating a task `363:348`, after creating a tag `363:497` | `src/features/tasks/` |
| Agregar tarea independiente (dialog) | `/colecciones` | `319:10612` (adapted to the design system) | `src/features/tasks/AddTaskDialog.tsx` |
| Nueva etiqueta (dialog) | `/colecciones` | `343:777` | `src/features/tasks/CreateTagDialog.tsx` |
| Ubicaciones, Estadísticas | `/ubicaciones`, `/estadisticas` | — | Placeholder (`src/features/coming-soon/`) |

The signed-in screens share `src/layout/AppShell.tsx`: the navigation drawer from the Figma frames on desktop, and a bottom navigation bar below 900px.

Mock data until the backend exists:

- Pairing (`src/features/link-device/pairingService.ts`): `SW-4829` pairs successfully and opens the alarms dashboard; any other valid `SW-XXXX` code returns "no encontrado".
- Alarms (`src/features/alarms/mockAlarms.ts`): the four alarms shown in the Figma frames.
- Tasks and tags (`src/features/tasks/tasksStore.ts`): in-memory store seeded with the Figma data. New tags and independent tasks persist while navigating, and reset on page reload.
