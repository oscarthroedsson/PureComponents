# Breadcrumbs — how it is built

File: `src/Styles/breadcrumbs.css`. Key class `.breadcrumbs`, on the `<ol>`.

## The separator is a variable, not a selector

A consumer cannot select `::after`. That is the whole reason
`--breadcrumbs-separator` exists rather than a set of override rules: the
variable is the only door into generated content, and AGENTS §4.3 says that is
what component variables are for.

Everything else about the separator follows from it. The variant classes
(`slash`, `chevron`, `arrow`, `dot`) are one line each and do nothing but
reassign the variable — no second mechanism, no rule that has to be kept in sync
with the first.

That is also why the ready-made mark is a string and not a drawn shape. DaisyUI
builds its chevron out of a rotated box with two borders, which is crisper, but
a box cannot be swapped for a character. It would make `chevron` behave unlike
every other separator in the file, and AGENTS §2 puts consistency above a
locally better solution.

Custom properties inherit, so the same variable set on an `<li>` changes only
that crumb's own `::after`. Per-crumb separators cost nothing extra; they fall
out of where the variable is declared.

## Why the mark sits on `li:not(:last-child)::after`

Not `li + li::before`. With `::after` the mark belongs to the crumb in front of
it, which is also where a consumer's own separator element goes — one place, one
mental model, and `li:last-child` silences both.

The known limit: `:last-child` matches the last element, not the last *visible*
one. Hide the final crumb with `display: none` and the crumb before it keeps its
separator. It is documented rather than worked around, because every fix for it
breaks a different case.

## `@supports` around the silenced mark

Generated content is read aloud by some screen readers — VoiceOver says "greater
than" between every crumb. `content: … / ""` empties the alternative text and
silences it.

The catch is what happens where that syntax is unknown: the whole declaration is
invalid, and the separator disappears entirely. So the plain rule is written
first and the silenced one sits inside `@supports (content: "x" / "")`. A
browser that cannot silence it still draws it; the failure mode is a spoken
separator, not a missing one.

## `:has()` for the consumer's own element

```css
& > li:has(> .breadcrumbs-separator)::after { content: none; }
```

The alternative was an attribute the consumer sets to say "I brought my own".
`:has()` removes that step: the element is its own announcement, and a gap with
two separators in it cannot be built by accident.

`& > li:last-child > .breadcrumbs-separator { display: none }` is the same
courtesy in the other direction — it lets a template loop emit identical markup
for every item without an `if not last`.

The crumb rule is written as `& > li > :not(.breadcrumbs-separator)`, so a
separator element does not pick up the crumb's padding, background and radius.

## Shape reaches one level down on purpose

```css
&.sharp,  & .sharp  { --breadcrumbs-radius: var(--radius-sharp); }
```

The same three words work on the list and on a crumb. No `:has()`, no
specificity fight: an inherited value is the weakest thing in the cascade, so an
element that declares the variable itself always beats the one it would have
inherited, and one that does not falls back to the list. "Mine if I have it,
otherwise my parent's" is built-in behaviour, not something written here.

Every crumb carries padding and `background-color: transparent` from the start.
Without them a radius is invisible and a consumer who sets a background gets a
tight, square chip and has to undo our work. With them,
`--breadcrumbs-crumb-background` is the only thing they set.

## Current page

Styled through `[aria-current="page"]`, never `:last-child`. The attribute is
what carries the meaning (AGENTS §4.6); the colour only follows it. A crumb that
never gets the attribute renders as a plain link, and that is deliberate — a
fallback to `:last-child` would make broken markup look finished and hide the
bug it exists to prevent.

Colour is not the sole carrier: the weight changes with it, and `aria-current`
says it outright to anyone not looking at the screen.

## Contrast

`--breadcrumbs-link-color` is `--color-neutral-500`, 4.8:1 on white. The obvious
lighter choice, `--color-neutral-400`, is 2.6:1 and fails the 4.5:1 floor — it
is used for the separator only, which is decoration and hidden from assistive
tech.

The previous version dimmed non-current crumbs with `opacity: 0.6`. That is gone.
Opacity multiplies against whatever is behind it, so the contrast of a crumb
became a property of the page's background rather than of this file.

## Known limits

- **Dark mode.** The colours are tokens, so this component inherits dark mode for
  free when `main.css` gets it. Until then the current crumb is
  `--color-neutral-900` and disappears on a dark background — the same as every
  other token-correct component in the library. See AGENTS §8.
- **RTL.** Spacing uses logical properties and follows the direction. The default
  `>` does not flip; swap `--breadcrumbs-separator` under `[dir="rtl"]`.
- **No collapse.** Long trails wrap. Choosing which crumbs to drop is a decision
  about content, not about CSS.
- **`role="list"`.** Required in markup, cannot be supplied from CSS. See
  `SemanticNotes/semantics-breadcrumbs.md`.
