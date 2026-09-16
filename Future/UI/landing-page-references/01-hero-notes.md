# Pure/UI landing page — hero

Reference image: `01-hero-reference.png`

## Purpose

Create the first impression: Pure/UI is a carefully designed, accessible component library that feels joyful rather than clinical. The hero should communicate product quality before the visitor reads the details.

## Content

- Wordmark: `Pure/UI`
- Navigation: `Components`, `Patterns`, `Docs`
- Primary action: `Get started`
- Eyebrow: `CSS-only • Accessible by default`
- Heading: `Build interfaces with joy.`
- Body: `Thoughtful, accessible components made from semantic HTML and modern CSS.`
- Actions: `Explore components`, `Read the docs`
- Install command: `npm install pureui`

## Layout

- Use a centered max-width container on the default zinc-50 surface.
- Header is slim, light, and separated with a subtle zinc border.
- Hero uses two columns: copy on the left and the mascot/component composition on the right.
- Preserve generous whitespace and a clear reading order.
- Use the same system font and global tokens defined in `main.css`.

## Mascot and component composition

- Use the existing Pure/UI red-panda asset; do not redraw or reinterpret the character.
- The joyful jump pose is the preferred starting reference.
- Surround the mascot with a restrained sample of real Pure/UI components: primary button, avatar group, status badge, checkbox, toggle, and toast.
- The components should feel like a coherent product ecosystem, not unrelated floating cards.

## Motion

- Mascot may have a very small idle float or landing motion.
- Component samples can enter with short staggered opacity/translate transitions.
- Keep continuous motion subtle. The hero must remain readable and calm.
- Respect `prefers-reduced-motion`; show the final state immediately.

## Visual constraints

- Default Pure/UI theme only: zinc neutrals, primary `#663399`, and the mascot's natural orange.
- Secondary colors appear only as functional states.
- No glassmorphism, neon, oversized blobs, or generic SaaS dashboard styling.
- Maintain accessible contrast and visible focus states.

## Responsive behavior

- Collapse to one column on narrow screens.
- Keep copy before the mascot in document order.
- Reduce the number of floating component samples on mobile.
- Ensure CTAs remain reachable without requiring the hero artwork to load.

