# Loading Component

## Component Overview

What a component looks like while it waits. Nothing is painted over: the
element steps back and a soft diagonal glow travels across it, so the
reader can still see what is loading.

### When to Use

- A control that is working — a button mid-save, a row of page controls
  fetching the next page
- A surface whose content is being refreshed in place

### When NOT to Use

- Content that is not there yet (that is a skeleton, a different thing)
- A known duration or percentage (use Progress)
- Blocking the whole page (use Dialog)

## Quick Start

Two things: the class opts in, `aria-busy="true"` is the state.

```html
<button class="btn md loading" aria-busy="true" disabled>Saving…</button>

<ul class="pagination md loading" aria-busy="true">
  …
</ul>
```

## Accessibility Requirements

- **`aria-busy="true"`** - Required. Turns the effect on and is what
  assistive technology reads.
- **`aria-live="polite"`** - On the region whose content will be replaced,
  so the update is announced when it lands.
- **`disabled` / `aria-disabled="true"`** - Not loading's to add. CSS
  cannot stop input; if the control must not be used while it waits, say
  so on the control itself.
- **Reduced motion** - The glow holds still. The dim carries the state.

## API Reference

- `.loading` - The opt-in. Paints nothing on its own.
- `[aria-busy="true"]` - The state that turns it on.
- Variables: `--loading-opacity`, `--loading-glow`, `--loading-angle`,
  `--loading-duration`
- Animation: `@keyframes loading-sweep`

## Examples

See `pages/Loading.html`, or the component CSS file.
