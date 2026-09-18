# Input

A text field. One class covers every text-like `type`, and the type-specific
native marks are normalised so a date field lines up with a text field in the
same form.

## Quick start

```html
<input class="pu-input" type="email" name="email" />
```

Inside a form the size and shape come from the form. On its own the input
falls back to the same defaults.

## Classes

| Class | Does |
|---|---|
| `.pu-input` | The key. Requires `<input>`. |
| `input-sm` | 12px. |
| `input-md` | 14px. The default. |
| `input-lg` | 16px. |
| `input-sharp` | Square corners. |
| `input-smooth` | The default corner. |
| `input-rounded` | Fully round. |
| `input-ghost` | No fill, no border, until it is hovered or focused. |
| `.pu-input-group` | Wrapper for a field with an icon. |
| `.input-icon` | The icon itself. |

## Types

The class works on every text-like type. What each needs in order to match the
rest of the family is handled for you:

- **`number`** — the spinner is removed and digits are tabular, so a column of
  amounts lines up.
- **`search`** — the browser's ✕ is removed. Escape still empties the field.
- **`date`, `time`, `datetime-local`, `month`, `week`** — the picker indicator
  is made invisible but stays where it was, so it is still clickable and still
  reachable by keyboard. The field's height matches a text field exactly.

## Icons

An `<input>` is a void element and cannot hold children, so anything that
appears inside the box has to be a sibling laid over it. That is what
`.pu-input-group` is for.

```html
<div class="pu-input-group">
  <svg class="input-icon" data-placement="start" aria-hidden="true" viewBox="0 0 24 24">…</svg>
  <input class="pu-input" type="search" name="q" />
</div>
```

The control's padding grows only on the side that holds an icon.

A group is required **only** when there is an icon. A bare `.pu-input` needs
none and should not have one.

| Attribute | Does |
|---|---|
| `data-placement="start"` | Icon at the leading edge. |
| `data-placement="end"` | Icon at the trailing edge. |

### A button in the slot

An icon is decoration by default — clicking it focuses the field underneath.
Use a `<button class="input-icon">` when it should do something of its own,
and it takes its clicks back.

```html
<div class="pu-input-group">
  <input class="pu-input" type="password" id="pw" />
  <button class="input-icon" data-placement="end" type="button" aria-label="Show password">
    <svg aria-hidden="true" viewBox="0 0 24 24">…</svg>
  </button>
</div>
```

The group says nothing about which control it wraps, so it works around a
`.pu-select`, a `.pu-textarea` or a `.pu-file` too.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--input-font-size` | the form's scale | Type size. |
| `--input-padding-block` | the form's padding | Vertical padding. |
| `--input-padding-inline` | the form's padding | Horizontal padding, both sides. |
| `--input-padding-inline-start` | `--input-padding-inline` | Leading side alone. |
| `--input-padding-inline-end` | `--input-padding-inline` | Trailing side alone. |
| `--input-radius` | the form's radius | Corner. |
| `--input-border-width` | the form's border width | Border. |
| `--input-border-color` | the form's border colour | Border. |
| `--input-surface` | the form's surface | Fill. |
| `--input-color` | the form's text colour | Text. |
| `--input-placeholder-color` | `var(--color-text-subtle)` | Placeholder. |
| `--input-line-height` | `var(--line-height-base)` | Leading. |
| `--input-min-block-size` | derived | Minimum height. |

On the group:

| Variable | Default | Controls |
|---|---|---|
| `--input-group-icon-size` | `1em` | Icon box. Raise it for a wider mark like a currency symbol. |
| `--input-group-icon-gap` | `0.5em` | Space between the icon and the text. |
| `--input-group-icon-color` | `var(--color-text-subtle)` | Icon colour. |
| `--input-group-icon-inset` | the form's inline padding | Distance from the edge. |

## States

| State | Look |
|---|---|
| `:hover` | Border darkens. Not while disabled or read-only. |
| `:user-invalid` or `aria-invalid="true"` | Border turns to the error colour. |
| `:read-only` | Normal field, default cursor. Not greyed. |
| `:disabled` | Muted fill, muted text, not-allowed cursor. |

A read-only field is still a normal field: it takes focus, its text can be
selected and copied, and it is submitted with the form. It is not greyed,
because that is the one thing it is not.

A ghost field still shows that it is hovered, wrong or disabled. Only its
resting state is invisible.

## Accessibility

- Every input needs a label. See the Label docs.
- A placeholder is not a label. It disappears as soon as anyone types.
- Use the right `type`. It gives the correct keyboard on a phone and the right
  native validation.
- Use `autocomplete`. It is the difference between a form a password manager
  can fill and one it cannot.
- Bind hints and errors with `aria-describedby`, and set `aria-invalid="true"`
  when your own validation fails.
- A `<button class="input-icon">` needs an `aria-label`.
- A decorative icon needs `aria-hidden="true"`.
- The focus ring comes from the library. This component only clears the
  browser's outline for a mouse click, where `:focus-visible` never matches.

## Examples

### Sizes

```html
<input class="pu-input input-sm" />
<input class="pu-input input-md" />
<input class="pu-input input-lg" />
```

### Shape and variant

```html
<input class="pu-input input-sharp" />
<input class="pu-input input-rounded" />
<input class="pu-input input-ghost" />
```

### Search with a leading icon

```html
<div class="pu-input-group">
  <svg class="input-icon" data-placement="start" aria-hidden="true" viewBox="0 0 24 24">…</svg>
  <input class="pu-input" type="search" name="q" aria-label="Search" />
</div>
```

### A currency prefix

```html
<div class="pu-input-group" style="--input-group-icon-size: 1.5em">
  <span class="input-icon" data-placement="start" aria-hidden="true">USD</span>
  <input class="pu-input" type="number" name="amount" />
</div>
```

### A date field

```html
<div class="pu-field">
  <label class="pu-label" for="due">Due</label>
  <input class="pu-input" type="date" id="due" name="due" />
</div>
```

### Read-only

```html
<input class="pu-input" value="ORD-4821" readonly />
```
