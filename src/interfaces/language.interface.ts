enum ESupportedLanguage {
  en = 'en',
  fr = 'fr',
}

export type WithLanguage<T extends string> = Record<
  keyof typeof ESupportedLanguage,
  T
>;
