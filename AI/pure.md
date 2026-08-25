# Pure

Pure is a monorepo holding three packages. Only one of them is being built
right now.

| Package | What it is | Status |
|---|---|---|
| **PureUI** | CSS only. Stylesheets a consumer links and uses through class names. Ships no JavaScript. | **Active. This is the work.** |
| **PureComponents** | A component layer consuming PureUI. Vanilla TS first, then React, possibly Vue. | Not started |
| **PureFramework** | Scope not defined. | Not started |

Work on PureUI unless told otherwise.

## Repository layout

```
packages/pureui/          the library
  styles/                 one CSS file per component
  docs/                   usage.md + contribute.md per component
  js/                     toast behaviour layer
packages/purecomponents/  empty
packages/pureframework/   empty
apps/dev-shell/           preview pages. Never ships.
notes/                    loose notes
AI/                       these documents
```

`packages/` is what gets published to npm. `apps/` is what gets run. An app is
never published; a package is never deployed.

## Documents

| Read this | For |
|---|---|
| [css-file.md](css-file.md) | How a CSS file is built: section order, header, variables |
| [ui-classes.md](ui-classes.md) | Class rules: the key, the element requirement, sizes, states, shared vocabulary |
| [accessibility.md](accessibility.md) | The WCAG 2.1 AA floor, in full |
| [ui.md](ui.md) | PureUI — what the package is |
| [components.md](components.md) | PureComponents |
| [framework.md](framework.md) | PureFramework |

## Rules for these documents

These documents are the contract. Three rules govern them:

1. **No AI edits any file in `AI/` without the owner's explicit approval,
   asked for and given in advance.** Finding a rule wrong is a reason to say
   so, not a reason to change it.
2. A rule changes **in one place**. `CLAUDE.md` and `AGENTS.md` in the root are
   pointers to this directory and carry no rules of their own.
3. A document that is neither created nor maintained here does not exist. Do
   not write new standing documents outside `AI/`.

## Working rules

**Before editing a file: state what changes and why. Wait for approval. Then
change only that.**

Finding something else along the way — a bug, a missing token, an
inconsistency — there are two acceptable moves: stop and ask whether to handle
it now, or finish the agreed change and report the finding after. Fixing it
silently is not one of them, and neither is widening the change.

Other standing rules:

- Consistency across components outweighs a locally clever solution. A page
  built from several components has to look like one library.
- No build step, preprocessor, dependency or JS runtime is added to the
  library.
- A CSS change is not done until it has been seen rendering in a browser. Use
  the dev shell, check every size, every state, keyboard focus, and both stage
  themes.
- Swedish in conversation. English in code, comments, documents and commits.

## Dev shell

```bash
pnpm dev
```

Serves `apps/dev-shell` on port 5173. Never start a dev server through a plain
shell when preview tooling is available.

A component page contains only its demos. `pages/docs.js` builds the header,
navigation, table of contents, and per section an editable code pane beside a
live preview. The markup inside `<template>` is the single source for both the
code pane and the preview, so they cannot drift apart.

`pages/Tokens.html` renders every token off `:root` and cross-checks every
`var(--x)` against every `--x:` declaration. An undefined token shows as a red
row. Check it after touching `main.css`.

### The dark stage does not reflect the library

`docs.css` swaps the stage background and sets a light `color` on `.pc-stage`.
It does not redefine the library's tokens. Every component that sets a colour
through a token therefore renders dark text on the dark stage.

That is the library's current state, not a bug in the component being edited.
Dark mode arrives when `main.css` gets its pass. Do not work around it in a
component — not with `light-dark()`, and not by leaving a colour unset so it
inherits the stage's. A component that looks right on the dark stage today is
wrong everywhere else.

## Known debt

Report these. Do not fold them into an unrelated change.

- **Thirteen tokens render red in `pages/Tokens.html`** — `--toast-gap`,
  `--toast-max-width`, `--toast-offset`, `--toast-stack-overlap`,
  `--toast-swipe-x`, `--toast-swipe-y`, `--menu-radius`, `--menu-min-width`,
  `--menu-offset`, `--menu-item-radius`, `--progress-color`,
  `--progress-track-color`, `--z-index-tooltip`. Every one is used with a
  fallback — `var(--progress-color, var(--progress-base))` — so they are the
  consumer's tuning surface working as intended, not missing declarations. The
  page cannot tell a guarded reference from an unguarded one and paints both
  red. The debt is in the tool, not the tokens.

- **`soft` vs `smooth`.** Down to one file: `avatar.css` is the only stylesheet
  still using `soft` for the middle shape, against `smooth` in twenty-three
  others. Its header also claims "soft is the default, as everywhere else",
  which is no longer true of anywhere else.

- **`md` missing.** Six component files have no `&.md` block: `a-tag.css`,
  `loading.css`, `toast.css`, `swap.css`, `menu-grid.css`, `Form/label.css`.
  Some are correct because the base already is `md` or the component has no
  size; some are unfinished. Each needs deciding, not assuming.

- **`light-dark()` in the wild.** `alert.css` and `Menu/menu.css` use it while
  the rest of the library waits for the dark-mode pass in `main.css`. Do not
  spread it further until that pass is decided.

- **`main.css` structure.** `--font-size-base` is declared twice, at lines 62
  and 77 with the same value. `#app` at line 10 is a dev-shell layout rule that
  does not belong in the library.

- **`SemanticNotes/`** is referenced by name in older documents but does not
  exist. The subject is real: WebKit drops list semantics from `<ol>`/`<ul>`
  styled `list-style: none`, which affects list, nav, breadcrumbs, pagination
  and menu — all of which set it. CSS cannot fix this; `role="list"` in markup
  can.

## Shared memory

`~/Documents/AI-Vault` is long-term memory shared with Codex.
`AI-Vault/AGENTS.md` is the protocol. Start at
`30-Beslut/purecomponents-*.md` — decisions already made. Search there before
proposing something already settled. Never delete another agent's note;
correct it or archive it.
