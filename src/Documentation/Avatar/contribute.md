# Avatar — how it is built and why

**File:** `src/Styles/avatar.css` · **Page:** `pages/Avatar.html`

Two keys in one file: `.avatar` and `.avatar-group`.

## The square is the whole design

An avatar is a square of a known size. Everything follows from
`--avatar-size`:

```css
inline-size: var(--avatar-size);
aspect-ratio: 1;
font-size: calc(var(--avatar-size) * var(--avatar-font-scale));
```

The version before this one built the size out of `padding` and `font-size`
instead, and every defect in that file came from it: a text avatar and a
picture avatar could never be the same size (which is what the `!important`
block marked `/* DOES NOT WORK */` was fighting), `JD` and `M` came out
different widths, the vertical centring was a hand-tuned `padding-top`, and
the key alone rendered a 10rem picture while `.md` rendered 5rem — so the key
alone was wrong, against §4.5.

Deriving the font size instead of tabulating it is what makes
`style="--avatar-size: 8rem"` produce readable initials at a size the library
never named. That is the argument for the fraction, and it is why
`--avatar-font-scale` is public.

## Why nothing is clipped

There is no `overflow: hidden`. The picture is kept inside the shape with
`border-radius: inherit` on the child instead.

That is a decision, not an oversight: the corner mark — presence dot, unread
count — is a separate component that will hang off the edge of this one, and a
clipping container would cut it off. `border-radius: inherit` also fixes a real
bug in the old file, which only rounded the picture under `.rounded`, so a
`soft` avatar had square picture corners inside a rounded box.

`object-fit: cover` sits in the base block rather than only on the child. It is
inert on a container and exactly right when the key sits on an `<img>`
directly, so one block serves both markups.

## The group writes its children's variables

```css
& .avatar {
  --avatar-size: var(--avatar-group-size);
  --avatar-radius: var(--avatar-group-radius);
}
```

This is the same pattern `accordion.css` uses against `.collapsible`, and for
the same unavoidable reason: a custom property declared **on** an element
cannot be reached by inheriting from the parent, so handing a value down has to
be a rule.

It replaces roughly 120 lines in the old file, which detected a uniform child
size with selectors like
`&:not(:has(> :where(:not(.avatar.sm)))) > .avatar.sm:not(:first-child)` and
then repeated the whole table three times over for the three overlap presets.

The cascade lands the right way round, and it is worth knowing why: the rule
above and `.avatar.sm` have the same specificity, so source order decides — and
`.avatar-group` is written after `.avatar`. A consumer's inline
`--avatar-size` still beats both.

## One distance, four sides

Every layout reassigns a single value:

```css
--avatar-group-space: var(--avatar-group-gap);              /* list */
--avatar-group-space: calc(-1 * var(--avatar-group-overlap)); /* stacked */
```

and direction decides only which side it lands on. Opening a stack is then one
declaration, not a rewritten rule set.

**The reverse directions use the end margin, not the start.** In `row-reverse`
a negative `margin-inline-start` lands past the neighbour it was meant to slide
under, and the first two avatars never overlap while the rest do. Measured in
the browser: with end margins every adjacent pair is −16px in all four
directions.

Both hover behaviours fall out on either axis with no rule of their own, and
that is the payoff of routing everything through one distance. `expand` only
reassigns `--avatar-group-space`; the direction block has already decided which
side reads it. `lift` only changes `z-index` and `scale`, neither of which knows
what an axis is. Verified in row, column and column-reverse.

### Two traps in the transition

Both were caught by measuring, not by reading:

1. `--transition-medium` is `0.3s ease` — duration **and** easing in one token.
   Pairing it with an easing of our own puts two timing functions in the same
   declaration, and the whole `transition` shorthand is thrown away, silently,
   leaving `all 0s`. The duration is written out here, as `toast.css` already
   does.

2. The `margin` shorthand stands for the four **physical** sides and does not
   carry `margin-inline-start`, which is the property that actually moves. The
   logical longhands are named one by one.

