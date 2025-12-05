import { defineCollection, defineContentConfig } from "@nuxt/content";
import { QNASchema } from "./content/content.type";

export default defineContentConfig({
  collections: {
    qna_zhTW: defineCollection({
      type: "page",
      source: {
        include: "zh-TW/qna/**/*.md",
        exclude: ["zh-TW/qna/_sample.md"],
      },
      schema: QNASchema,
    }),
    qna_twTW: defineCollection({
      type: "page",
      source: {
        include: "tw-TW/qna/**/*.md",
        exclude: ["tw-TW/qna/_sample.md"],
      },
      schema: QNASchema,
    }),
  },
});
