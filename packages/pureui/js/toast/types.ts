export type ToastPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastIntent = "info" | "success" | "warning" | "error";

export type ToastSize = "sm" | "md" | "lg";

export type ToastRole = "status" | "alert";

/*
Everything a Toast can be given, as a plain object. Placement and
layout are NOT here — those belong to the container the Toast is
appended to.
*/
export interface ToastAttributes {
  title?: string;
  message?: string;

  intent?: ToastIntent;
  size?: ToastSize;

  /* status announces politely, alert interrupts. */
  role?: ToastRole;

  /* Milliseconds until the Toast removes itself. 0 keeps it. */
  duration?: number;

  /* Close button inside the Toast. */
  dismissible?: boolean;

  /* Intent icon. Pass false for a Toast without one. */
  icon?: boolean;

  /* Dragged towards the container edge to remove it. */
  swipeable?: boolean;
}

export type ResolvedToastAttributes = Required<ToastAttributes>;

/* A container is addressed by element or by CSS selector. */
export type ToastTarget = HTMLElement | string;

export interface ToastInstance {
  id: string;
  element: HTMLElement;
  container: HTMLElement;
  attributes: ResolvedToastAttributes;

  remove: () => void;
  pause: () => void;
  resume: () => void;
}
