<template>
  <u-main class="content-center">
    <h1 class="w-fit m-auto text-4xl font-bold text-primary">
      {{ $t("site.hero.name") }}
    </h1>
  </u-main>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

// ✨ 核心魔法：伺服器端轉址
// 當 Nuxt 讀取到這行時，會停止渲染當前頁面，直接送出 HTTP 302 回應
await navigateTo(localePath("/help"), {
  replace: true, // ✅ 取代歷史紀錄：使用者按「上一頁」不會回到壞掉的首頁
  redirectCode: 302, // ✅ 302 代表「暫時移動」：告訴 Google「我首頁只是暫時沒好，以後會回來，不要刪我也不要降權」
});
</script>
