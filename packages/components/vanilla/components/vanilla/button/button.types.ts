import type {
  Emphasis,
  Intent,
  NativeElementPropertiesFor,
  Shape,
  Size,
} from "../../../types/index.ts";

export type ButtonIntent = Extract<Intent, "destructive">;

export type ButtonNativeProperties = NativeElementPropertiesFor<"button">;

export type ButtonDataAttributes = {
  intent?: ButtonIntent;
  iconOnly?: "true" | "false";
};

export type ButtonProps = Omit<
  ButtonNativeProperties,
  "ariaBusy" | "ariaPressed" | "className"
> & {
  size?: Size;
  shape?: Shape;
  variant?: Emphasis;
  intent?: ButtonIntent;
  isPressed?: boolean;
  isLoading?: boolean;
  iconOnly?: boolean;
  className?: string;
  data?: ButtonDataAttributes;
};
