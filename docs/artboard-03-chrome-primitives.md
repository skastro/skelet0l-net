# artboard_03 — chrome_primitives.spec

Five repeatable patterns. The chrome is a framing device that makes content feel held, not costumed. If removing it makes the content harder to parse, it's working. If it makes no difference, cut it.

## 1 · Window Header

- Background: `--plum` (tier 2)
- Height: 32px, padding: 8px 12px
- Dots: 8px circles — first `--gold` fill, others `--border-chrome` stroke only
- Title: IBM Plex Mono 500, 11px, `--muted`, +0.03em tracking
- Border-bottom: 1px `--border-subtle`
- **Use on:** proof cards, project showcases, OS Kit modules

## 2 · Section Frame

- Border: 1px `--border-chrome`, radius 4px
- Background: `--panel` (tier 1)
- No titlebar — just the contained feel
- Optional: mono label top-left inset (12px from edge, `--muted`, uppercase)
- **Use on:** page sections needing separation without a full window

## 3 · Tab Strip

- Container: inside a window header or standalone
- Items: Plex Mono 500, 12px, uppercase, +0.06em
- Default: `--muted`
- Hover: `--cream` (no underline)
- Active: `--gold` text + 2px gold underline (offset 4px below text)
- Gap: 24px (sp-6)
- **Use on:** content switching within chrome windows, OS Kit categories

## 4 · Status Strip

- Background: `--ink` (tier 0)
- Height: 24px, padding: 4px 12px
- Border-top: 1px `--border-subtle`
- Content: Plex Mono 500, 10px, `--muted`, flex space-between
- Left: glyph + label (e.g., "◈ skele.t0l")
- Right: status text (e.g., "ready", timestamp, or progress)
- **Use on:** bottom of chrome windows, footer-like metadata

## 5 · Divider

- Line: 1px `--border-subtle`, full width
- **Variant A:** plain line
- **Variant B:** glyph centered on `--ink` background pad (breaks the line)
- Glyph: `--muted` or `--gold`, same size as surrounding text
- **Use on:** section breaks, between content groups

## Assembly

Window header (1) + tab strip (3) + content area + status strip (4).
Nesting order, top to bottom — one window, four primitives.

The window treatment gives structure without stealing focus. Header carries identity, tabs carry navigation, the status strip carries state. Remove any layer and the content gets harder to parse — that is the test.

---

◈ skele.t0l · 5 primitives · 1 assembly · ready
