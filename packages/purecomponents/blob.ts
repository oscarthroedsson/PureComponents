import type { NativeElementPropertiesFor } from "./types/index.ts";

export type ButtonProps = Omit<
  NativeElementPropertiesFor<"button">,
  "textContent"
> & {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
};

export function Button({
  label,
  variant = "primary",
  ...nativeProperties
}: ButtonProps): HTMLButtonElement {
  const button = Object.assign(
    document.createElement("button"),
    nativeProperties,
  );

  button.classList.add("pu-btn", "md");

  if (variant !== "primary") {
    button.classList.add(variant);
  }

  button.textContent = label;

  return button;
}
