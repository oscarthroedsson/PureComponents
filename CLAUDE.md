# CLAUDE.md

@AGENTS.md

**`AGENTS.md` is the contract for this repo — read it before doing anything
here.** It covers what PureUI is, the CSS conventions, the accessibility floor,
the dev shell, and what "done" means. If a rule needs changing, change it there,
not here. This file holds only what is specific to Claude Code.

---

## The one rule that gets broken most

Before editing a file: say what you want to change and why, wait for approval,
then make only those changes. Findings along the way get reported — either by
stopping to ask, or after the agreed change is done. Never folded in silently.

This applies to `src/Styles/` above all. It is the library.

## Shared memory

`~/Documents/AI-Vault` is shared long-term memory with Codex. `AI-Vault/AGENTS.md`
is the protocol. For this project, start at:

- `10-Projekt/purecomponents.md` — where the project stands
- `30-Beslut/purecomponents-*.md` — decisions already made; search before proposing

Write back what is still true in a week: a decision and its reasoning, how
something actually works, where the project stands. Not code, not what the git
log already says. Never delete another agent's note — correct it or archive it.

## Verifying visually

This library is looked at, not unit-tested. A CSS change is not done until it
has been seen rendering.

Use the preview tooling — `preview_start` with `{name: "purecomponents-dev"}`
from `.claude/launch.json`, then `read_page` / screenshot on the relevant
`pages/` file. Never start the dev server through Bash.

Check every size, every state, keyboard focus, and both stage themes. Show
Oscar a screenshot rather than asking him to go and look.

### The dark stage lies

`docs.css` swaps the stage background and sets a light `color` on `.pc-stage`.
It does **not** redefine the library's tokens. So every component that sets a
colour through a token — which is every component that follows §4.4 — renders
dark text on the dark stage and looks broken there.

That is the library's state, not a bug in the component under your hands. Dark
mode arrives when `main.css` gets its pass, and every token-correct component
inherits it for free.

So: check the dark stage to see *what* it does, never to decide what a component
should do. Do not "fix" it in a component. Not with `light-dark()` — see
`AGENTS.md` §8 — and not by leaving a colour unset so the crumb inherits the
stage's. A component that looks right on the dark stage today is a component
that is wrong everywhere else.

## Scope discipline

- No subagents unless asked for.
- No refactors that were not agreed to. The known-debt list in `AGENTS.md` §8
  exists so those items can be reported instead of quietly fixed.
- Swedish in conversation. English in code, comments, docs and commits.
