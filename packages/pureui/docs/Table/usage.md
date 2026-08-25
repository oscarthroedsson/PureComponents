# Table Component

## Component Overview

The Table component provides accessible, styled data tables with proper semantic HTML and ARIA attributes for sortable columns and complex data presentation.

### When to Use

- Tabular data display
- Data grids
- Comparison tables
- Structured information

### When NOT to Use

- Layout purposes (use CSS Grid or Flexbox)
- Simple lists (use List component)
- Card-based layouts (use Card component)

## Quick Start

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

## Accessibility Requirements

- **`<caption>` or `aria-label`** - Required for table description
- **`<th>` with `scope`** - Required for headers
- **`aria-sort`** - For sortable columns
- **Semantic structure** - Proper thead, tbody, tfoot

## API Reference

- `.table` - Base table class
- Size variants: `.sm`, `.md`, `.lg`
- Variants: `.striped`, `.bordered`
- Responsive: `.responsive` (mobile stacking)
- Sub-components: `.table-wrapper` for overflow

## Examples

See component CSS file for detailed examples.
