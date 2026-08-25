# Badge — how it is built

**File:** `src/Styles/badge.css` · **Demos:** `pages/Badge.html`

## The shape of the file

One key, `.badge`, everything nested inside it, in the order from
`AGENTS.md` §4.2: variables, base, content, size, shape, variants, intent,
states.

## Two ideas the whole file rests on

### 1. One measurement

`--badge-font-size` is the only number. Padding, gap and the icon box are all
`em`, so they follow it. A size class writes that one variable and nothing
else:

```css
&.lg { --badge-font-size: var(--font-size-md); }
```

`sm` is the exception that writes three variables. `--font-size-xs` is the
smallest type token in `main.css`, so below it the box can only get smaller by
giving back padding — which is the right lever anyway: a small badge is a
tight badge, not just a badge set in smaller type. Heights are 17 / 24.8 /
28.6px.

Same mechanism as `--avatar-size` in `avatar.css`. The payoff is the same: a
consumer who writes `style="--badge-font-size: 9px"` gets a badge the library
never named, correctly proportioned.

The scale is deliberately compressed — `--font-size-xs` / `sm` / `md`, so
10px / 12px / 14px. A badge is a badge at every size and never reaches body
text. The old file used 10 / 11 / 12px, a one-pixel spread that rendered
boxes 20, 21 and 22px tall; `sm`, `md` and `lg` were not distinguishable.

### 2. Colours are tokens, not calculations

Three variables carry every colour in the file, and each one is a plain token:

```css
--badge-background:   var(--color-neutral-200);
--badge-border-color: var(--color-neutral-400);
--badge-color:        var(--color-neutral-900);
```

A variant rewrites one or two of them to another token. This is the same shape
`card.css` uses, and matching it is the point — a page built from both has to
look like one library.

**The one derived colour in the file** is the text on an intent:

```css
&[data-intent="warning"] {
  --badge-background: var(--color-warning);
  --badge-border-color: var(--color-warning);
}

@supports (color: color-mix(in oklab, red 40%, black)) {
  &[data-intent="warning"] {
    --badge-color: color-mix(in oklab, var(--color-warning) 40%, var(--badge-intent-shade));
  }
}
```

A yellow badge then reads in dark olive instead of neutral black, and `outline`
and `ghost` inherit the same tone. 40% is a ceiling — `error` is the tightest
of the four and measures 5.34:1 there.

**Why `in oklab`, and why toward `--badge-intent-shade` rather than a token.**
Measured on the warning token:

| recipe | warning text | worst of four |
|---|---|---|
| `in oklab, … 40%, black` | `#463702` dark olive | **5.34** |
| `in oklab, … 40%, var(--color-neutral-900)` | `#625a3c` muddy | 3.32 ✗ |
| `in hsl, … 30%, black` | `#34301d` grey | 4.81 |
| `in oklch, … 40%, black` | all four turn **blue** | — |

`--color-neutral-900` is a blue-black, so mixing toward it drags the hue and
strips the chroma. `in oklch` breaks outright: black has no hue, and a polar
space has nothing to interpolate toward. `--badge-intent-shade` is the one
value in this file that is not a token — declared at the top of the key block
so a consumer can replace it, the escape §4.4 grants a translucent overlay.

**The `@supports` guard is not optional.** `color-mix()` is Chrome 111 /
Safari 16.2, about 93% of traffic. A `var()` inside a function defers
validation to computed-value time, so an unsupported mix does *not* fall back
to an earlier declaration — `color` falls back to **inherit**. Measured on a
page with light text: a warning badge came out near-white on pale yellow,
about 1.4:1. Outside the guard the base `--color-neutral-900` stands instead,
6.46:1 or better on all four fills.

There is no cascade trick that avoids this. Two declarations of `color`, the
second with a `var()` inside, does not degrade to the first.

### 3. Order inside the key block is load-bearing

