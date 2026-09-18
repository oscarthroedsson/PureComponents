export type ElementWithDataset = Element & {
  readonly dataset: DOMStringMap;
};

export type WithDataAttributes<
  ElementType extends ElementWithDataset,
  Data extends Record<string, string>,
> = ElementType & {
  readonly dataset: DOMStringMap & Data;
};
