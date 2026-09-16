# Select

A dropdown. It styles the native `<select>`, and where the browser supports it
the open menu is styled too — otherwise the platform keeps its own picker.

## Quick start

```html
<select class="pu-select" name="country">
  <option value="">Choose a country</option>
  <option value="se">Sweden</option>
  <option value="no">Norway</option>
</select>
```

## Classes

| Class | Does |
|---|---|
| `.pu-select` | The key. Requires `<select>`. |
| `select-sm` | 12px. |
| `select-md` | 14px. The default. |
| `select-lg` | 16px. |
| `select-sharp` | Square corners, and a sharp chevron. |
| `select-smooth` | The default corner and chevron. |
| `select-rounded` | Fully round, and a rounded chevron. |

The chevron's corners follow the box's — a sharp select gets a mitred mark, a
rounded one gets a curved tip.

## The open menu

On a device with a pointer, and where the browser supports it, the open list is
styled to match the control: same surface, same corner, its own padding and
highlight.

Everywhere else — a touch screen, or a browser without support — the control
above is what renders and the platform keeps its own picker. Nothing breaks;
the dropdown simply looks native when it opens.

## Multiple and list boxes

```html
<select class="pu-select" name="tags" multiple size="5">…</select>
```

A list box does not open, so it gets no chevron and no one-line floor.

## Icons

Use `.pu-input-group` for a leading icon. The chevron still owns the trailing
edge.

```html
<div class="pu-input-group">
  <svg class="input-icon" data-placement="start" aria-hidden="true" viewBox="0 0 24 24">…</svg>
  <select class="pu-select" name="country">…</select>
</div>
```

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--select-font-size` | the form's scale | Type size. |
| `--select-line-height` | `var(--line-height-base)` | Leading. |
| `--select-color` | the form's text colour | Text. |
| `--select-surface` | the form's surface | Fill. |
| `--select-padding-block` | the form's padding | Vertical padding. |
| `--select-padding-inline` | the form's padding | Horizontal padding. |
| `--select-border-width` | the form's border width | Border. |
| `--select-border-color` | the form's border colour | Border. |
| `--select-radius` | the form's radius | Corner. |
| `--select-icon-size` | `1em` | The chevron. |
| `--select-icon-color` | `var(--color-text-subtle)` | The chevron. |
| `--select-icon-inset` | the inline padding | Distance from the edge. |
| `--select-icon-gap` | `0.5em` | Space between the text and the chevron. |
| `--select-icon-image` | the smooth chevron | The mark itself. Replace it with your own. |

For the menu, where it is styled:

| Variable | Default | Controls |
|---|---|---|
| `--select-menu-surface` | `--select-surface` | Menu fill. |
| `--select-menu-border-color` | `var(--color-border)` | Menu border. |
| `--select-menu-radius` | the control's, capped | Menu corner. |
| `--select-menu-padding` | `var(--spacing-25)` | Padding around the options. |
| `--select-menu-shadow` | `var(--shadow-md)` | Menu shadow. |
| `--select-menu-offset` | `var(--spacing-25)` | Gap from the control. |
| `--select-menu-duration` | `var(--transition-fast)` | Open timing. |
| `--select-menu-travel` | `-0.25rem` | How far it slides in. |
| `--select-option-padding-block` | the control's | Option padding. |
| `--select-option-padding-inline` | the control's | Option padding. |
| `--select-option-radius` | `var(--radius-sm)` | Option corner. |
| `--select-option-highlight` | `var(--color-surface-muted)` | Highlighted option. |

```html
<select class="pu-select" style="--select-icon-color: var(--color-primary)">…</select>
```

## States

| State | Look |
|---|---|
| `:hover` | Border darkens. |
| `:user-invalid` or `aria-invalid="true"` | Border turns to the error colour. |
| `:disabled` | Muted fill, muted text and chevron, not-allowed cursor. |

There is no read-only state. `readonly` does nothing to a `<select>`. Locking a
choice is `disabled` plus a hidden input, or a single option.

## Accessibility

- Every select needs a label. See the Label docs.
- The first option should say what the field is for when nothing is chosen —
  `<option value="">Choose a country</option>` — and it should have an empty
  value so `required` works.
- Use `<optgroup>` for a long list. It is announced.
- Bind hints and errors with `aria-describedby`, and set `aria-invalid="true"`
  when your own validation fails.
- Do not replace a select with a scripted menu unless you need something a
  select cannot do. The native control is keyboard accessible, type-ahead
  searchable and works with every assistive technology.
- The focus ring comes from the library.

## Examples

### Sizes

```html
<select class="pu-select select-sm">…</select>
<select class="pu-select select-md">…</select>
<select class="pu-select select-lg">…</select>
```

### Shape

```html
<select class="pu-select select-sharp">…</select>
<select class="pu-select select-smooth">…</select>
<select class="pu-select select-rounded">…</select>
```

### In a field, required

```html
<div class="pu-field">
  <label class="pu-label" for="country">Country</label>
  <select class="pu-select" id="country" name="country" required>
    <option value="">Choose a country</option>
    <option value="se">Sweden</option>
    <option value="no">Norway</option>
  </select>
  <p class="pu-field-error">Choose a country.</p>
</div>
```

### Grouped options

```html
<select class="pu-select" name="city">
  <option value="">Choose a city</option>
  <optgroup label="Sweden">
    <option value="sto">Stockholm</option>
    <option value="got">Gothenburg</option>
  </optgroup>
  <optgroup label="Norway">
    <option value="osl">Oslo</option>
  </optgroup>
</select>
```

### A list box

```html
<select class="pu-select" name="tags" multiple size="5">
  <option value="css">CSS</option>
  <option value="html">HTML</option>
  <option value="js">JavaScript</option>
</select>
```
