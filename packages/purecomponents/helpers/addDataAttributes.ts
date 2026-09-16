import type {
  ElementWithDataset,
  WithDataAttributes,
} from "../types/dataAttributes.ts";

export function addDataAttributes<
  ElementType extends ElementWithDataset,
  const Data extends Record<string, string>,
>(
  element: ElementType,
  data: Data,
): WithDataAttributes<ElementType, Data> {
  Object.assign(element.dataset, data);

  return element as WithDataAttributes<ElementType, Data>;
}
