# Audio

A frame around the native `<audio>` player. The browser draws the controls;
this component gives the player a border, a corner and a surface that match
the rest of the page.

## Quick start

```html
<audio class="pu-audio audio-md" controls src="episode.mp3">
  Your browser does not support audio playback.
  <a href="episode.mp3">Download the file</a>
</audio>
```

`controls` is required. Without it the browser draws nothing and there is no
player to frame.

## What this component styles

The frame — width, border, corner, surface, shadow — on every browser.

Inside the frame, the control strip is drawn by the browser. Chromium exposes
private pseudo-elements, so the surface, the text colour and the spacing
between controls follow the same variables there. Firefox and Safari expose
nothing, and their controls keep their native look inside the frame.

That is the ceiling for a CSS-only library. A player that looks identical
everywhere needs custom controls and script, which is a different component.

## Classes

| Class | Does |
|---|---|
| `.pu-audio` | The key. Requires `<audio>`. |
| `audio-sm` | Tighter control spacing. |
| `audio-md` | The default. |
| `audio-lg` | Wider control spacing. |
| `audio-sharp` | Square corners. |
| `audio-smooth` | The same radius `audio-md` already gives. |
| `audio-rounded` | Fully round ends. |

The sizes only move the spacing between controls, and only where the browser
allows it. They do not change the player's height — the browser owns that.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--audio-inline-size` | `50rem` | Player width. |
| `--audio-max-inline-size` | `100%` | Cap, so it never overflows its container. |
| `--audio-control-gap` | `var(--spacing-50)` | Space between controls. |
| `--audio-border-color` | `var(--color-border)` | Border. |
| `--audio-border-width` | `1px` | Border. |
| `--audio-radius` | `var(--radius-md)` | Corner. |
| `--audio-shadow` | `none` | Shadow. |
| `--audio-surface` | `var(--color-surface-sunken)` | Fill. |
| `--audio-color` | `var(--color-text)` | Text and icon colour. |

Set the width where you use it:

```html
<audio class="pu-audio audio-md" controls src="episode.mp3"
       style="--audio-inline-size: 30rem"></audio>
```

## Accessibility

- `controls` on the element. The native controls are keyboard accessible and
  correctly labelled; nothing here changes that.
- Put fallback content inside the element — a sentence and a download link.
  It is shown where `<audio>` is unsupported.
- Do not use `autoplay`. Sound starting without warning is disorienting, and
  it interferes with a screen reader.
- Speech and other spoken content need a transcript on the page. The player
  cannot provide one.
- Give the player a name when there is more than one on a page:
  `aria-label="Episode 12"`.
- The key requires `<audio>`. A `<div>` styled to look like a player has no
  media controls, no keyboard handling and no announcement.

## Examples

### Sizes

```html
<audio class="pu-audio audio-sm" controls src="clip.mp3"></audio>
<audio class="pu-audio audio-md" controls src="clip.mp3"></audio>
<audio class="pu-audio audio-lg" controls src="clip.mp3"></audio>
```

### Shape

```html
<audio class="pu-audio audio-md audio-sharp" controls src="clip.mp3"></audio>
<audio class="pu-audio audio-md audio-rounded" controls src="clip.mp3"></audio>
```

### Several sources

```html
<audio class="pu-audio audio-md" controls aria-label="Episode 12">
  <source src="episode.opus" type="audio/ogg; codecs=opus" />
  <source src="episode.mp3" type="audio/mpeg" />
  Your browser does not support audio playback.
  <a href="episode.mp3">Download the file</a>
</audio>
```

### With a shadow

```html
<audio class="pu-audio audio-md" controls src="clip.mp3"
       style="--audio-shadow: var(--shadow-md)"></audio>
```
