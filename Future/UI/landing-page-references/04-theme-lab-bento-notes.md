# Pure/UI landing page — global Theme Lab bento

Start reference: `04-theme-lab-bento-start-reference.png`

Alternate-theme reference: `04-theme-lab-bento-alt-reference.png`

## Purpose

Show that Pure/UI is highly adaptable to a brand without changing component markup. The entire visible site becomes the demo: global tokens update the page, typography, component surfaces, spacing, shapes, and colors together.

## Start-state requirement

The section must enter in the normal Pure/UI theme so it fits naturally after the previous sections:

- zinc-50 page surface;
- white raised surfaces;
- system-ui heading and body typography;
- primary `#663399`;
- secondary `hsl(189 94% 43%)`;
- accent `hsl(46 98% 68%)`;
- heading tracking `-0.025em`;
- heading line-height `1.2`;
- spacing base `0.25rem`;
- radius base `8px`.

Do not begin in the alternate serif/coral theme.

## Full-width nested bento layout

- The section is `w-full` and uses an invisible 12-column grid with varied row heights.
- Every major region has a different span and contains its own smaller asymmetrical bento layout.
- Do not draw grid lines or an outer frame.
- Typography and Live Tokens are flat and integrated into the page background.
- All component-focused regions float slightly with soft neutral shadows and no glow.
- Avoid equal-size dashboard cards; the composition must remain art-directed and irregular.

## Regions

1. **Typography** — headline, body specimen, and compact type metrics.
2. **Palette + Controls** — primary/secondary/accent swatches, Button variants, and Badge.
3. **Tabs** — real `.pu-tabs tabs-md tabs-rounded`, progress, and avatar group.
4. **Form** — `.pu-field`, `.pu-label`, `.pu-input`, hint, and Apply button.
5. **Feedback** — Alert, native Progress, and semantic status Badges.
6. **Data + Content** — Card, Avatar Group, Badges, and Accordion.
7. **Live Tokens** — code and compact visual specimens for color, type, rhythm, and shape.

Use the real component parts and preset classes from the package CSS and documentation.

## Global theme animation

- Keep this section sticky for the duration of the theme story.
- Apply preview values at the root theme scope so the sticky header and every visible Pure/UI component update together.
- Suggested sequence:
  1. Colors and surfaces
  2. Heading and body typography
  3. Tracking and line-height
  4. Spacing/density
  5. Radius and elevation
  6. Fully resolved alternate brand theme
- The Live Tokens code updates in sync with the global result.
- Scrolling backward reverses the stages deterministically.
- Leaving the section in either direction restores the default Pure/UI tokens.

## Typography transition

- Font families do not interpolate. Crossfade between matched text layers or use a controlled View Transition at the stage boundary.
- Tracking, line-height, weight, and color can interpolate where browser support and performance allow.
- Preserve text dimensions as much as possible to limit layout shifts.

## Token implementation

Use a dedicated theme-preview attribute or class rather than mutating source styles permanently. Keep one authoritative default token set and apply only temporary preview overrides.

The start-state Live Tokens panel should show:

```css
:root {
  --color-primary: #663399;
  --color-secondary: hsl(189 94% 43%);
  --color-accent: hsl(46 98% 68%);
  --font-family-heading: system-ui;
  --tracking-heading: -0.025em;
  --line-height-heading: 1.2;
  --spacing-base: 0.25rem;
  --radius-base: 8px;
}
```

## Performance

- Avoid changing too many layout-critical values on every raw scroll event.
- Derive a normalized progress value and update through `requestAnimationFrame` or a scroll-animation timeline.
- Reserve stable grid dimensions to reduce cumulative layout shift.
- Prefer CSS custom properties and component variables over per-node inline styles.

## Accessibility and reduced motion

- Every theme stage must maintain WCAG AA contrast.
- Do not change semantics, tab order, or focus behavior during the transformation.
- Under `prefers-reduced-motion`, replace continuous scroll interpolation with a small number of immediate or short-crossfade theme states.
- The page must always restore the default theme when the preview is exited or interrupted.

## Responsive behavior

- Desktop uses the full nested bento composition.
- Tablet simplifies spans while retaining all regions.
- Mobile becomes a purposeful vertical sequence rather than forcing the desktop mosaic into one column.
- Shorten or disable the global scroll takeover on mobile if it causes orientation or performance problems.

## Visual constraints

- Frame zero must look exactly like the existing Pure/UI website.
- No header duplicated inside the section.
- No visible bento borders, grid lines, paint, mascot, arrows, or scroll annotations.
- The alternate theme is an animation outcome, not the initial design.
