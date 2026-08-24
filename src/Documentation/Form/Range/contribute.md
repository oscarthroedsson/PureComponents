# Range — how it is built

## Everything derives from one variable

`--range-track-size` is the only number. The thumb is `0.75` of it, the block
padding `0.25`, the inline padding `0.5`, and the fill height is the track
minus twice the block padding. A size class sets that one variable and the
whole control follows — which is why the size blocks are one line each.

## Why the fill is a gradient

`appearance: none` is required to style the track at all, and once it is set
Chromium has no pseudo-element for the filled portion. So the track's
background is a hard-stop `linear-gradient` at `--range-value`.

The consequence is documented in the header and in usage.md: the fill needs a
line of consumer JavaScript to follow the thumb. That is a deliberate trade —
the alternative was leaving the control fully native, which would have meant
no track styling, no shape classes and no size classes.

## The vendor pseudo-elements are written twice

`::-webkit-slider-runnable-track` / `::-moz-range-track` and
`::-webkit-slider-thumb` / `::-moz-range-thumb` cannot be combined into one
selector list — if either engine does not recognise a selector in the list, it
drops the whole rule. So each pair is written out separately with the same
body. This is one of the few places in the library that repeats itself, and it
has to.

WebKit also needs `margin-block-start` on the thumb to centre it against the
track; Firefox centres it natively and would be pushed off by the same rule.

## The invalid state is on the thumb

A range has no border to turn red, so the thumb carries it — the part that
answers for the value. It sits **before** `:disabled` on purpose: same
specificity, so source order decides, and a disabled control must not read as
wrong.

## Known, measured failure

`--color-error` is `#f87171`, 2.77:1 on white, under the 3:1 of 1.4.11 for the
invalid thumb. Used anyway by decision, pending a darker error token — the same
call `textarea.css` and `input.css` record.

## Design tokens

`--color-neutral-*`, `--color-primary`, `--color-error`, `--radius-*`.
`color-mix()` is used once, for the primary thumb's border, which AGENTS.md
§4.4 allows.
