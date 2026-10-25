export const languages = [
  "en",
  "fr",
  "de",
] as const;


export type Language =
  (typeof languages)[number];


export const DEFAULT_LANGUAGE:
  Language = "en";


export const LANGUAGE_STORAGE_KEY =
  "gizki-language";


export const LANGUAGE_EVENT =
  "gizki-language-change";


export const languageNames:
  Record<
    Language,
    string
  > = {
    en: "English",
    fr: "Français",
    de: "Deutsch",
  };


export const languageEnglishNames:
  Record<
    Language,
    string
  > = {
    en: "English",
    fr: "French",
    de: "German",
  };


export const languageShortNames:
  Record<
    Language,
    string
  > = {
    en: "EN",
    fr: "FR",
    de: "DE",
  };


export function isLanguage(
  value:
    string | null
): value is Language {
  return languages.includes(
    value as Language
  );
}