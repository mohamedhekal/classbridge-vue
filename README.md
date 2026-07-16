# @classbridge/vue

Vue 3 component library for ClassBridge Learning Stage — amphitheater classroom UI with RTL support.

## Install

```bash
npm install @classbridge/vue @classbridge/sdk vue
```

## Usage

```vue
<script setup lang="ts">
import { ClassBridgeRoom } from '@classbridge/vue';
import '@classbridge/vue/style.css';
</script>

<template>
  <ClassBridgeRoom
    :session-id="sessionId"
    layout="lecture"
    locale="ar"
    direction="rtl"
    role="student"
    display-name="Ahmed"
    api-url="https://api.classbridge.example"
    token="your-jwt-token"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sessionId` | `string` | required | Session identifier |
| `token` | `string` | — | Auth token |
| `apiUrl` | `string` | — | API base URL |
| `layout` | `LayoutMode` | `'lecture'` | `lecture \| whiteboard \| screen \| grid \| audioOnly` |
| `locale` | `string` | `'en'` | HTML lang attribute |
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction with logical CSS |
| `role` | `'teacher' \| 'student'` | `'student'` | User role |
| `displayName` | `string` | `'Guest'` | Display name |

## Design System

The Learning Stage design uses:

- **Colors**: Deep ink `#0E1A24`, chalk white `#F4F7F5`, signal teal `#1FA6A0`, warm amber `#E8A54B`
- **Typography**: Fraunces (display) + IBM Plex Sans Arabic (UI)
- **CSS variable**: `--cb-primary` (overridable for branding)

## Components

- `ClassBridgeRoom` — Main shell
- `StageCanvas` — Dominant stage area
- `ParticipantRail` — Student gallery
- `WaitingLobby` — Device check + waiting
- `TeacherDock` — Teacher controls
- `SignalBar` — Reactions + raise hand
- `ChatDrawer` — Mobile drawer / desktop panel
- And more…

## Playground

```bash
cd classbridge-vue
npm install
npm run playground
```

## License

MIT © Mohamed Hekal 2026

---

## Product Vision

Learning Stage UI for live teaching, engagement, and collaboration.

<p align="center">
  <img src="../classbridge/docs/assets/marketing/all-in-one-classroom.png" width="49%" alt="ClassBridge all-in-one virtual classroom">
  <img src="../classbridge/docs/assets/marketing/teacher-controls.png" width="49%" alt="ClassBridge teacher controls">
</p>

<p align="center">
  <img src="../classbridge/docs/assets/marketing/student-engagement.png" width="49%" alt="ClassBridge student engagement tools">
  <img src="../classbridge/docs/assets/marketing/teaching-whiteboard.png" width="49%" alt="ClassBridge teaching whiteboard">
</p>

## Monorepo development

When working inside the ClassBridge monorepo, point dependencies at sibling packages instead of the registry:

```json
"@classbridge/sdk": "file:../classbridge-sdk",
"@classbridge/whiteboard": "file:../classbridge-whiteboard"
```

Published releases on npm use `^0.1.0` semver ranges.
