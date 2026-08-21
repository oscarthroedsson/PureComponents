# AGENTS.md

Contract for any agent working in this repo (Claude Code, Codex, or otherwise).
`CLAUDE.md` points here. Rules change **in this file**, not in two places.

---

## 1. What this repo is

The repo is named **PureComponents**, but that name covers a planned split:

| Layer | What it is | Status |
|---|---|---|
| **PureUI** | CSS only. Stylesheets a consumer links and uses through class names. | **This is what we are building right now.** |
| **PureComponents** | A component library consuming PureUI — vanilla TS first, then React, possibly Vue. | Not started. Do not build toward it. |

**Work on PureUI unless told otherwise.** The repo name is not the current scope.

PureUI styles two kinds of things:

- **Elements** — CSS on a native HTML element. `.btn` on `<button>`, `.badge` on
  `<span>`, `dialog.dialog` on `<dialog>`.
- **Compositions** — patterns built by reusing element components. `Pagination`
  is a set of `.btn`s; `Alert` uses `.btn` for its dismiss control.

Prefer a native element and its native behaviour over a div reconstruction. The
library ships **no JavaScript** — if a state cannot be reached without JS, it is
reached through an attribute the consumer sets.

There is a plan to sharpen this into an enforced rule — key classes that only
apply on the correct native element, so the library pushes consumers toward
semantically correct HTML. It is written up in **`Opinionated-guide.md`**.

**None of it is in force.** Until Oscar gives the order, every stylesheet
follows the standard in this file. Do not apply it to a component because you
happened to be editing it, and do not start the analysis it describes on your
own initiative — report the observation instead.

---

## 2. Working agreement

**Before editing a file: say what you want to change and why. Wait for approval.
Then make only those changes.**

Finding something else on the way — a bug, a token that does not exist, an
inconsistency — you have two options:

1. Stop and ask whether to handle it now. Explain what you found, how the bug
   shows itself, and why it is a bug.
2. Finish the agreed change first, then report the findings.

Both are fine. Silently fixing it is not. Neither is widening the change.

Other standing rules:

- Consistency across components outweighs a locally clever solution. A page
  built from several components has to look like one library.
- Do not add a build step, a preprocessor, a dependency, or a JS runtime to the
  library.
- Swedish in conversation. English in code, comments, docs, and commit messages.

---

## 3. Repo map

```
src/Styles/            THE LIBRARY. One CSS file per component.
  main.css             Design tokens + a few global resets. The base everything builds on.
  button.css, card.css, …
  Form/inputs/*.css    Form controls
  Menu/*.css
src/Documentation/     usage.md + contribute.md per component
pages/                 Dev shell — preview pages. NOT part of the library.
index.html             Dev shell start page
src/Rules/             Dev-time console warnings (TS). Not shipped.
src/Helpers/           Helpers for the above. Not shipped.
src/Utils/toast/       TS toast helper — groundwork for the future component layer, not PureUI.
ACCESSIBILITY.md       WCAG 2.1 AA reference for the whole library
Opinionated-guide.md   Planned: key classes tied to the correct native element.
                       NOT in force — see §1. Waits for Oscar's order.
README.md              Consumer-facing intro
```

---

## 4. The CSS contract

### 4.1 The key class

Every component starts with one class — the **key**. Without the key on the
element, none of our styling applies.

```css
.btn { … }
```

This is deliberate protection: a consumer's existing CSS is never overwritten by
merely including our stylesheet. It is also why **nesting is mandatory** — every
rule for the component lives inside the key block, so it cannot leak out.

```css
.btn {
  /* everything for this component lives in here */
  &.sm { … }
  &:focus-visible { … }
}
```

Keep specificity low. A consumer must be able to override us with one plain
class of their own.

### 4.2 File layout

Fixed order inside the key block:

```css
/*
ACCESSIBILITY REQUIREMENTS:
- …

USAGE:
<button class="btn md">…</button>

ATTRIBUTES / VARIANTS / SIZE / SHAPE:
- …
*/

.btn {
  /* 1. VARIABLES — component-local custom properties, all of them, here */

  /* 2. BASE — what the key alone produces */

  /* 3. SIZE */
  &.sm { … }
  &.md { … }   /* default; only what base cannot already give */
  &.lg { … }

  /* 4. SHAPE / VARIANTS */

  /* 5. STATES — attributes, aria-*, pseudo-classes */
}

/* 6. @keyframes, if any, after the block */
```

