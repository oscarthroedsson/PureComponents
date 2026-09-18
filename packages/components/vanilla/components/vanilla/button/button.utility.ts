import type { Shape, Size, Emphasis } from "../../../types/index.ts";
import type {
  ButtonDataAttributes,
  ButtonIntent,
} from "./button.types.ts";

export const BUTTON_SIZES: readonly Size[] = ["sm", "md", "lg"];
export const BUTTON_SHAPES: readonly Shape[] = [
  "sharp",
  "smooth",
  "rounded",
];
export const BUTTON_VARIANTS: readonly Emphasis[] = [
  "primary",
  "emphasised",
  "secondary",
  "tertiary",
  "ghost",
];

type ButtonClassOptions = {
  size?: Size;
  shape?: Shape;
  variant?: Emphasis;
  className?: string;
};

type ButtonDataOptions = {
  data?: ButtonDataAttributes;
  intent?: ButtonIntent;
  iconOnly?: boolean;
};

export function resolveButtonClassNames({
  size,
  shape,
  variant,
  className = "",
}: ButtonClassOptions): string[] {
  const userClasses = className.split(/\s+/).filter(Boolean);
  const userSize = BUTTON_SIZES.find((value) => userClasses.includes(value));
  const userShape = BUTTON_SHAPES.find((value) =>
    userClasses.includes(value),
  );
  const userEmphasis = BUTTON_VARIANTS.find((value) =>
    userClasses.includes(value),
  );
  const controlledClasses = new Set<string>([
    "pu-btn",
    ...BUTTON_SIZES,
    ...BUTTON_SHAPES,
    ...BUTTON_VARIANTS,
  ]);
  const customClasses = userClasses.filter(
    (value) => !controlledClasses.has(value),
  );
  const resolvedShape = shape ?? userShape;
  const resolvedEmphasis = variant ?? userEmphasis ?? "primary";
  const classes = ["pu-btn", size ?? userSize ?? "md"];

  if (resolvedShape) classes.push(resolvedShape);
  if (resolvedEmphasis !== "primary") classes.push(resolvedEmphasis);

  classes.push(...customClasses);

  return classes;
}

export function resolveButtonDataAttributes({
  data,
  intent,
  iconOnly,
}: ButtonDataOptions): Record<string, string> {
  const attributes: Record<string, string> = {};

  if (data?.intent) attributes.intent = data.intent;
  if (data?.iconOnly) attributes.iconOnly = data.iconOnly;
  if (intent) attributes.intent = intent;
  if (iconOnly !== undefined) attributes.iconOnly = String(iconOnly);

  return attributes;
}