The margin is driven by a custom property, and that does still transition — the
child's computed margin changes, so the transition runs on it. Verified:
`getAnimations()` reports `margin-left`, `running`.

## Stacking order

Enumerated eight deep, first on top, exactly as `toast.css` does it.

First-on-top is not only taste. A rounded avatar still has a square box, so in
the overlap the corner of the avatar behind sits over the visible circle of the
one in front — and whoever paints on top takes the pointer. Descending from the
first avatar is what makes the pointer land where the eye says it should.

`sibling-index()` would collapse the enumeration into one `calc()`. It is
Chromium-only and not Baseline, so it stays a comment.

## lift has to outrank the enumeration, and `:where()` cannot

The first version of `lift` scaled the hovered avatar but never brought it
forward, and the cause was specificity, not logic.

The stacking enumeration is
`.avatar-group[data-layout="stacked"] > *:nth-child(3)` — **(0,3,0)**, because
`:nth-child` counts. The lift rule was
`.avatar-group[data-hover="lift"] > *:where(:hover, …)` — **(0,2,0)**, because
`:where()` deliberately counts as nothing. The enumeration won every time. The
avatar grew where it stood, which is the one thing lift is not supposed to do.

So the z-index lives in its own rule inside the stacked block, qualified with
**both** attributes:

```css
&[data-layout="stacked"] {
  /* …the enumeration… */
  &[data-hover="lift"] > *:is(:hover, :focus-visible, :has(:focus-visible)) {
    z-index: var(--avatar-group-lift-z);
  }
}
```

That is (0,4,0). It beats the enumeration and `data-stack-order="last"` alike,
and it does so by specificity rather than by source order, so reordering the
file cannot silently break it again. `:is()` rather than `:where()` here for
the same reason: its specificity has to count.

The rest of the effect — scale, ring, shadow — stays in the low-specificity
`:where()` block. It carries no z-index, which is exactly why it can afford to.

**The avatar does not move.** An earlier version nudged it up by
`--avatar-group-lift-offset`; that has been removed. It comes forward and grows
where it stands, and the row stays a row.

## The ring is box-shadow

Not `border`, which would change the size of the square. Not `outline`, which
is spoken for by the focus indicator — an avatar in a group can be a link.

Its colour has to be the surface behind the group, which the library cannot
know, so it is a variable with a documented instruction rather than a guess.
The old file hardcoded `white`, which was also the file's only breach of §4.4.

`lift` hands its ring colour down as a custom property rather than restyling
the avatar directly. Custom properties inherit, so it reaches the `.avatar`
whether the avatar is the hovered child itself or sits inside a wrapper — an
`<li>`, a link, or the coming indicator. Its shadow is `drop-shadow()` rather
than `box-shadow`, which the ring is already using, and it follows the
silhouette so a round avatar casts a round shadow.

## Selectors are written against `> *`, not `> .avatar`

So an avatar wrapped in an `<li>`, in a link, or in the indicator component is
carried by the same rules. `:where()` around the hover states keeps the
specificity at the group class, so a consumer can still override with one plain
class of their own.

## Tokens used

Colours `--color-neutral-100/200/700`, `--color-primary` · radius
`--radius-none/md/full` · `--spacing-50` · `--shadow-md` ·
`--font-weight-subheading`. No hardcoded colours; verified against the parsed
stylesheet.

`main.css` still declares `--size-avatar-sm/md/lg`, which point at
`--size-32/48/64` and have never been declared. They are unused by this file —
the measurements live here, in the component.

## Verified in the browser

Exact squares at 32/48/64 with text and picture identical; font size 0.4× the
box; picture radius tracking the box radius at 0/8/999; −16px between every
adjacent pair in all four directions; z-index 9→6 descending and `auto` under
`data-stack-order="last"`; the hovered avatar reaching z-index 20 from any
resting depth, including the backmost one and under
`data-stack-order="last"`, with `translate: none` and `scale: 1.12`; expand and
lift both reached by pointer **and** by Tab; group size beating a child's size class while a consumer's inline value
beats both.