The comment header at the top of the file is part of the convention — see
`button.css`, `alert.css`, `dialog.css`. It states the accessibility contract
before anything else.

### 4.3 Variables

**All component-local custom properties are declared at the top of the key
block. Never further down the file.**

```css
dialog.dialog {
  --dialog-max-width: 600px;
  --dialog-radius: var(--radius-md);
  --dialog-enter-duration: 280ms;
  …
}
```

Why the placement matters: a variable declared inside a state block only exists
in that state. Declared at the top it is reachable from every state, every
variant, and every pseudo-element below — and states redefine it rather than
redeclaring properties.

Why the naming matters: these variables are the public tuning surface. A user
who is not strong at CSS should be able to read `--dialog-max-width` and know
what it does, and set it inline on the element:

```html
<dialog class="dialog" style="--dialog-max-width: 400px">
```

That surface is also how the future component layer will expose props, and how
pseudo-elements — which a consumer cannot select — stay adjustable. Name them
`--<component>-<what-it-controls>`, in plain words. No abbreviations, no
internal jargon.

### 4.4 Colors — hard rule

**Hardcoded colors are forbidden.** Always a token from `main.css`:

```css
color: var(--color-neutral-900);
background-color: var(--color-primary);
```

Never `#1e293b`, `rgb(30 41 59)`, `hsl(217 33% 17%)`, or a named color.

Dark mode is not built yet. It will be built by changing `main.css`. Every
component that went through tokens inherits it for free; every component that
hardcoded a color has to be found and fixed by hand. That is the whole reason
for the rule.

Two allowances, and only these:

- `color-mix(in hsl, var(--token) …, var(--token) …)` for hover/active shades.
- A translucent overlay expressed through a component-local variable declared at
  the top of the block, so a consumer can replace it rather than being stuck
  with it.

Spacing, radius, shadows, transitions, z-index and font sizes have tokens too.
Use them. A raw `px` value is acceptable only when no token expresses it and the
value is structural rather than thematic.

### 4.5 Sizes

`sm`, `md`, `lg`. **`md` is the default** — base styling should already produce
the `md` look, so `&.md` holds only what base cannot express. Never leave a
component where the key alone renders wrong.

### 4.6 States

Drive state from what the platform already gives us, in this order:

1. **Native attributes and pseudo-classes** — `:disabled`, `:checked`, `[open]`,
   `:focus-visible`, `:invalid`.
2. **ARIA attributes** — `[aria-pressed="true"]`, `[aria-disabled="true"]`,
   `[aria-busy="true"]`, `[aria-invalid="true"]`. These carry meaning to
   assistive tech; a `data-` attribute carries none.
3. **`data-` attributes** — only when neither of the above exists:
   `[data-intent="destructive"]`, `[data-icon-only]`.

When both a native and an ARIA form can occur, style both. `.btn` sits on
`<button>` and on `<a>`; a `<button>` can be `:disabled`, an `<a>` never can, so
disabled styling is written as `&:is(:disabled, [aria-disabled="true"])`.

### 4.7 Shared vocabulary

Same concept, same class name, in every component:

| Concept | Classes |
|---|---|
| Size | `sm` · `md` · `lg` |
| Shape | `sharp` · `smooth` · `rounded` |
| Emphasis | `secondary` · `tertiary` · `ghost` · `outline` |
| Intent | `data-intent="info \| success \| warning \| error \| destructive"` |

Do not invent a synonym for something that already has a name.
See §8 — `soft` and `smooth` are currently both in use for the same shape.

---

## 5. Accessibility

WCAG 2.1 Level AA is the floor, not a stretch goal. `ACCESSIBILITY.md` is the
full reference; the short version:

- Native semantic element first. `<button>`, `<dialog>`, `<details>`, `<nav>`.
- Every interactive element has a visible `:focus-visible` indicator at 3:1
  contrast. The house pattern is `outline: 1px solid …; outline-offset: 2px`.
- Text contrast 4.5:1, UI contrast 3:1.
- Never remove an outline without replacing it with something equally visible.
- Color is never the sole carrier of meaning.
- Honour `@media (prefers-reduced-motion: reduce)` wherever something animates.
- Decorative icons get `aria-hidden="true"`; icon-only controls get an
  accessible name.

