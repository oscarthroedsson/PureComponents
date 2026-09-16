# Audio — contributing

## File

`packages/pureui/styles/audio.css`

## Key

```css
.pu-audio:where(audio)
```

The element carries the media controls, the keyboard handling and the
announcement. A `<div>` styled to look like a player carries none of it.

## What the file can and cannot reach

The frame is standard CSS on the element itself — width, border, corner,
surface, shadow. It works everywhere.

The control strip is drawn by the browser and reachable only through private
pseudo-elements:

```css
&::-webkit-media-controls-enclosure
&::-webkit-media-controls-panel
&::-webkit-media-controls-current-time-display
&::-webkit-media-controls-time-remaining-display
```

These are Chromium's, they are not specified, and they can change without
notice. They are used here for **progressive paint only** — surface, text
colour and control spacing. Nothing about the layout or the behaviour of the
player depends on them, so an engine that ignores them shows native controls
inside a styled frame, which is a correct result rather than a broken one.

Firefox and Safari expose nothing equivalent. Do not add a `-moz-` selector
alongside a `-webkit-` one in the same rule: a selector list holding one
unknown pseudo-element is dropped whole, so both would stop applying.

## The ceiling

A player that looks identical in every browser needs custom controls, which
needs script. That is out of scope for a CSS-only library, and it is why the
file styles a frame rather than trying to rebuild the strip.

## Sizes only move the gap

```css
&.audio-sm { --audio-control-gap: var(--spacing-25); }
```

The player's height is the browser's. The one dimension the size classes can
honestly move is the spacing between controls, and only where the private
pseudo-elements are honoured.

## `--audio-max-inline-size`

Defaults to `100%` alongside a `--audio-inline-size` of `50rem`, so the player
takes its preferred width where there is room and never overflows a narrower
container.

## Order inside the block

1. Variables
2. Base
3. Size
4. Shape
5. Vendor pseudo-elements

## Variables

| Variable | Default |
|---|---|
| `--audio-inline-size` | `50rem` |
| `--audio-max-inline-size` | `100%` |
| `--audio-control-gap` | `var(--spacing-50)` |
| `--audio-border-color` | `var(--color-border)` |
| `--audio-border-width` | `1px` |
| `--audio-radius` | `var(--radius-md)` |
| `--audio-shadow` | `none` |
| `--audio-surface` | `var(--color-surface-sunken)` |
| `--audio-color` | `var(--color-text)` |

`--audio-shadow` defaults to `none` rather than to a shadow token, so a player
is flat until someone asks otherwise. The property is declared regardless, so
setting the variable is enough.

`--audio-radius` is read by the enclosure pseudo-element as well as by the
element, so the corner does not square off inside the frame in Chromium.
