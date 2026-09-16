export type Size = "sm" | "md" | "lg";

export type Shape = "sharp" | "smooth" | "rounded";

export type Emphasis =
  | "primary"
  | "emphasised"
  | "secondary"
  | "tertiary"
  | "ghost";

export type Intent =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "destructive";

export type State =
  | "disabled"
  | "pressed"
  | "loading"
  | "expanded"
  | "invalid"
  | "open"
  | "checked"
  | "current"
  | "closing";

export type Orientation = "horizontal" | "vertical";

export type Direction =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";

export type Alignment = "start" | "center" | "end";

export type Placement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-center"
  | "bottom-center";

export type Layout =
  | Orientation
  | Direction
  | Alignment
  | Placement
  | "list"
  | "stacked";