`&.outline` is `.badge.outline`, specificity (0,2,0).
`&[data-intent="error"]` is `.badge[data-intent="error"]`, also (0,2,0). They
tie, so **source order decides**, and the variants have to be written *after*
the intents or an intent silently refills an outline badge. This was shipped
wrong once and caught by measuring, not by looking — a filled `outline` badge
looks like a badge.

The same reasoning puts SHAPE after SIZE.

## Things that were wrong before, and must not come back

**`display`.** The old file set `height` and `width` to `fit-content` on an
element with no `display` — an inline box, where both are inert and
`padding-block` paints without reserving room in the line. A badge in a
paragraph overlapped the line above it.

The dev shell hid it completely: `docs.css` makes every stage a flex
container, which blockified every badge on the page. Measured, the badges
computed to `display: block` — a value no consumer would ever get. The
**In Running Text** section on the demo page exists to keep this visible; do
not delete it.

**Inheriting the text colour.** The old file declared no `color` at all. Put
inside a `.btn`, which sets `color: var(--color-neutral-100)`, the badge
rendered near-white text on `#cbd5e1`.

**`line-height: fit-content`.** Not a valid value. The parser dropped it
silently.

## `text-box`, and why the badge has a block floor

`text-box: trim-both cap alphabetic` trims the half-leading a line box carries
above and below the glyphs, so the padding above the text equals the padding
below it. It sits on the **children**, not on the key:

```css
& > :is(h1, h2, h3, h4, h5, h6, p) { … text-box: trim-both cap alphabetic; }
```

It was on `.badge` itself first, and it did nothing there. `text-box-trim`
acts on a block container's own line boxes and is not inherited; a flex
container has none of its own, and the anonymous flex item bare text becomes
gets the initial `none`. Measured: `inline-flex` was 24.79px with the trim and
24.79px without, while `inline-block` was 18.80px against 24.79px.

Which leaves the trim reaching a wrapped child and never bare text. That is
what the floor on the key block is for:

```css
min-block-size: calc(1lh + (var(--badge-padding-block) * 2) + (var(--badge-border-width) * 2));
```

`1lh` is the height an untrimmed line of this text would take, so a trimmed
child is padded back out to the same box. Measured across bare text, `<p>`,
`<h1>`, `<h4>` and `<span>`, in all three sizes, in all three support
scenarios — full support, no `text-box`, and neither `text-box` nor `lh`:

```
             sm      md      lg
every case   17.0    24.8    28.6
```

That is also why the trim needs no `@supports`. A browser that cannot trim
lands on the floor anyway. The only thing it loses is 0.4px of optical
centring.

## `gap` and the anonymous flex item

`gap` on the badge spaces the text from an icon without any wrapper element.
A bare run of text inside a flex container becomes an *anonymous flex item*
and is spaced like any other child. Measured: `New` + `<svg>` at `gap: 20px`
is exactly 20px wider than the same markup at `gap: 0`; with text alone the
difference is 0. So the value costs nothing when there is nothing to space,
and no `:has()` guard is warranted.

## Deliberately not here

**The corner mark** — a presence dot, an unread count floating on an avatar or
a button. It is anchored to another element's edge, which is a different
primitive, and it is its own component (working name Indicator). Decided
alongside `avatar.css`, which is why nothing in that file clips its overflow.

**Interaction.** No hover, no active, no pointer response. The key is allowed
on `<a>` for a tag filter — which is why the focus ring and the
`text-decoration: none` reset are there — but not on `<button>`. A chip you
can press is Pill.

**A minimum inline size.** A single-digit `rounded` badge is a narrow oval
rather than a circle. Fixing it means `min-inline-size` tied to the block
size; it was left out of this pass rather than folded in silently.

## Tokens used

Colours: `--color-neutral-200/400/900`, `--color-info`, `--color-success`,
`--color-warning`, `--color-error`, `--color-primary` (focus).
Type: `--font-size-xs/sm/md`, `--font-weight-subheading`.
Shape: `--radius-none/md/full`.

No hardcoded colour anywhere. The only raw value is `--badge-border-width:
1px`, which is structural and exposed as a variable.
