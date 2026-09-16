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
`var(--x)` against every `--x:` declaration. Check it after touching
`main.css`.

### The stage follows the library's scheme

The Mode control in the header drives one mode for the chrome, the stage and
the library. `docs.js` resolves it and sets `data-scheme` on `<html>`, which is
the attribute `main.css` reads, so the dark stage renders the library's own
dark tokens. What the stage shows is what a real page shows.

Colour in a component goes through the tokens, which already carry
`light-dark()`. Do not add a component-level dark override, and do not leave a
colour unset so it inherits the stage's.

## Known debt

Report these. Do not fold them into an unrelated change.

- **`soft` vs `smooth`.** `avatar.css` is the only stylesheet using `soft` for
  the middle shape — `avatar-soft` and `avatar-group-soft` — against `smooth`
  in twenty-one others.

- **Files with no size vocabulary.** `a-tag.css`, `loading.css`, `toast.css`,
  `swap.css` and `Form/label.css` ship no size classes at all. All five are
  correct: the link, the label and the swap slot take their scale by
  inheritance, loading follows its host, and toast passes size to the alert
  inside it.

- **Variables used but never declared.** `progress.css` reaches
  `--progress-color` and `--progress-track-color` through
  `var(--name, fallback)` without declaring them at the top of the key block.

- **"Demos only" is wrong in two places.** `pure.md` under Dev shell and
  `css-file.md` step 4 both say a component page holds nothing but its demos.
  `AI/PureUI/doc-page.md` says the page has four parts in order — title and
  intro, Elements, API table, Examples — and that is what every page actually
  is. One rule, three documents, two of them stale.

- **`AI/PureUI/doc-page.md` cannot be reached from the entry point.** It is the
  only rule for how a demo page is built. `CLAUDE.md` points at `pure.md`,
  whose document table lists six files and not this one, and nothing else in
  `AI/` links to it.

## Shared memory

`~/Documents/AI-Vault` is long-term memory shared with Codex.
`AI-Vault/AGENTS.md` is the protocol. Start at
`30-Beslut/purecomponents-*.md` — decisions already made. Search there before
proposing something already settled. Never delete another agent's note;
correct it or archive it.
