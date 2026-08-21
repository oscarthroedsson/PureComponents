import type { ToastPlacement } from "./types";

export const DEFAULT_PLACEMENT: ToastPlacement = "top-right";

export type SwipeDirection = "up" | "down" | "left" | "right";

export function getPlacement(container: HTMLElement): ToastPlacement {
  return (container.dataset.placement as ToastPlacement) || DEFAULT_PLACEMENT;
}

export function isTopPlacement(container: HTMLElement): boolean {
  return getPlacement(container).startsWith("top");
}

/*
A Toast is swiped away towards the edge it was placed against: a
container on the right hands its Toasts a swipe to the right, a
container on the left a swipe to the left.

A centered container has no side of its own, so it takes the
vertical way out instead — up from the top, down from the bottom —
plus a swipe to the right, because that is what the hand expects
from a notification.
*/
export function getSwipeDirections(container: HTMLElement): SwipeDirection[] {
  const placement = getPlacement(container);

  if (placement.endsWith("left")) return ["left"];
  if (placement.endsWith("center")) return [isTopPlacement(container) ? "up" : "down", "right"];

  return ["right"];
}
