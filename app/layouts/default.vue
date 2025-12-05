<script setup>
const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead();
const title = computed(() => t(route.meta.title ?? "site.seo.name"));
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.key">
        <Link
          :id="link.key"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.key">
        <Meta
          :id="meta.key"
          :property="meta.property"
          :content="meta.content"
        />
      </template>
    </Head>
    <Body>
      <u-app>
        <u-main class="min-h-screen flex flex-col dark:bg-neutral-800">
          <u-page>
            <slot />
          </u-page>
          <u-footer class="mt-auto px-8 flex justify-center items-center">
            <p class="font-genyog">
              程式碼以
              <nuxt-link
                to="https://github.com/kongiok/taiwan-wecan/blob/main/LICENSE.md"
                external
                target="_blank"
                class="inline-flex items-center gap-1 font-bold text-balance text-info-800 dark:text-info-300"
                >MPL v2.0</nuxt-link
              >
              授權；而思想、論述、創意及圖卡採用
              <nuxt-link
                to="https://creativecommons.org/licenses/by-nd/4.0/"
                external
                target="_blank"
                class="inline-flex items-center gap-1 font-bold text-balance text-info-800 dark:text-info-300"
              >
                <span class="font-bold">CC BY-ND</span
                ><u-icon
                  class="size-5"
                  name="ri:creative-commons-by-line"
                /><u-icon class="size-5" name="ri:creative-commons-nd-line" />
              </nuxt-link>
              授權
            </p>
          </u-footer>
        </u-main>
      </u-app>
    </Body>
  </Html>
</template>
