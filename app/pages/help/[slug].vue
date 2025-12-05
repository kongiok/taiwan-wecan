<script setup lang="ts">
import {
  COLLECTIONS_BY_LOCALE,
  CATEGORIES_CONFIG,
} from "@@/content/content.type";
import { type Collections } from "@nuxt/content";
import * as R from "remeda";

const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();

const collectionKey = computed<keyof Collections>(() => {
  const key = COLLECTIONS_BY_LOCALE[locale.value] ?? "zhTW";
  return `qna_${key}` as keyof Collections;
});

const { data: qna } = await useAsyncData(route.path, async () => {
  const queriedResult = await queryCollection(collectionKey.value)
    .where("slug", "=", route.params.slug)
    .first();
  if (!queriedResult) {
    throw createError({
      statusCode: 404,
      message: `找不到這篇文章：${route.params.slug}`,
      fatal: true,
    });
  }
  return queriedResult;
});

const currentCategoryInfo = computed(() => {
  if (!qna.value) return null;

  return CATEGORIES_CONFIG.find((c) => c.id === qna.value!.category);
});

const routeBreadcrumb = computed(() =>
  R.pipe(
    route.fullPath,
    (providedPath) => providedPath.split("/"),
    R.drop(2),
    (path) => ["/", ...path],
    R.map((breadcrumb) => ({
      label: breadcrumb,
      to: localePath(breadcrumb),
    })),
  ),
);

useSeoMeta({
  title: computed(() => `${qna.value?.question} | ${t("qna.post_seo.suffix")}`),
  description: computed(() => qna.value?.summary),
  ogTitle: computed(
    () => `${qna.value?.question} | ${t("qna.post_seo.suffix")}`,
  ),
  ogDescription: computed(() => qna.value?.summary),
});
</script>

<template>
  <div v-if="qna" class="m-auto px-8 pt-6 md:max-w-3/4">
    <u-breadcrumb
      separator-icon="ic:round-chevron-right"
      :items="routeBreadcrumb"
      :ui="{
        root: 'py-2',
        link: 'text-base md:text-lg font-mono',
      }"
    />
    <section
      class="m-auto w-full h-[35vh] p-4 container bg-linear-to-br from-primary-100 via-tertiary-50 to-secondary-100 grid grid-cols-1 place-items-center"
    >
      <h1
        class="font-black text-pretty text-3xl/15 md:text-5xl/25 lg:text-6xl/25"
      >
        {{ qna.question }}
      </h1>
    </section>
    <div
      class="mx-auto my-8 p-4 container flex flex-row-reverse justify-between items-center border-y-1 border-neutral-300"
    >
      <u-button
        color="neutral"
        variant="outline"
        leading-icon="ic:baseline-content-copy"
        :label="t('qna.actions.copy')"
      />
      <u-badge
        color="neutral"
        variant="outline"
        size="lg"
        :label="t(currentCategoryInfo!.label)"
        :icon="currentCategoryInfo!.icon"
      />
      <p class="text-lg font-bold hidden md:inline-block">
        {{ t("site.hero.name") }}
      </p>
    </div>
    <ContentRenderer
      class="m-auto w-full container px-4 text-pretty"
      :value="qna"
      tag="article"
    />
  </div>
</template>
