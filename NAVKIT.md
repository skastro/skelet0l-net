# navkit.v1 — the Navigation Kit contract

The shared data layer that makes three instruments one kit:

- **The Map** (frame.w0rk) — the chart / the map (where things are)
- **The Compass** — the compass (which way to move)
- **The Ship Log** — the log (what was read, tagged and kept)

The Compass is the **writer**. The Map and The Ship Log are **readers**. The contract below is the only thing they need to agree on.

---

## The one-origin rule

`localStorage` is scoped to a single origin. For the three apps to share data live, they must be served from **one origin** — one Netlify site, different paths:

```
the-compass.netlify.app/            -> The Desktop (Win98 shell)
the-compass.netlify.app/compass/    -> The Compass   (writer)
the-compass.netlify.app/map/        -> The Map        (frame.w0rk chart, reader)
the-compass.netlify.app/log/        -> The Ship Log   (notes, reader)
```

Across separate origins there is no shared memory — sync by **export/import** instead (see below). Co-location is what turns the kit into one bloodstream.

---

## Storage keys (localStorage)

| Key | Type | Meaning |
|-----|------|---------|
| `navkit.v1.currentBearing` | `Capture` or `""` | The active bearing — today's Daily Brief if set, else the latest reading. |
| `navkit.v1.readings` | `Reading[]` | Full reading log, newest first. |
| `navkit.v1.captures` | `Capture[]` | Same readings in Ship Log ingest form. |
| `navkit.v1.updated` | ISO string | Last write timestamp. |

The Compass writes all four on every cast, delete, and on load.

---

## Shapes

### Reading (raw)
```json
{
  "id": "lx9f2a31",
  "ts": "2026-06-28T17:40:00.000Z",
  "mode": "ritual | bearing | recenter",
  "objective": "Land the Q3 narrative",
  "domain": "Career",
  "feeling": "",
  "pressure": "...", "positioning": "...", "awareness": "...", "skill": "..."
}
```

### Capture (Ship Log-facing)
```json
{
  "id": "lx9f2a31",
  "ts": "2026-06-28T17:40:00.000Z",
  "jstamp": "W.26.179",
  "source": "the-compass",
  "title": "Land the Q3 narrative",
  "mode": "ritual",
  "domain": "Career",
  "tags": ["#STRATEGY", "#PRESSURE", "#POSITIONING", "#AWARENESS", "#SKILLS", "#CAREER", "#DAILYBRIEF"],
  "body": "Objective: ...\nPressure (Fire): ...\nPositioning (Earth): ...\nAwareness (Air): ...\nSkill (Water): ...",
  "levers": { "pressure": "...", "positioning": "...", "awareness": "...", "skill": "..." }
}
```

---

## Tag vocabulary

- **Parent:** `#STRATEGY`
- **Levers (sub-tags):** `#PRESSURE` `#POSITIONING` `#AWARENESS` `#SKILLS` (included only when that lever has text)
- **Life-area:** `#PHYSICAL` `#MENTAL` `#SPIRITUAL` `#CAREER` `#FINANCE` `#SOCIAL` `#ASTROLOGY`
- **Mode:** `#DAILYBRIEF` `#BEARING` `#RECENTER`

This is the STRATEGY tag tree, so captures slot straight in.

---

## Reader snippets

**frame.w0rk — overlay the active bearing on the chart:**
```js
const b = JSON.parse(localStorage.getItem("navkit.v1.currentBearing") || "null");
if (b) {
  // b.title, b.domain, b.levers.{pressure,positioning,awareness,skill}
  renderBearingOverlay(b);   // your chart hook
}
window.addEventListener("storage", e => {            // live updates across tabs
  if (e.key === "navkit.v1.currentBearing") refreshBearing();
});
```

**The Ship Log — ingest readings as entries (dedupe by id):**
```js
const caps = JSON.parse(localStorage.getItem("navkit.v1.captures") || "[]");
caps.forEach(c => upsertEntry({          // your entry-create hook
  id: c.id, title: c.title, body: c.body, tags: c.tags, ts: c.ts
}));
```

---

## Cross-origin sync (separate sites)

The Compass exports `{ schema:"navkit.v1", readings:[], captures:[] }` as a JSON file (Log → Export). The Map / The Ship Log import it and read `readings` / `captures`. Same contract, file-carried instead of live.

The Compass also offers per-reading **Send to Ship Log**, which copies a tagged capture to the clipboard for a manual paste when live sync isn't wired yet.
