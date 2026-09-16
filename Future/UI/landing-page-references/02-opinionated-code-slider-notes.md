# Pure/UI landing page — opinionated semantic code comparison

Reference image: `02-opinionated-code-slider-reference.png`

## Purpose

Demonstrate Pure/UI's opinionated approach to semantic HTML and accessibility. Compare a common hand-built accordion against the actual Pure/UI accordion structure.

## Content

- Eyebrow: `OPINIONATED BY DESIGN`
- Heading: `Everyone should enjoy the web. Be inclusive.`
- Body: `Pure/UI expects the right semantic elements. That gives assistive technology the information it needs—and helps you build toward accessibility standards and legal requirements.`
- Closing line: `Better markup. Better experiences.`

## Layout

- Keep the default Pure/UI zinc-50 page and system typography.
- Copy occupies roughly 40% of the width; the code comparison occupies roughly 60%.
- The purple/cyan/yellow paint is one decorative SVG behind the code area only. It must not reduce text contrast.
- The code card is zinc-950 with readable mono typography and subtle elevation.

## Code comparison slider

- Build one code editor with two absolutely positioned code layers.
- The left state shows the common `div` + `onclick` + JavaScript approach.
- The right state uses the real Pure/UI markup: `.pu-accordion`, `.pu-collapsible`, native `<details>/<summary>`, and a shared `name="faq"`.
- A range input controls the reveal position through `clip-path` or an equivalent mask.
- The divider and drag handle are the only interaction chrome.
- Dragging should feel spring-like but remain directly controlled by the pointer or keyboard.

## Accessibility

- The comparison slider must be keyboard operable and have an accessible label.
- Do not claim that the library automatically guarantees legal compliance.
- Explain that semantic markup supports accessibility standards and legal requirements.
- Keep both code states available to assistive technology without reading duplicate clipped content; expose only the currently selected description or provide a separate text summary.
- Under `prefers-reduced-motion`, remove handle trails and use direct movement.

## Visual constraints

- Match the hero's exact non-condensed system font, weights, tracking, and page grid.
- No alternate display font.
- Keep paint restrained and limited to the code side.
- No component preview, dashboard widgets, glow borders, or unrelated decoration.

## Responsive behavior

- Stack copy above the code comparison on mobile.
- Keep the code horizontally readable; allow controlled horizontal scrolling inside each code layer if required.
- Preserve a sufficiently large slider handle and keyboard focus indicator.

