declare const __brand: unique symbol;

export type Brand<TValue, TBrand extends string> = TValue & {
  readonly [__brand]: TBrand;
};
