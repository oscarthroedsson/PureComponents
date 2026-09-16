type IfEqual<Left, Right, Then, Else = never> =
  (<Value>() => Value extends Left ? 1 : 2) extends
  (<Value>() => Value extends Right ? 1 : 2)
    ? Then
    : Else;

export type WritablePropertyKeys<Value> = {
  [Key in keyof Value]-?: IfEqual<
    { [Property in Key]: Value[Key] },
    { -readonly [Property in Key]: Value[Key] },
    Key
  >;
}[keyof Value];

export type NativeElementProperties<ElementType extends Element> = Partial<{
  [Key in WritablePropertyKeys<ElementType> as ElementType[Key] extends (
    ...arguments_: never[]
  ) => unknown
    ? never
    : Key]: ElementType[Key];
}>;

export type NativeElementPropertiesFor<
  TagName extends keyof HTMLElementTagNameMap,
> = NativeElementProperties<HTMLElementTagNameMap[TagName]>;
