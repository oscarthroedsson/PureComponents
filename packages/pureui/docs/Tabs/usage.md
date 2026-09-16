# Tabs

A row of choices in a shared box, and an optional set of panels that follow
the choice.

```html
<link rel="stylesheet" href="pureui/styles/main.css">
<link rel="stylesheet" href="pureui/styles/tabs.css">
```

## Without JavaScript

The key goes on a `<fieldset>`. Each tab is a `<label>` around a radio. The
browser owns selection, focus and the arrow keys.

```html
<fieldset class="pu-tabs tabs-md">
  <legend class="tabs-legend">Account settings</legend>

  <div class="tabs-header">
    <label class="tabs-tab" id="profile-tab">
      <input class="tabs-input" type="radio" name="account" value="profile" aria-controls="profile-panel" checked />
      <span>Profile</span>
    </label>
    <label class="tabs-tab" id="security-tab">
      <input class="tabs-input" type="radio" name="account" value="security" aria-controls="security-panel" />
      <span>Security</span>
    </label>
  </div>

  <div class="tabs-content">
    <div class="tabs-panel" id="profile-panel" role="region" aria-labelledby="profile-tab" tabindex="0">…</div>
    <div class="tabs-panel" id="security-panel" role="region" aria-labelledby="security-tab" tabindex="0">…</div>
  </div>
</fieldset>
```

Panels follow tabs **by position**: the second tab shows the second panel.
Keep the two lists in the same order. Up to ten tabs are supported.

A screen reader announces these as radio buttons, not tabs. That is correct
for what they are. Use the script-driven form where real tab semantics are
needed.

## With JavaScript

The key goes on a `<div>`. Each tab is a `<button role="tab">`. Your script
owns `aria-selected`, `tabindex`, the arrow keys and each panel's `hidden`.
PureUI only paints it.

```html
<div class="pu-tabs tabs-md">
  <div class="tabs-header" role="tablist" aria-label="Project">
    <button class="tabs-tab" type="button" role="tab" id="overview-tab" aria-controls="overview-panel" aria-selected="true">Overview</button>
    <button class="tabs-tab" type="button" role="tab" id="activity-tab" aria-controls="activity-panel" aria-selected="false" tabindex="-1">Activity</button>
  </div>

  <div class="tabs-content">
    <div class="tabs-panel" id="overview-panel" role="tabpanel" aria-labelledby="overview-tab" tabindex="0">…</div>
    <div class="tabs-panel" id="activity-panel" role="tabpanel" aria-labelledby="activity-tab" tabindex="0" hidden>…</div>
  </div>
</div>
```

## Header only

Leave out `tabs-content` and the header is a view switcher. What the checked
value changes is up to the page.

```html
<fieldset class="pu-tabs tabs-sm">
  <legend class="tabs-legend">Display format</legend>
  <div class="tabs-header">
    <label class="tabs-tab" data-icon-only="true">
      <input class="tabs-input" type="radio" name="view" value="list" aria-label="List format" />
      <svg aria-hidden="true">…</svg>
    </label>
    <label class="tabs-tab" data-icon-only="true">
      <input class="tabs-input" type="radio" name="view" value="grid" aria-label="Grid format" checked />
      <svg aria-hidden="true">…</svg>
    </label>
  </div>
</fieldset>
```

## Classes

| Class | Does |
|---|---|
| `.pu-tabs` | The key. On `<fieldset>` or `<div>`. |
| `tabs-legend` | The radio group's name. Not painted. |
| `tabs-header` | The box the tabs sit in. |
| `tabs-tab` | One tab. `<label>` or `<button>`. |
| `tabs-input` | The radio inside a label tab. |
| `tabs-content` | Optional. Holds the panels. |
| `tabs-panel` | One panel. |
| `tabs-sm` · `tabs-md` · `tabs-lg` | Size. `md` is the default. |
| `tabs-sharp` · `tabs-smooth` · `tabs-rounded` | Shape. |

## States

| State | Reached by |
|---|---|
| Selected | `checked` on the radio, or `aria-selected="true"` on the button |
| Disabled | `disabled` on the radio or button, or `aria-disabled="true"` |
| Hidden panel | `hidden` on the panel (script-driven form) |
| Icon only | `data-icon-only="true"` on the tab, `aria-label` on the radio or button |

## Markup the library cannot supply

- A unique `name` on each radio group outside a form.
- Exactly one `checked` radio.
- `aria-controls` from each tab to its panel, and `aria-labelledby` back.
- `tabindex="0"` on a panel with no focusable content.

## Variables

| Variable | Moves |
|---|---|
| `--tabs-radius` | The header corner. Tabs and panels follow it. |
| `--tabs-gap` | Space between header and panels. |
| `--tabs-header-background` | The header surface. |
| `--tabs-header-padding` | Space between the header edge and the tabs. |
| `--tabs-tab-selected-background` | The selected tab surface. |
| `--tabs-tab-selected-shadow` | The selected tab lift. |
| `--tabs-panel-background` | The panel surface. |
| `--tabs-panel-radius` | The panel corner. |
