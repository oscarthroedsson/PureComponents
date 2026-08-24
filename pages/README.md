# Preview pages

Development tooling. Nothing in this folder ships with the library — the library
itself stays CSS-only.

Run `npm run dev` and open `index.html`.

## What a page looks like

A component page contains nothing but its demos. The shell builds the rest.

```html
<body data-component="Button">
  <section class="pc-demo" id="sizes" data-title="Sizes">
    <p class="pc-note">Three sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</p>
    <template>
      <button class="pu-btn sm">Small</button>
      <button class="pu-btn md">Medium</button>
    </template>
  </section>

  <script src="./components.js"></script>
  <script src="./docs.js"></script>
</body>
```

The markup inside `<template>` is the single source for both the code pane and
the live preview, so the two can never drift apart.

| Attribute | On | Purpose |
|---|---|---|
| `data-component` | `<body>` | Matches an `id` in `components.js` |
| `id` | `<section>` | The `#anchor`; a reload returns you to it |
| `data-title` | `<section>` | Heading and table-of-contents entry |
| `data-stage-style` | `<section>` | Inline style for the preview area — a column stack, or the min-height a popover needs so it isn't clipped |
| `class="pc-note"` | `<p>` | Prose above the demo; may contain `<code>` |

Demos are laid out in a wrapping row by default. Use `data-stage-style` to
override that per section.

## Adding a component

1. Add an entry to `components.js` — this drives the start page, the component
   dropdown, and the "Requires" list.
2. Copy an existing page and replace the demos. Link the component's own CSS in
   `<head>`, alongside `main.css`.
3. Pages one level down (`pages/Form/`) need `../../src/Styles/…` and
   `../docs.js`.

`Tokens.html` renders every design token straight off `:root` and cross-checks
every `var(--x)` in the stylesheets against every `--x:` declaration, so a token
that is used but never defined shows up as a red row instead of as a silently
missing style.

## Top bar

- **Theme** — the shell's own light/dark, independent of the preview.
- **Stage** — the background the component is previewed against.
- **Width** — constrains the preview to 768px or 375px.
- **Outline** — outlines every element in the preview.

Preferences persist in `localStorage`. Edits to a code pane do not — reload
returns the demo to what the file says.
