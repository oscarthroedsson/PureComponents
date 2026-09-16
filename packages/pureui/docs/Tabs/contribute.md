# Tabs — contributing

## File

`packages/pureui/styles/tabs.css`

## Key

`.pu-tabs:where(fieldset, div)`. The fieldset is the native group for the
radio form. The div is for the script-driven form, where the header carries
`role="tablist"` and HTML has no element to insist on.

## One look, two markups

Every state is written for both forms at once:

```css
&:is(:has(> .tabs-input:checked), [aria-selected="true"]) { … }
&:is(:has(> .tabs-input:disabled), :disabled, [aria-disabled="true"]) { … }
```

A change to the look goes in one place and reaches both. Do not add a rule
that only one form can reach unless the other form has no equivalent.

## Panels follow tabs by position

Without JavaScript the tabs sit in `tabs-header` and the panels in
`tabs-content`, so they are no longer siblings. CSS cannot match a radio's
`aria-controls` to a panel's `id` — no selector compares two attribute
values — so the link is the position:

```css
&:has(> .tabs-header > .tabs-tab:nth-child(2 of .tabs-tab) > .tabs-input:checked)
  > .tabs-content > .tabs-panel:nth-child(2 of .tabs-panel) { display: block; }
```

`nth-child(n of S)` counts only tabs and only panels, so other children in
either wrapper do not shift the count. Ten positions are written out. Adding
an eleventh is one more line in the list.

The hide-all rule only applies when the header contains a `.tabs-input`. The
script-driven form is never hidden by position; it uses `hidden`, and
`&[hidden]` restores `display: none` because the panel's own rules would
otherwise beat the user-agent sheet.

## The radio covers its label

`.tabs-input` is absolutely positioned over the whole tab and paints nothing.
Focus lands on the radio, so the global `:focus-visible` outline from
`main.css` draws around the visible tab. The file draws no outline of its own.

## Nested radius

`--tabs-tab-radius` is `--tabs-radius` minus the header's padding, so a tab's
corner stays concentric with the header's. A size or shape class only moves
`--tabs-radius`; the tab follows.

`tabs-rounded` sets `--tabs-radius` to `--radius-rounded`, so the header and
tabs become pills. The panel follows the same variable but is capped by
`--tabs-panel-radius-max` (`--radius-lg`), the pattern every large surface
uses, so it stays a corner.

## Disabled

`--color-text-muted` and `--color-text-subtle` resolve to the same value in
dark mode, so colour alone does not mark a disabled tab there. The disabled
state also sets `--tabs-tab-disabled-opacity`.

## Icon-only tabs

An icon is `1em` against a `1.2em` text line. `data-icon-only` adds `0.1em`
to the block padding so an icon tab is exactly as tall as a text tab in the
same header.

## Order inside the block

1. Variables
2. Base — fieldset reset, legend, header, tab, input, content, panel,
   positional rules
3. Size
4. Shape
5. States — hover, selected, disabled, forced colours, reduced motion
