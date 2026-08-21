# Accordion — how it is built

**File:** `src/Styles/accordion.css`
**Key:** `.accordion`, on the wrapper
**Requires:** `collapsible.css`

## What this file is allowed to do

Only what appears when panels stand next to each other: the shared frame, the
dividers, the spacing. Padding, the marker, the open animation and the focus
ring belong to `collapsible.css`. If a rule here starts describing a single
panel's insides, it is in the wrong file.

This is the element/composition split from `AGENTS.md` §1, the same way
Pagination is built out of `.btn`.

## Composition through the tuning surface

The group does not restyle its children. It sets their variables:

```css
& > .collapsible {
  --collapsible-border-width: 0;
  --collapsible-radius: 0;
}
```

That is the mechanism worth protecting. It means the two files never fight over
the same property, a consumer's own variable overrides still land, and adding a
variant here costs no changes over there.

## The one place the two files touch

The size classes. `.accordion.sm > .collapsible` restates the same padding and
font-size values that `.collapsible.sm` sets, because a custom property
declared *on* an element cannot be overridden by inheritance from its parent —
the group has to assign them explicitly.

**The two tables have to stay in step.** Changing a size in `collapsible.css`
means changing it here too. It is the only duplication in the pair, and it is
flagged in a comment at the site.

The alternative — requiring the size class on every `<details>` — was rejected:
mixing sizes inside one group is not a real use case, and writing the size once
per row is worse markup for everyone who is not doing it.

Consequence to know about: inside a group, the group's size wins. A
`.collapsible.lg` inside an `.accordion.sm` renders small.

## Why there is no second wrapper class

Exclusive and non-exclusive groups look identical and share every line of CSS.
The difference is the native `name` attribute on the children. A class claiming
to control it could be falsified in one line of markup — drop `name`, keep the
class, get the other behaviour. Classes in this library describe a look;
`button.css` says the same thing about `.btn`.

## Why not the ARIA APG accordion pattern

The APG example is `<h3><button aria-expanded aria-controls>` plus
`<div role="region">`. It cannot be built here: `aria-expanded` has to be
flipped on click, and CSS cannot write attributes. The library ships no
JavaScript.

Nor should it be. ARIA's first rule is to use the native element when one
exists, and `<details>`/`<summary>` is that element. The APG catalogues
Disclosure and Accordion as two separate patterns — the same split as
`collapsible.css` and this file.

What was taken from the APG: the heading structure, and the keyboard contract
to verify against. Native `<summary>` already satisfies the latter — Enter and
Space, normal Tab order. Arrow-key navigation between headers is optional in
the pattern and is not provided.
