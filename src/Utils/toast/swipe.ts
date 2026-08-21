import { getSwipeDirections, type SwipeDirection } from "./placement";
import type { ToastInstance } from "./types";

/*
Swipe to remove.

The direction comes from the container: a Toast is thrown out the
same way it came in. See getSwipeDirections().

While the gesture runs, the Toast reports it through
data-swipe and two custom properties. toast.css decides what that
looks like, so the movement stays in the stylesheet:

  data-swipe="move"   following the pointer, no transition
  data-swipe="out"    released past the threshold, on its way out

  --toast-swipe-x / --toast-swipe-y
*/

/* Movement before a press counts as a swipe rather than a click. */
const START_THRESHOLD = 6;

/* Share of the Toast that has to be dragged for it to leave. */
const DISMISS_RATIO = 0.25;

const MIN_DISMISS_DISTANCE = 48;

/* A short, fast flick removes it without reaching the distance. */
const FLICK_VELOCITY = 0.5;

/* Dragging against the allowed direction is heavily damped. */
const RESISTANCE = 0.25;

type Axis = "x" | "y";

function axisOf(direction: SwipeDirection): Axis {
  return direction === "left" || direction === "right" ? "x" : "y";
}

/* +1 when the Toast leaves towards larger coordinates. */
function signOf(direction: SwipeDirection): number {
  return direction === "right" || direction === "down" ? 1 : -1;
}

function isInteractive(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest("button, a, input, select, textarea, label") !== null;
}

export function attachSwipe(instance: ToastInstance): void {
  const toast = instance.element;

  const directions = getSwipeDirections(instance.container);

  /* Tells toast.css this one is draggable: cursor and touch-action. */
  toast.dataset.swipeable = "";

  let pointerId: number | null = null;
  let direction: SwipeDirection | null = null;

  let startX = 0;
  let startY = 0;

  let offset = 0;
  let velocity = 0;
  let lastPosition = 0;
  let lastTime = 0;

  let swiped = false;

  const reset = () => {
    pointerId = null;
    direction = null;
    offset = 0;
    velocity = 0;
  };

  const clearSwipeStyles = () => {
    delete toast.dataset.swipe;

    toast.style.removeProperty("--toast-swipe-x");
    toast.style.removeProperty("--toast-swipe-y");
  };

  const writeOffset = (value: number, axis: Axis) => {
    toast.style.setProperty(axis === "x" ? "--toast-swipe-x" : "--toast-swipe-y", `${value}px`);
    toast.style.setProperty(axis === "x" ? "--toast-swipe-y" : "--toast-swipe-x", "0px");
  };

  const onPointerDown = (event: PointerEvent) => {
    if (pointerId !== null || toast.dataset.state === "closing") {
      return;
    }

    /* Right and middle click are not gestures. */
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    /* A press that starts on the close button is a click, not a swipe. */
    if (isInteractive(event.target)) {
      return;
    }

    pointerId = event.pointerId;

    startX = event.clientX;
    startY = event.clientY;

    lastPosition = 0;
    lastTime = event.timeStamp;

    /*
     * The Toast is being handled, so its countdown stops. Pointer
     * capture can take the pointer outside the element, where the
     * usual pointerleave/pointerenter pair no longer balances out.
     */
    instance.pause();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) {
      return;
    }

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (direction === null) {
      if (Math.hypot(dx, dy) < START_THRESHOLD) {
        return;
      }

      /*
       * The gesture locks to whichever axis it started along, and
       * is dropped entirely if that axis leads nowhere — so a
       * vertical drag on a right-hand Toast still scrolls the page.
       */
      const axis: Axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";

      const match = directions.find((candidate) => axisOf(candidate) === axis);

      if (!match) {
        reset();

        instance.resume();

        return;
      }

      direction = match;
      swiped = true;

      /*
       * Capture keeps the gesture on this Toast even when the
       * pointer runs off it. It throws if the pointer is already
       * gone, which is not a reason to drop the swipe.
       */
      try {
        toast.setPointerCapture(event.pointerId);
      } catch {
        /* the gesture still works, it just stops at the edge */
      }

      toast.dataset.swipe = "move";
    }

    const axis = axisOf(direction);
    const sign = signOf(direction);

    const travelled = axis === "x" ? dx : dy;

    /* Positive means "towards the way out". */
    const towards = travelled * sign;

    offset = towards >= 0 ? towards : towards * RESISTANCE;

    const elapsed = event.timeStamp - lastTime;

    if (elapsed > 0) {
      velocity = (offset - lastPosition) / elapsed;

      lastPosition = offset;
      lastTime = event.timeStamp;
    }

    writeOffset(offset * sign, axis);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) {
      return;
    }

    if (direction === null) {
      reset();

      instance.resume();

      return;
    }

    const axis = axisOf(direction);
    const sign = signOf(direction);

    const rect = toast.getBoundingClientRect();

    const size = axis === "x" ? rect.width : rect.height;

    const threshold = Math.max(size * DISMISS_RATIO, MIN_DISMISS_DISTANCE);

    const flicked = velocity > FLICK_VELOCITY && offset > START_THRESHOLD;

    if (offset >= threshold || flicked) {
      /* Out of the viewport along the same axis, then removed. */
      writeOffset((size + 32) * sign, axis);

      toast.dataset.swipe = "out";

      reset();

      instance.remove();

      return;
    }

    clearSwipeStyles();

    reset();

    instance.resume();
  };

  /* A gesture must never leave a click behind on the way out. */
  const onClick = (event: MouseEvent) => {
    if (!swiped) {
      return;
    }

    swiped = false;

    event.preventDefault();
    event.stopPropagation();
  };

  toast.addEventListener("pointerdown", onPointerDown);
  toast.addEventListener("pointermove", onPointerMove);
  toast.addEventListener("pointerup", onPointerUp);
  toast.addEventListener("pointercancel", onPointerUp);
  toast.addEventListener("click", onClick, true);
}
