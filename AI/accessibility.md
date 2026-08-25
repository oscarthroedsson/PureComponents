# Accessibility Guidelines

This document provides comprehensive accessibility guidelines for PureComponents, ensuring WCAG 2.1 Level AA compliance.

## Table of Contents

- [WCAG 2.1 Level AA Standards](#wcag-21-level-aa-standards)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Color Contrast](#color-contrast)
- [Semantic HTML](#semantic-html)
- [ARIA Attributes](#aria-attributes)
- [Form Accessibility](#form-accessibility)
- [Testing Checklist](#testing-checklist)
- [Resources](#resources)

## WCAG 2.1 Level AA Standards

PureComponents adheres to WCAG 2.1 Level AA standards, which include:

### Perceivable
- **1.3.1 Info and Relationships**: Information, structure, and relationships are programmatically determined
- **1.4.3 Contrast (Minimum)**: Text has a contrast ratio of at least 4.5:1 (normal text) or 3:1 (large text)
- **1.4.4 Resize Text**: Text can be resized up to 200% without loss of functionality
- **1.4.5 Images of Text**: Avoid using images of text

### Operable
- **2.1.1 Keyboard**: All functionality is available via keyboard
- **2.1.2 No Keyboard Trap**: Keyboard focus is not trapped
- **2.4.1 Bypass Blocks**: Skip links allow bypassing repetitive content
- **2.4.2 Page Titled**: Pages have descriptive titles
- **2.4.3 Focus Order**: Focus order is logical
- **2.4.4 Link Purpose**: Link purpose is clear from context
- **2.4.6 Headings and Labels**: Headings and labels are descriptive
- **2.4.7 Focus Visible**: Focus indicators are visible

### Understandable
- **3.2.1 On Focus**: No context changes on focus
- **3.2.2 On Input**: No context changes on input
- **3.3.1 Error Identification**: Errors are identified and described
- **3.3.2 Labels or Instructions**: Labels or instructions are provided
- **3.3.3 Error Suggestion**: Error suggestions are provided
- **3.3.4 Error Prevention**: Forms have error prevention

### Robust
- **4.1.1 Parsing**: Markup is valid
- **4.1.2 Name, Role, Value**: UI components have accessible names, roles, and values

## Keyboard Navigation

All interactive elements must be keyboard accessible:

### Tab Navigation
- **Tab**: Move forward through focusable elements
- **Shift + Tab**: Move backward through focusable elements
- **Enter/Space**: Activate buttons, links, and form controls

### Arrow Keys
- **Arrow Keys**: Navigate within components (menus, lists, etc.)
- **Home/End**: First/last item in a group
- **Escape**: Close dialogs, menus, dropdowns

### Focus Indicators
- All focusable elements MUST have visible focus indicators
- Focus indicators MUST meet 3:1 contrast ratio
- Use `:focus-visible` for keyboard focus (not mouse focus)

```css
.element:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 1px var(--color-neutral-100);
}
```

## Screen Reader Support

### Semantic HTML
Use semantic HTML elements:
- `<button>` for buttons
- `<a>` for links
- `<nav>` for navigation
- `<main>` for main content
- `<header>`, `<footer>`, `<section>`, `<article>`

### ARIA Labels
- Use `aria-label` for icon-only buttons
- Use `aria-labelledby` to reference visible labels
- Use `aria-describedby` for help text and error messages

### ARIA Roles
- Use native HTML elements over ARIA roles when possible
- Use `role="alert"` for important messages
- Use `role="status"` for less urgent messages
- Use `role="dialog"` for modals (or native `<dialog>`)

## Focus Management

### Focus Trapping
- Dialogs MUST trap focus within the dialog
- When dialog closes, focus MUST return to trigger element
- Use JavaScript to implement focus trapping

### Skip Links
- Provide skip links to main content and navigation
- Skip links MUST be first focusable elements
- Skip links MUST be hidden by default, visible on focus

### Focus Order
- Focus order MUST be logical and follow visual order
- Avoid `tabindex` values greater than 0
- Use `tabindex="-1"` to remove from tab order (not to add)

## Color Contrast

### Text Contrast
- **Normal text** (under 18pt): 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): 3:1 contrast ratio

### UI Component Contrast
- **Focus indicators**: 3:1 contrast ratio
- **Form controls**: 3:1 contrast ratio
- **Graphical objects**: 3:1 contrast ratio

### Color Independence
- Never rely solely on color to convey information
- Use icons, text, or patterns in addition to color

## Semantic HTML

### Use Native Elements
Prefer native HTML elements:
- `<button>` instead of `<div role="button">`
- `<nav>` instead of `<div role="navigation">`
- `<dialog>` instead of `<div role="dialog">`
- `<progress>` instead of `<div role="progressbar">`

### Headings
- Use proper heading hierarchy (h1 → h2 → h3)
- Don't skip heading levels
- Use one h1 per page

### Lists
- Use `<ul>` or `<ol>` for lists
- Use `<li>` for list items
- Don't use lists for layout

## ARIA Attributes

### Common ARIA Attributes

#### aria-label
```html
<button aria-label="Close dialog">×</button>
```

#### aria-labelledby
```html
<div id="dialog-title">Dialog Title</div>
<dialog aria-labelledby="dialog-title">...</dialog>
```

#### aria-describedby
```html
<input aria-describedby="email-help email-error" />
<p id="email-help">Help text</p>
<p id="email-error" role="alert">Error message</p>
```

#### aria-current
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><span aria-current="page">Current Page</span></li>
  </ol>
</nav>
```

#### aria-expanded
```html
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu">...</ul>
```

#### aria-invalid
```html
<input type="email" aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" role="alert">Invalid email</p>
```

#### aria-live
```html
<div role="status" aria-live="polite">Changes saved</div>
<div role="alert" aria-live="assertive">Error occurred</div>
```

## Form Accessibility

### Labels
- ALL form inputs MUST have associated labels
- Use `<label for="input-id">` or wrap input in label
- Don't use placeholder as label

```html
<!-- Method 1: Explicit association -->
<label for="email">Email</label>
<input type="email" id="email" />

<!-- Method 2: Implicit association -->
<label>
  Email
  <input type="email" />
</label>
```

### Error Handling
- Errors MUST be associated with inputs via `aria-describedby`
- Inputs with errors MUST have `aria-invalid="true"`
- Error messages MUST have `role="alert"`

```html
<label for="email">Email</label>
<input 
  type="email" 
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">Invalid email address</p>
```

### Required Fields
- Use `required` attribute
- Indicate required fields visually (asterisk, text)
- Announce required status to screen readers

### Field Groups
- Use `<fieldset>` and `<legend>` for related form fields
- Radio buttons MUST be grouped in fieldset
- Checkbox groups can use fieldset

```html
<fieldset>
  <legend>Choose an option</legend>
  <input type="radio" id="opt1" name="choice" value="1" />
  <label for="opt1">Option 1</label>
  <input type="radio" id="opt2" name="choice" value="2" />
  <label for="opt2">Option 2</label>
</fieldset>
```

## Testing Checklist

### Manual Testing

#### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Escape key closes dialogs/menus
- [ ] Arrow keys work in menus/lists

#### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with TalkBack (Android)
- [ ] All content is announced correctly
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Button purposes are clear

#### Visual Testing
- [ ] Color contrast meets requirements
- [ ] Text is readable at 200% zoom
- [ ] Focus indicators are visible
- [ ] Information doesn't rely solely on color

### Automated Testing

#### Tools
- [ ] axe DevTools
- [ ] WAVE (Web Accessibility Evaluation Tool)
- [ ] Lighthouse Accessibility Audit
- [ ] Pa11y

#### Checks
- [ ] No critical accessibility violations
- [ ] ARIA attributes are valid
- [ ] Semantic HTML is used correctly
- [ ] Color contrast passes

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Component-Specific Guidelines

### Buttons
- [ ] Icon-only buttons have `aria-label`
- [ ] Toggle buttons use `aria-pressed`
- [ ] Disabled buttons use `:disabled` pseudo-class
- [ ] Focus indicators are visible

### Forms
- [ ] All inputs have labels
- [ ] Error messages use `aria-describedby`
- [ ] Invalid inputs use `aria-invalid="true"`
- [ ] Required fields are indicated

### Navigation
- [ ] Navigation uses `<nav>` element
- [ ] Navigation has `aria-label`
- [ ] Current page uses `aria-current="page"`
- [ ] Skip links are provided

### Dialogs
- [ ] Dialog has `aria-labelledby`
- [ ] Close button has `aria-label`
- [ ] Focus is trapped in dialog
- [ ] ESC key closes dialog
- [ ] Focus returns to trigger

### Tables
- [ ] Table has `<caption>` or `aria-label`
- [ ] Headers use `<th>` with `scope`
- [ ] Sortable columns use `aria-sort`
- [ ] Complex tables have proper structure

## Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Windows, free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows, paid)
- [VoiceOver](https://www.apple.com/accessibility/vision/) (macOS/iOS, built-in)
- [TalkBack](https://support.google.com/accessibility/android/answer/6283677) (Android, built-in)

### Color Contrast Checkers
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

## Best Practices

1. **Test Early and Often**: Test accessibility throughout development
2. **Use Semantic HTML**: Prefer native elements over ARIA
3. **Keyboard First**: Ensure keyboard accessibility before mouse interactions
4. **Screen Reader Testing**: Test with actual screen readers
5. **User Testing**: Test with real users with disabilities
6. **Documentation**: Document accessibility requirements in code
7. **Continuous Improvement**: Keep up with accessibility best practices

## Common Mistakes to Avoid

1. ❌ Using `<div>` for buttons instead of `<button>`
2. ❌ Missing labels on form inputs
3. ❌ Using `tabindex="1"` or higher
4. ❌ Relying solely on color for information
5. ❌ Missing focus indicators
6. ❌ Not testing with screen readers
7. ❌ Using `display: none` on content that should be accessible
8. ❌ Missing `alt` text on images
9. ❌ Not providing skip links
10. ❌ Trapping focus incorrectly

---

**Remember**: Accessibility is not optional. It's a fundamental requirement for inclusive design.
