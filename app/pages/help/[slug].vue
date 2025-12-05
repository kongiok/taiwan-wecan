<script setup lang="ts">
import { COLLECTIONS_BY_LOCALE } from "@@/content/content.type";
import type { Collections } from "@nuxt/content";
import { withLeadingSlash } from "ufo";

const route = useRoute();
const { locale } = useI18n();

const collectionKey = computed<keyof Collections>(() => {
  const key = COLLECTIONS_BY_LOCALE[locale.value] ?? "zhTW";
  return `qna_${key}` as keyof Collections;
});

const { data: qna } = await useAsyncData(
  () => `Q&A`,
  () =>
    queryCollection(collectionKey.value)
      .where("slug", "=", route.params.slug)
      .first(),
);
</script>

<template>
  <u-page-body>
    <article v-if="qna" class="m-auto prose prose-neutral">
      <h1>{{ qna.question }}</h1>
      <p class="text-lg opacity-80">
        {{ qna.summary }}
      </p>
      <ContentRenderer :value="qna" tag="section" />
    </article>
    <section v-else class="py-16 text-center space-y-2">
      <h1 class="text-xl font-semibold">這個問題目前沒有內容</h1>
      <p class="opacity-70">可能是這個語系還沒補上，或是路徑打錯了。</p>
    </section>
  </u-page-body>
</template>
