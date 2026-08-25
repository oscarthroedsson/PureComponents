# How a CSS file is built

One file per component, in `packages/pureui/styles/`. The rules for what the
classes must be are in [ui-classes.md](ui-classes.md); this document covers
the file itself.

---

## Mandatory sections, in this order

Every file has all seven. A file missing one is unfinished.

| # | Section | Required |
|---|---|---|
| 1 | Header comment | Always |
| 2 | Variables | Always — even if there is one |
| 3 | Base | Always |
| 4 | Size | Always, unless the component has no size |
| 5 | Shape / variants | When the component has them |
| 6 | States | Always — focus alone makes it non-optional |
| 7 | `@keyframes` | When something animates |

## 1. Header comment

Comes first, before any CSS. States the accessibility contract before anything
else, then how the component is used.

```css
/* -----------------Content Board----------------------- */
/*
ACCESSIBILITY REQUIREMENTS:
- The key only applies on <table>. A grid of divs is not announced as a
  table and gives a screen reader no row or column position.
- Every data column needs a <th scope="col">.
- Focus comes from main.css. This file must never draw its own outline.

USAGE:

<table class="pu-table md">
  <thead>…</thead>
  <tbody>…</tbody>
</table>

SIZE:  sm · md · lg   (md is the default; the key alone is already md)

SHAPE: sharp · smooth · rounded

VARIANTS:
- striped    every other row filled
- compact    padding halved

NOT HERE:
Loading and skeleton come from loading.css and are not rebuilt per component.
*/
```

`ACCESSIBILITY REQUIREMENTS` and `USAGE` are required. The rest appear when the
component has them.

## 2. Variables

**All component variables are declared at the top of the key block. Never
further down the file.**

```css
.pu-dialog:where(dialog) {
  --dialog-max-width: 600px;
  --dialog-radius: var(--radius-md);
  --dialog-enter-duration: 280ms;
  …
}
```

Placement matters: a variable declared inside a state block only exists in that
state. Declared at the top it is reachable from every state, variant and
pseudo-element below — and states then redefine the variable rather than
redeclaring properties.

Naming matters because these variables are the public tuning surface. Someone
who is not strong at CSS should read `--dialog-max-width` and know what it does,
and be able to set it inline:

```html
<dialog class="pu-dialog" style="--dialog-max-width: 400px">
```

Name them `--<component>-<what-it-controls>`, in plain words. No abbreviations,
no internal jargon.

Variables are also how pseudo-elements stay adjustable. A consumer cannot
select `::before`, so every part of one that might need changing is a variable.

## 3–6. The key block

```css
.pu-btn:where(button, a, label, summary) {
  /* 1. VARIABLES — all of them, here */
  --btn-surface: var(--color-primary);
  --btn-color: var(--color-neutral-100);
  --btn-radius: var(--radius-md);
  --btn-padding-block: var(--spacing-50);
  --btn-padding-inline: var(--spacing-75);

  /* 2. BASE — what the key alone produces. Already md. */
  display: inline-flex;
  align-items: center;

  padding: var(--btn-padding-block) var(--btn-padding-inline);

  background-color: var(--btn-surface);
  color: var(--btn-color);
  border-radius: var(--btn-radius);

  /* 3. SIZE */
  &.sm { --btn-padding-block: var(--spacing-25); }
  &.lg { --btn-padding-block: var(--spacing-75); }

  /* 4. SHAPE / VARIANTS */
  &.sharp   { --btn-radius: 0; }
  &.rounded { --btn-radius: var(--radius-full); }
  &.ghost   { --btn-surface: transparent; }

  /* 5. STATES */
  &:hover {
    --btn-surface: color-mix(in hsl, var(--color-primary) 85%, black);
  }

  &:is(:disabled, [aria-disabled="true"]) {
    opacity: 0.5;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

/* 6. @keyframes, after the block */
@keyframes pu-btn-spin { … }
```

Note what sizes and variants do: they **redefine a variable**, not the
properties. The base already says where `--btn-radius` is used.

## Rules that apply to the whole file

- Everything nested inside the key block. Nothing at top level except the key
  and `@keyframes`.
- No hardcoded colours. See [ui-classes.md](ui-classes.md) section 4.
- `prefers-reduced-motion` honoured wherever something animates.
- English in comments.
- No `!important`. Needing it means the file is not nested properly.
- Logical properties — `inline-size`, `block-size`, `inset-inline-start` —
  rather than physical ones.

## Adding a component

1. Agree the change first.
2. Write `packages/pureui/styles/<name>.css` in the order above.
3. Register it in `apps/dev-shell/pages/components.js` with `id`, `title`,
   `group`, `file`, `css`. This drives the start page, the component dropdown
   and the "requires" list.
4. Write `apps/dev-shell/pages/<Name>.html` — demos only. Link `main.css` and
   the component's CSS. Pages one level down need `../docs.js`.
5. Write `packages/pureui/docs/<Name>/usage.md` and `contribute.md`.
6. Verify in the browser: every size, every state, keyboard focus, both stage
   themes.

## Done means

- Key class present, everything nested inside it.
- Key requires its native element through `:where()` where one exists.
- Component variables at the top of the key block, plainly named.
- No hardcoded colours, no raw values where a token exists.
- `sm` / `md` / `lg` behave, `md` is the default.
- States driven by native attributes, then ARIA, then `data-`.
- Focus indicator visible and to spec.
- Header comment states the accessibility contract.
- Registered in `components.js`, demo page renders, seen in a browser.
- `usage.md` and `contribute.md` written.
- Naming matches every other component.
