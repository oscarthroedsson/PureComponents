# Accordion

A group of collapsible panels sharing one frame. It is a wrapper around
`.pu-collapsible` — the group owns the border and the corner, the panels
become rows inside it.

## Quick start

```html
<div class="pu-accordion accordion-md">
  <details class="pu-collapsible">
    <summary>What is included?</summary>
    <p>Everything in the standard plan.</p>
  </details>
  <details class="pu-collapsible">
    <summary>How do I cancel?</summary>
    <p>From the billing page, any time.</p>
  </details>
</div>
```

The size goes on the **group**, not on each panel. It is handed down to every
row, so it is written once in the markup instead of once per panel.

## Classes

| Class | Does |
|---|---|
| `.pu-accordion` | The key. |
| `accordion-sm` | Tighter rows, smaller type and radius. |
| `accordion-md` | The default. |
| `accordion-lg` | Roomier rows, larger type and radius. |
| `accordion-sharp` | Square corners. |
| `accordion-smooth` | The same radius `accordion-md` already gives. |
| `accordion-rounded` | The large corner — `--radius-rounded`, capped at `--radius-lg`. |
| `accordion-separate` | Each panel keeps its own border and corner, with a gap between them. |

## One panel open at a time

Give every `<details>` the same `name`. The browser closes the others, and no
script is involved.

```html
<div class="pu-accordion accordion-md">
  <details class="pu-collapsible" name="faq"><summary>First</summary><p>…</p></details>
  <details class="pu-collapsible" name="faq"><summary>Second</summary><p>…</p></details>
  <details class="pu-collapsible" name="faq" open><summary>Third</summary><p>…</p></details>
</div>
```

In a named group only one panel may carry `open`.

Leave `name` off and any number can be open at once.

## Separate

```html
<div class="pu-accordion accordion-md accordion-separate">
  <details class="pu-collapsible"><summary>Shipping</summary><p>…</p></details>
  <details class="pu-collapsible"><summary>Returns</summary><p>…</p></details>
</div>
```

The group stops being a frame and becomes spacing. Each panel takes its own
border and corner back — the look a FAQ usually wants when the questions are
unrelated.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--accordion-radius` | `var(--radius-md)` | The group's corner, and each panel's corner when separate. |
| `--accordion-border-width` | `1px` | Frame and dividers. |
| `--accordion-border-color` | `var(--color-border)` | Frame and dividers. |
| `--accordion-gap` | `var(--spacing-50)` | Space between panels when separate. |

Every `--collapsible-*` variable still works, set on an individual panel:

```html
<details class="pu-collapsible" style="--collapsible-background: transparent">
```

## Accessibility

- `<details>` reports open and closed. Do not add `role` or `aria-expanded`.
- A heading inside `<summary>` gives the group a real outline. Pick the level
  that fits where the accordion sits on the page.
- An accordion is not navigation. Do not wrap it in `<nav>`.
- Everything in the Collapsible docs about markers and focus applies to each
  panel unchanged.

## Examples

### Sizes

```html
<div class="pu-accordion accordion-sm">…</div>
<div class="pu-accordion accordion-md">…</div>
<div class="pu-accordion accordion-lg">…</div>
```

### Shape

```html
<div class="pu-accordion accordion-md accordion-sharp">…</div>
<div class="pu-accordion accordion-md accordion-rounded">…</div>
```

### An exclusive FAQ

```html
<div class="pu-accordion accordion-md">
  <details class="pu-collapsible" name="faq">
    <summary><h3>Shipping</h3></summary>
    <p>Orders ship within two working days.</p>
  </details>
  <details class="pu-collapsible" name="faq">
    <summary><h3>Returns</h3></summary>
    <p>Thirty days, unused.</p>
  </details>
</div>
```
