import * as R from "remeda";

const i18nLocaleIdentifiers = [
  { code: "zh-TW", language: "zh-TW" },
  { code: "tw-TW", language: "nan-TW" },
];

export const i18nLocaleCodes = i18nLocaleIdentifiers.map(
  (locale) => locale.code,
);

export const i18nDefaultLocale = i18nLocaleIdentifiers.at(0)!.code;

const i18nFiles: Array<{ path: string; cache: boolean }> = [
  { path: "common", cache: true },
  { path: "qna", cache: false },
];

const i18nExtension = "yaml";

export const i18nLocales = R.pipe(
  i18nLocaleIdentifiers,
  R.map((locale) => ({
    code: locale.code,
    language: locale.language,
    files: R.map(i18nFiles, (file) => ({
      path: `${locale.code}/${file.path}.${i18nExtension}`,
      cache: file.cache,
    })),
  })),
);
