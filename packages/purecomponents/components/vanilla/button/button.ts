import { addDataAttributes } from "../../../helpers/addDataAttributes.ts";
import { resolveButtonClassNames, resolveButtonDataAttributes } from "./button.utility.ts";
import type { ButtonProps } from "./button.types.ts";

export function Button({
  size,
  shape,
  variant,
  intent,
  isPressed,
  isLoading,
  iconOnly,
  className,
  data,
  ...nativeProperties
}: ButtonProps): HTMLButtonElement {
  const button = Object.assign(document.createElement("button"), nativeProperties);

  button.classList.add(...resolveButtonClassNames({ size, shape, variant, className }));

  addDataAttributes(button, resolveButtonDataAttributes({ data, intent, iconOnly }));

  if (isPressed !== undefined) button.ariaPressed = String(isPressed);

  if (isLoading !== undefined) {
    button.ariaBusy = String(isLoading);
    button.classList.toggle("pu-loading", isLoading);
  }

  return button;
}
