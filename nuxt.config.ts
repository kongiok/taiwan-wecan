import {
  i18nLocales as locales,
  i18nDefaultLocale as defaultLocale,
} from "./i18n/i18n.const";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n"],
  appId: "taiwan-wecan",
  app: {
    rootAttrs: {
      id: "__taiwan-wecan__",
    },
  },
  css: ["~/assets/styles/main.css"],
  i18n: {
    baseUrl: "https://taiwanwecan.org",
    locales,
    defaultLocale,
    strategy: "prefix",
  },
});
