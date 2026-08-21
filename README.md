# PureComponents

A lightweight, CSS-only component library built with accessibility (a11y) as a core principle. PureComponents follows WCAG 2.1 Level AA standards and provides semantic, keyboard-accessible components that work without JavaScript.

## Table of Contents

- [Introduction](#introduction)
- [Accessibility Commitment](#accessibility-commitment)
- [Getting Started](#getting-started)
- [Components](#components)
- [Design Tokens](#design-tokens)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Introduction

PureComponents is a CSS-only component library designed to deepen understanding of semantic HTML and accessible design patterns. This library emphasizes:

- **Semantic HTML**: Using native HTML elements where possible
- **Accessibility First**: WCAG 2.1 Level AA compliance
- **No JavaScript Required**: Pure CSS implementation
- **Lightweight**: Minimal CSS footprint
- **Easy to Use**: Simple class-based styling

## Accessibility Commitment

PureComponents is committed to accessibility. All components are designed to meet WCAG 2.1 Level AA standards, including:

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Proper ARIA attributes
- ✅ Focus management
- ✅ Color contrast compliance (4.5:1 for text, 3:1 for UI)
- ✅ Semantic HTML structure

For detailed accessibility guidelines, see [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/PureComponents.git
cd PureComponents
```

### Basic Usage

1. Include the CSS files in your HTML:

```html
<link rel="stylesheet" href="./src/Styles/main.css" />
<link rel="stylesheet" href="./src/Styles/button.css" />
<!-- Add other component CSS files as needed -->
```

2. Use semantic HTML with PureComponents classes:

```html
<button class="btn md">Click me</button>
```

### Project Structure

```
PureComponents/
├── src/
│   ├── Styles/
│   │   ├── Form/
│   │   │   └── inputs/
│   │   │       ├── checkbox.css
│   │   │       ├── radio.css
│   │   │       ├── select.css
│   │   │       ├── text.css
│   │   │       ├── textarea.css
│   │   │       └── ...
│   │   ├── button.css
│   │   ├── nav.css
│   │   ├── dialog.css
│   │   └── ...
│   ├── Documentation/          # usage.md + contribute.md per component
│   └── ...
├── pages/                      # dev preview — one page per component
│   ├── components.js           # the registry that drives navigation
│   ├── docs.css                # dev shell styling
│   ├── docs.js                 # dev shell runtime
│   └── Button.html, ...
├── index.html                  # component index
├── README.md
└── ACCESSIBILITY.md
```

### Development preview

```bash
npm run dev
```

`index.html` lists every component. Each component page shows its variants and
states, with an editable HTML pane next to a live preview — change a class and
the preview updates immediately. The top bar switches the preview between light,
dark and a transparency grid, constrains it to 768px or 375px, and can outline
every element.

The preview shell (`pages/docs.css`, `pages/docs.js`, `pages/components.js`) is
development tooling and is not part of the library. The library itself remains
CSS-only.

Adding a component: create its CSS under `src/Styles/`, add an entry to
`pages/components.js`, and copy an existing page in `pages/`. See
[pages/README.md](./pages/README.md).

## Components

### Form Components

#### Button

```html
<button class="btn md">Button</button>
<button class="btn md secondary">Secondary</button>
<button class="btn md" disabled>Disabled</button>
<button class="btn md" aria-label="Close dialog">×</button>
```

**Accessibility Requirements:**
- Icon-only buttons MUST have `aria-label`
- Toggle buttons should use `aria-pressed="true/false"`
- Use `:disabled` pseudo-class (not `[disabled]` attribute)

**Variants:** `sm`, `md`, `lg`, `secondary`, `tertiary`, `sharp`, `smooth`, `rounded`

#### Text Input

```html
<div class="formField">
  <label for="email">Email</label>
  <input 
    type="email" 
    id="email" 
    class="input md"
    aria-describedby="email-help email-error"
  />
  <p id="email-help" class="helpText">Enter your email</p>
  <p id="email-error" class="status" role="alert">Error message</p>
</div>
```

**Accessibility Requirements:**
- MUST have associated `<label>` with `for="input-id"`
- Error messages use `aria-describedby`
- Inputs with errors use `aria-invalid="true"`

#### Checkbox

```html
<div class="formField">
  <label for="agree" class="checkbox-label">
    <input type="checkbox" id="agree" class="checkbox md" />
    I agree to the terms
  </label>
</div>
```

**Accessibility Requirements:**
- MUST have associated `<label>`
- Indeterminate state: `aria-checked="mixed"`

#### Radio Buttons

```html
<fieldset class="radio-group">
  <legend>Choose an option</legend>
  <div class="radio-item">
    <input type="radio" id="option1" name="choice" class="radio" value="1" />
    <label for="option1" class="radio-label">Option 1</label>
  </div>
</fieldset>
```

**Accessibility Requirements:**
- MUST be grouped in `<fieldset>` with `<legend>`
- All radios in group share same `name` attribute

#### Select

```html
<div class="formField">
  <label for="country">Country</label>
  <select id="country" class="select md" aria-describedby="country-help">
    <option value="">Choose a country</option>
    <option value="us">United States</option>
  </select>
  <p id="country-help" class="helpText">Select your country</p>
</div>
```

#### Textarea

```html
<div class="formField">
  <label for="message">Message</label>
  <textarea 
    id="message" 
    class="textarea md" 
    rows="4"
    aria-describedby="message-help"
  ></textarea>
  <p id="message-help" class="helpText">Enter your message</p>
</div>
```

### Navigation Components

#### Navigation

```html
<nav aria-label="Main navigation">
  <ul class="nav md">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

**Accessibility Requirements:**
- MUST use `<nav>` element
- MUST have `aria-label` or `aria-labelledby`
- Current page uses `aria-current="page"`

#### Skip Links

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#navigation" class="skip-link">Skip to navigation</a>
```

**Accessibility Requirements:**
- MUST be first focusable elements
- Hidden by default, visible on focus

### Interactive Components

#### Dialog/Modal

```html
<dialog id="dialog" class="dialog md" aria-labelledby="dialog-title">
  <div class="dialog-header">
    <h2 id="dialog-title">Dialog Title</h2>
    <button class="dialog-close" aria-label="Close dialog">×</button>
  </div>
  <div class="dialog-body">Content</div>
  <div class="dialog-footer">
    <button class="btn" onclick="dialog.close()">Close</button>
  </div>
</dialog>
```

**Accessibility Requirements:**
- MUST have `aria-labelledby` pointing to title
- Close button MUST have `aria-label`
- Focus trap required (JavaScript)
- ESC key closes (native `<dialog>`)

#### Tooltip

```html
<button class="tooltip" aria-describedby="tooltip-1">
  Hover or focus me
  <span id="tooltip-1" role="tooltip" class="tooltip-content">Tooltip text</span>
</button>
```

**Accessibility Requirements:**
- Tooltip element MUST have `role="tooltip"` and `id`
- Trigger MUST have `aria-describedby` pointing to tooltip `id`
- Keyboard accessible (visible on focus)

### Feedback Components

#### Alert

```html
<div class="alert error" role="alert" aria-live="assertive">
  <div class="alert-content">
    <h3 class="alert-title">Error</h3>
    <p class="alert-message">Something went wrong</p>
  </div>
  <button class="alert-close" aria-label="Close alert">×</button>
</div>
```

**Accessibility Requirements:**
- Use `role="alert"` for important messages
- Use `role="status"` for less urgent messages
- Include `aria-live="assertive"` or `aria-live="polite"`

#### Toast

```html
<div class="toast success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>Your changes have been saved</p>
  </div>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### Data Display Components

#### Table

```html
<table class="table md" aria-label="User data">
  <caption>User Information</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
    </tr>
  </tbody>
</table>
```

**Accessibility Requirements:**
- MUST have `<caption>` or `aria-label`
- Headers MUST use `<th>` with `scope="col"` or `scope="row"`
- Sortable columns use `aria-sort="ascending|descending|none"`

#### Progress

```html
<label for="progress1">Upload Progress</label>
<progress 
  id="progress1" 
  class="progress md" 
  value="45" 
  max="100"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="45"
  aria-label="Upload progress: 45%"
>45%</progress>
```

**Accessibility Requirements:**
- MUST have `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- MUST have `aria-label` or `aria-labelledby`

#### Pagination

```html
<nav aria-label="Pagination">
  <ul class="pagination md">
    <li>
      <a href="/page/prev" class="pagination-link" aria-label="Previous page">Previous</a>
    </li>
    <li>
      <span class="pagination-link" aria-current="page">2</span>
    </li>
    <li>
      <a href="/page/next" class="pagination-link" aria-label="Next page">Next</a>
    </li>
  </ul>
</nav>
```

**Accessibility Requirements:**
- MUST use `<nav>` with `aria-label`
- Current page uses `aria-current="page"`
- Previous/Next buttons use `aria-label`

## Design Tokens

PureComponents uses CSS custom properties (variables) for consistent theming:

### Colors

```css
--color-primary: hsl(142, 71%, 45%);
--color-secondary: hsl(189, 94%, 43%);
--color-neutral-100: #f1f5f9;
--color-neutral-900: #0f1729;
--color-success: #4ADE80;
--color-error: #F87171;
--color-warning: #facc15;
--color-info: #38BDF8;
```

### Spacing

```css
--spacing-25: 0.25rem;  /* 4px */
--spacing-50: 0.5rem;   /* 8px */
--spacing-75: 0.75rem;  /* 12px */
--spacing-100: 1rem;    /* 16px */
```

### Typography

```css
--font-size-sm: 0.75rem;   /* 12px */
--font-size-md: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.25rem;  /* 20px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-full: 999px;
```

See `src/Styles/main.css` for the complete list of design tokens.

## Browser Support

PureComponents supports:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Some features require modern CSS support:
- CSS custom properties (CSS Variables)
- `:focus-visible` pseudo-class
- `:has()` selector (for some components)

## Contributing

Contributions are welcome! Please ensure:

1. All components meet WCAG 2.1 Level AA standards
2. Components are keyboard accessible
3. Proper ARIA attributes are used
4. Focus indicators meet contrast requirements
5. Code follows existing patterns

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for detailed guidelines.

## License

You have full access to use any material in this repository, no credit required. However, you are not permitted to take this work and claim the design as your own, even with minor adjustments in your code.

---

**Note**: This is a learning project focused on semantic HTML and accessibility. While we strive for WCAG 2.1 AA compliance, always test components with real users and assistive technologies.
