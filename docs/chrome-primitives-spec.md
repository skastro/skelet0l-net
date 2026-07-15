# Chrome Primitives Spec

> artboard_03 — chrome_primitives.spec  
> Five repeatable patterns. The chrome is a framing device that makes content feel held, not costumed.  
> If removing it makes the content harder to parse, it's working. If it makes no difference, cut it.

---

## 1 · Window Header

| Property | Value |
|----------|-------|
| Background | `--plum` (tier 2) |
| Height | 32px |
| Padding | 8px 12px |
| Dots | 8px circles: first `--gold` fill, others `--border-chrome` stroke |
| Title | IBM Plex Mono 500, 11px, `--muted`, +0.03em |
| Border-bottom | 1px `--border-subtle` |

**Use on:** proof cards, project showcases, OS Kit modules

---

## 2 · Section Frame

| Property | Value |
|----------|-------|
| Border | 1px `--border-chrome`, radius 4px |
| Background | `--panel` (tier 1) |
| Titlebar | None |
| Optional label | Mono, 12px inset from edge, `--muted`, uppercase |

**Use on:** page sections needing visual separation without a full window

---

## 3 · Tab Strip

| Property | Value |
|----------|-------|
| Font | IBM Plex Mono 500, 12px, uppercase, +0.06em |
| Default state | `--muted` |
| Hover state | `--cream`, no underline |
| Active state | `--gold` text + 2px gold underline (offset 4px below) |
| Gap | 24px (sp-6) |

**Use on:** content switching within chrome windows, OS Kit categories

---

## 4 · Status Strip

| Property | Value |
|----------|-------|
| Background | `--ink` (tier 0) |
| Height | 24px |
| Padding | 4px 12px |
| Border-top | 1px `--border-subtle` |
| Font | IBM Plex Mono 500, 10px, `--muted` |
| Layout | flex, space-between |
| Left | glyph + label (e.g. "◈ skele.t0l") |
| Right | status text (e.g. "ready", timestamp) |

**Use on:** bottom of chrome windows, footer-like metadata

---

## 5 · Divider

| Property | Value |
|----------|-------|
| Line | 1px `--border-subtle`, full width |
| Variant A | Plain line |
| Variant B | Glyph centered on `--ink` pad (breaks the line) |
| Glyph color | `--muted` or `--gold` |
| Glyph size | Same as surrounding text |

**Use on:** section breaks, between content groups

---

## Assembly

Nesting order (top to bottom, one window):

1. Window header (1)
2. Tab strip (3)
3. Content area
4. Status strip (4)

> The window treatment gives structure without stealing focus. Header carries identity, tabs carry navigation, the status strip carries state. Remove any layer and the content gets harder to parse — that is the test.
