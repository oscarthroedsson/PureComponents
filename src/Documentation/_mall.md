# Component Name

> Desciption of component

## Classes

| 🔹  | Prop       | Typ                                       | Default     | Beskrivning                   |
| --- | ---------- | ----------------------------------------- | ----------- | ----------------------------- |
| 🗝️  | `key`      | `formField`                               | `"primary"` | Styr stilen på komponenten    |
| 🎨  | `variant`  | `"primary"` \| `"secondary"` \| `"error"` | `"primary"` | Styr stilen på komponenten    |
| 📏  | `size`     | `"sm"` \| `"md"` \| `"lg"`                | `"md"`      | Justerar komponentens storlek |
| 🚫  | `disabled` | `boolean`                                 | `false`     | Inaktiverar komponenten       |

## Usage

```html
<div class="formField sm smooth">
  <div class="label-group">
    <label for="lastname">Name</label>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="tooltip sm"
      data-tip="This is an input"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  </div>

  <input type="text" id="lastname" required />
  <div class="formFieldFooter">
    <p class="status">Error</p>
    <p class="helpText">This is helpful</p>
  </div>
</div>
```

## Description

Text here
