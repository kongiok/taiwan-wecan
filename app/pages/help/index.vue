<template>
  <u-page-body>
    <u-page-section
      :title="t('qna.hero.name')"
      :description="t('qna.hero.tagline')"
      :ui="{
        root: 'mx-8 md:m-auto md:container bg-linear-(--tmt-gradient-hero) rounded-xl overflow-hidden',
        container: 'bg-white/55',
        title:
          'text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-12 text-neutral-900 font-sans',
        description:
          'text-base sm:text-lg md:text-xl lg:text-2xl font-lxgw text-neutral-700',
      }"
    >
    </u-page-section>
    <u-page-section :title="t('qna.browse.title')">
      <u-page-grid
        :ui="{
          wrapper: 'grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center',
        }"
      >
        <u-page-feature
          v-for="category in categories"
          :key="category.id"
          :title="category.label"
          :description="category.description"
          :icon="category.icon"
          :to="{
            path: localePath('/help'),
            query: { category: category.id },
          }"
          orientation="horizontal"
          :ui="{
            root: 'group bg-primary-50/85 backdrop-blur-sm rounded-4xl px-4 py-5 transition-all hover:bg-primary-200 active:rounded-lg active:bg-primary-300 content-center',
            title:
              'text-neutral-700 text-xl font-semibold mb-2 group-hover:text-neutral-900',
            description: 'text-base md:text-md text-primary-950/75',
            leadingIcon: 'group-hover:text-primary-700',
          }"
        />
      </u-page-grid>
    </u-page-section>
    <u-page-section :title="t('qna.browse.questions')">
      <u-page-columns>
        <u-page-card
          v-for="post in filteredPosts"
          :key="post.slug"
          :title="post.question"
          :description="post.summary"
          :to="localePath(`/help/${post.slug}`)"
          :ui="{
            header: 'px-6 pt-6 pb-2 sm:px-6',
            root: 'group backdrop-blur-sm rounded-4xl transition-all hover:bg-primary-200 active:rounded-lg active:bg-primary-300 ring-0 shadow-none px-6  sm:pt-0',

            title:
              'text-neutral-700 text-lg font-semibold mb-1 group-hover:text-neutral-900 transition-colors',
            description: 'text-base text-primary-950/75',
          }"
          variant="ghost"
        />
      </u-page-columns>
    </u-page-section>
  </u-page-body>
</template>

<script setup lang="ts">
import * as R from "remeda";
import {
  CATEGORIES_CONFIG,
  categoriesEnumSchema,
  type CATEGORIES_ENUM,
} from "../../../content/content.type";
import { COLLECTIONS_BY_LOCALE } from "@@/content/content.type";
import type { Collections } from "@nuxt/content";
const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();

const collectionKey = computed<keyof Collections>(() => {
  const key = COLLECTIONS_BY_LOCALE[locale.value] ?? "zhTW";
  return `qna_${key}` as keyof Collections;
});

const categories = useState<
  Array<{
    id: CATEGORIES_ENUM;
    label: string;
    description: string;
    icon: string;
  }>
>("qna_categories", () =>
  R.pipe(
    CATEGORIES_CONFIG,
    R.map((category) => ({
      id: category.id,
      label: t(category.label),
      description: t(category.description),
      icon: category.icon,
    })),
  ),
);

const selectedCategory = computed({
  get: (): CATEGORIES_ENUM =>
    R.pipe(
      route.query.category,
      R.when(R.isArray, R.first),
      (val) => R.defaultTo(val, ""),
      (parsedCat) => categoriesEnumSchema.safeParse(parsedCat),
      (result) => (result.success ? result.data : "all"),
    ),
  set: (selectedCat) =>
    R.pipe(
      selectedCat,
      R.when(R.isStrictEqual("all"), () => undefined),
      (category) => R.merge(route.query, { category }),
      (newQuery) => router.replace({ query: newQuery }),
    ),
});

const { data: allPosts } = await useAsyncData("qna-all", () =>
  queryCollection(collectionKey.value).all(),
);

const filteredPosts = computed(() =>
  R.pipe(
    allPosts.value || [],
    R.filter((post) =>
      selectedCategory.value === "all"
        ? true
        : post.category === selectedCategory.value,
    ),
  ),
);
</script>
