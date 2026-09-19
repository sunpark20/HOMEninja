import { en } from "./en";
import { ko } from "./ko";
import type { Locale, VillageDictionary } from "./types";

export type { Locale, VillageDictionary } from "./types";

export const locales: Locale[] = ["ko", "en"];
export const dictionaries: Record<Locale, VillageDictionary> = { ko, en };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function dictionaryFor(locale: Locale): VillageDictionary {
  return dictionaries[locale];
}

export function localizedAppName(app: { displayName: string; displayNameKo: string }, locale: Locale) {
  return locale === "ko" ? app.displayNameKo : app.displayName;
}

export function localizedAppTagline(app: { taglineKo: string; taglineEn: string }, locale: Locale) {
  return locale === "ko" ? app.taglineKo : app.taglineEn;
}

export function localePath(locale: Locale, path = "/") {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}
