// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content"],
  appId: "taiwan-wecan",
  app: {
    rootAttrs: {
      id: "__taiwan-wecan__",
    },
  },
  css: ["~/assets/styles/main.css"],
});
