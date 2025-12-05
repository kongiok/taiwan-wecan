<script setup lang="ts">
import {
  COLLECTIONS_BY_LOCALE,
  CATEGORIES_CONFIG,
} from "@@/content/content.type";
import { type Collections } from "#imports";
import * as R from "remeda";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

const url = useRequestURL();

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

const { share, isSupported: isShareSupported } = useShare();
const { copy, copied } = useClipboard({ legacy: true });
const toast = useToast();

interface ShareContent {
  title: string;
  text: string;
  url: string;
}

// ---------------------------------------------------------
// 1. 策略 A: 原生分享 (Native Share Strategy)
// ---------------------------------------------------------
const shareViaSystem = (content: ShareContent) => {
  // 守門員：不支援就直接報錯，讓流程切換軌道
  if (!isShareSupported.value) {
    return errAsync("Share API not supported");
  }

  return ResultAsync.fromPromise(
    share({
      title: content.title,
      text: content.text,
      url: content.url,
    }),
    (err) => err,
  ).map(() => {
    // 成功回饋 (Side Effect)
    toast.add({
      title: "已開啟分享選單",
      icon: "mdi:success",
      color: "success",
    });
  });
};

// ---------------------------------------------------------
// 2. 策略 B: 剪貼簿備案 (Clipboard Strategy)
// ---------------------------------------------------------
const shareViaClipboard = (content: ShareContent) => {
  return ResultAsync.fromThrowable(
    async () => {
      const copyText = [content.title, content.text, content.url].join("\n");

      // 建議加上 await，確保複製動作完成 (VueUse 的 copy 是非同步的)
      await copy(copyText);

      toast.add({
        title: "已複製連結！",
        description: "趕快去支援前線吧！🔥",
        icon: "mdi:success",
        color: "success",
      });
    },
    (err) => err,
  )();
};

// ---------------------------------------------------------
// 3. 錯誤處理 (Global Error Handler)
// ---------------------------------------------------------
const handleShareError = (err: unknown) => {
  console.error("Share failed:", err);
  toast.add({
    title: "分享失敗",
    description: "無法複製連結，請手動選取網址。",
    icon: "mdi:error",
    color: "error",
  });
};

// =========================================================
// 👑 指揮官: 主流程 (Main Entry)
// =========================================================
const handleShare = async () => {
  // 1. 準備資料 (Data Prep)
  const content: ShareContent = {
    title: `【Q：${qna.value?.question}】`,
    text: `${qna.value?.summary}\n\n我們的想法：`,
    url: url.href, // Nuxt useRequestURL
  };

  // 2. 執行鏈 (Execution Chain)
  // 閱讀起來就像英文句子一樣流暢
  await shareViaSystem(content)
    .orElse(() => shareViaClipboard(content)) // 如果原生失敗，切換到複製
    .mapErr(handleShareError); // 如果全部失敗，報錯
};

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
        @click="handleShare"
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
