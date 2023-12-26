enum ESupportedLanguage {
  en = 'en',
  fr = 'fr',
}

export type IPrimitive = string | number | boolean;

export type WithLanguage<T extends string> = Record<
  keyof typeof ESupportedLanguage,
  T
>;

export interface ICategory {
  id: string;
  title: WithLanguage<string>;
}

export interface IGenre {
  id: string;
  name: WithLanguage<string>;
}
