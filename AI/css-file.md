# How a CSS file is built

One file per component, in `packages/ui/css/styles/`. The rules for what the
classes must be are in [ui-classes.md](ui-classes.md); this document covers
the file itself.

The three files in `styles/Layout/` are the deliberate exception. `box.css`
owns the `.pu-box` key. `layout.css` and `behavior.css` are attribute modules
scoped to that key, not independent components, so they do not invent another
key class or empty size, shape and state sections merely to fit this template.
Each module owns its own public docs and is registered as its own dev-shell
page.

---

## Mandatory sections, in this order

Every component file has all six. A component file missing one is unfinished.
The two attribute modules above contain only the sections their API actually
has.

| # | Section | Required |
|---|---|---|
| 1 | Variables | Always — even if there is one |
| 2 | Base | Always |
| 3 | Size | Always, unless the component has no size |
| 4 | Shape / variants | When the component has them |
| 5 | States | Always — focus alone makes it non-optional |
| 6 | `@keyframes` | When something animates |

## 1. Variables

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

## 2–5. The key block

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
  &.btn-sm { --btn-padding-block: var(--spacing-25); }
  &.btn-lg { --btn-padding-block: var(--spacing-75); }

  /* 4. SHAPE / VARIANTS */
  &.btn-sharp   { --btn-radius: 0; }
  &.btn-rounded { --btn-radius: var(--radius-full); }
  &.btn-ghost   { --btn-surface: transparent; }

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
- Every modifier and every part is written `<name>-<word>`, where `<name>` is
  the key without its `pu-`. See [ui-classes.md](ui-classes.md) section 1.
- No hardcoded colours. See [ui-classes.md](ui-classes.md) section 4.
- `prefers-reduced-motion` honoured wherever something animates.
- English in comments.
- No `!important`. Needing it means the file is not nested properly.
- Logical properties — `inline-size`, `block-size`, `inset-inline-start` —
  rather than physical ones.

## Adding a component

1. Agree the change first.
2. Write `packages/ui/css/styles/<name>.css` in the order above.
3. Register it in `apps/dev-shell/pages/components.js` with `id`, `title`,
   `group`, `file`, `css`. This drives the start page, the component dropdown
   and the "requires" list.
4. Write `apps/dev-shell/pages/<Name>.html` — demos only. Link `main.css` and
   the component's CSS. Pages one level down need `../docs.js`.
5. Write `packages/ui/css/docs/<Name>/usage.md` and `contribute.md`.
6. Verify in the browser: every size, every state, keyboard focus, both stage
   themes.

## Done means

- Key class present, everything nested inside it.
- Key requires its native element through `:where()` where one exists.
- Every modifier and part namespaced to the component.
- Component variables at the top of the key block, plainly named.
- No hardcoded colours, no raw values where a token exists.
- Sizes and variants carry the component's namespace, `md` is the default.
- States driven by native attributes, then ARIA, then `data-`.
- Focus indicator visible and to spec.
- Registered in `components.js`, demo page renders, seen in a browser.
- `usage.md` and `contribute.md` written.
- Naming matches every other component.