Every CSS file states its own accessibility requirements in the header comment.
Writing a new component means writing that header too.

---

## 6. The dev shell (`pages/`)

Development tooling. **It never ships.** It has its own `--pc-*` tokens and `pc-`
namespace so it cannot mask or collide with library CSS, and stays readable
while library tokens are mid-refactor.

A component page contains only its demos. `pages/docs.js` builds the header,
navigation, table of contents, and per section an editable code pane beside a
live preview.

```html
<body data-component="Button">
  <section class="pc-demo" id="sizes" data-title="Sizes">
    <p class="pc-note">Three sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</p>
    <template>
      <button class="btn sm">Small</button>
      <button class="btn md">Medium</button>
    </template>
  </section>
  <script src="./components.js"></script>
  <script src="./docs.js"></script>
</body>
```

The markup inside `<template>` is the **single source** for both the code pane
and the preview — they cannot drift apart. Never write a demo twice, once as
markup and once as an escaped `<pre><code>` copy. That is the mistake this shell
was built to remove.

`pages/README.md` has the full attribute table. `pages/Tokens.html` renders every
token off `:root` and cross-checks every `var(--x)` against every `--x:`
declaration — an undefined token shows as a red row instead of a silently
missing style. Check it after touching `main.css`.

`index.html` deliberately loads **no** library CSS: a broken stylesheet must not
be able to take the navigation down.

---

## 7. Adding or changing a component

1. Agree on the change first (§2).
2. `src/Styles/<name>.css` — header comment, then the key block in the order
   from §4.2.
3. Register it in `pages/components.js` (`id`, `title`, `group`, `file`, `css`).
   This drives the start page, the component dropdown, and the "Requires" list.
4. `pages/<Name>.html` — demos only. Link `main.css` and the
   component's CSS in `<head>`. Pages one level down (`pages/Form/`) need
   `../../src/Styles/…` and `../docs.js`.
5. `src/Documentation/<Name>/usage.md` (consumer-facing) and `contribute.md`
   (how it is built and why).
6. Verify in the browser: `npm run dev`, open the page, check every size, every
   state, keyboard focus, and both stage themes.

### Commands

```bash
npm run dev
```

```bash
npm run build
```

`npm run dev` serves on port 5173 (`.claude/launch.json`). Never start a dev
server through a plain shell — use the preview tooling if you have it.

---

## 8. Known debt — do not "fix" in passing

Report these; do not sweep them into an unrelated change.

- **Undefined tokens.** Several `var(--…)` references have no declaration in
  `main.css` — `--color-destructive` in `button.css` is one. `pages/Tokens.html`
  lists them all in red. Oscar's call.
- **`soft` vs `smooth`.** The middle shape is `smooth` in button, alert, dialog,
  pagination, progress, meter, nav and text; `soft` in badge, pill, avatar and
  breadcrumbs. One of them has to go.
- **`md` missing.** Sixteen stylesheets have no `&.md` block. Some are correct
  (base already is `md`); some are unfinished.
- **`light-dark()` in the wild.** `alert.css` and `Menu/menu.css` already use it
  while the rest of the library waits for the `main.css` dark-mode pass. Do not
  spread it further until that pass is decided.
- **`main.css` structure.** Duplicate `--font-size-base`, `#app` layout rules
  that belong to the dev shell, and `--size-*` tokens referenced but never
  declared.
- **`vite.config.js`** still configures SCSS. The project is plain CSS.

---

## 9. Definition of done

- Key class present; everything nested inside it.
- Component variables at the top of the key block, plainly named.
- No hardcoded colors. No hardcoded values where a token exists.
- `sm` / `md` / `lg` behave, `md` is the default.
- States driven by native attributes, then ARIA, then `data-`.
- Focus indicator visible and to spec.
- Header comment states the accessibility contract.
- Registered in `pages/components.js`, demo page renders, verified in browser.
- `usage.md` and `contribute.md` written.
- Naming matches every other component in the library.

---

## 10. Semantic notes

This is a list of specific documents with notes about semantics problems that we
have chosen to handle at a later stage. Do not read or edit these files unless
you are asked to. You are allowed to ask to edit them if a problem is met in the
future.

Naming convention: `SemanticNotes/semantics-<component>.md`.

- `SemanticNotes/semantics-breadcrumbs.md` — WebKit drops list semantics from
  `<ol>` / `<ul>` when `list-style: none` is set.
