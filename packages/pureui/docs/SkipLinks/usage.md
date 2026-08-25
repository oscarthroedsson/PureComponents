# Skip Links Component

## Component Overview

The Skip Links component provides keyboard-accessible links that allow users to skip repetitive content and jump to main sections of the page.

### When to Use

- Every page with navigation
- Pages with repetitive header content
- Long pages with multiple sections
- Complex layouts

### When NOT to Use

- Single-page applications without navigation
- Very short pages
- Pages without repetitive content

## Quick Start

```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#navigation" class="skip-link">Skip to navigation</a>
  
  <nav id="navigation">...</nav>
  <main id="main-content">...</main>
</body>
```

## Accessibility Requirements

- **First focusable elements** - Must be first in tab order
- **Hidden by default** - Positioned off-screen
- **Visible on focus** - Appears when focused
- **High contrast** - Meets WCAG contrast requirements
- **Target IDs** - Target elements must have id attributes

## API Reference

- `.skip-link` - Skip link class
- Size variants: `.sm`, `.md`, `.lg`
- Container: `.skip-links` for multiple links

## Examples

See component CSS file for detailed examples.
