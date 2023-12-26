/**
 * Applies Partial utility type to all nested objects.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/**
 * Exclude all function properties from type.
 */
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

/**
 * Interface of the simple literal object with any string keys.
 */
export interface ObjectLiteral {
  [key: string]: unknown;
}

/**
 * Makes an interface with all optional values to require AT LEAST one of them.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/* Makes an interface with all optional values to accept ONLY one of them */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type StringTypeConverter<Type> = {
  [Property in keyof Type]: string;
};

export type NumberTypeConverter<Type> = {
  [Property in keyof Type]: number;
};

export type CachedType<T> = T & {
  insertAt: Date | number;
};

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export type WithAbsence<T> = T & {
  absence?: boolean;
};
