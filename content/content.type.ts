import { z } from "zod";
import * as R from "remeda";

import { i18nLocaleCodes } from "../i18n/i18n.const";

export const categoriesEnumSchema = z.enum([
  "reason", // 發起事由類
  "status", // 連署狀態類
  "process", // 操作流程類
  "organization", // 組織相關類
  "tools", // 連署工具類
  "others", // 其他類
  "all", // 全部
]);

export type CATEGORIES_ENUM = z.infer<typeof categoriesEnumSchema>;

export const CATEGORIES_CONFIG: Array<{
  id: CATEGORIES_ENUM;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    id: "reason",
    label: "qna.categories_label.reason",
    description: "qna.categories_desc.reason",
    icon: "mdi:sparkles-outline",
  },
  {
    id: "status",
    label: "qna.categories_label.status",
    description: "qna.categories_desc.status",
    icon: "ic:round-insert-chart",
  },
  {
    id: "tools",
    label: "qna.categories_label.tools",
    description: "qna.categories_desc.tools",
    icon: "mdi:toolbox-outline",
  },
  {
    id: "process",
    label: "qna.categories_label.process",
    description: "qna.categories_desc.process",
    icon: "ic:round-checklist",
  },
  {
    id: "organization",
    label: "qna.categories_label.organization",
    description: "qna.categories_desc.organization",
    icon: "ic:outline-group",
  },
  // {
  //   id: "others",
  //   label: "qna.categories_label.others",
  //   description: "qna.categories_desc.others",
  //   icon: "mdi:dots-horizontal-circle-outline",
  // },
  {
    id: "all",
    label: "qna.categories_label.all",
    description: "qna.categories_desc.all",
    icon: "mdi:dots-horizontal-circle-outline",
  },
];

export const QNASchema = z.object({
  slug: z.string().min(1),
  question: z.string().min(1),
  summary: z.string().min(1),
  category: categoriesEnumSchema,
  keywords: z.array(z.string()).optional(),
  order: z.number().min(1).max(10).default(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().default(false),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().url().optional(),
    })
    .optional(),
  sources: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url(),
      }),
    )
    .optional(),
  share: z
    .object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      variant: z.string().optional(),
      layout: z.string().optional(),
    })
    .optional(),
});

export const createCollectionKeyByLocale = (locale: string) =>
  R.pipe(
    locale,
    R.toLowerCase(),
    (s) => s.split(/[-_]/),
    ([lang, region]) => [lang?.toLowerCase(), region?.toUpperCase()],
    (arr) => arr.filter(Boolean).join(""),
  );
export const COLLECTIONS_BY_LOCALE: Record<string, string> = R.pipe(
  i18nLocaleCodes,
  R.mapToObj((locale) => [locale, createCollectionKeyByLocale(locale)]),
);
