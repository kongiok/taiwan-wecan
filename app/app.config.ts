export default defineAppConfig({
  ui: {
    colors: {
      primary: "rose",
      secondary: "lime",
      tertiary: "violet",
      neutral: "neutral",
    },
    prose: {
      h1: {
        slots: {
          base: "text-4xl text-highlighted font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)",
          link: "inline-flex items-center gap-2",
        },
      },
      h2: {
        slots: {
          base: [
            "relative text-2xl text-highlighted font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-xl/7 [&>a>code]:font-bold",
            "[&>a>code]:transition-colors",
          ],
          leading: [
            "absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:flex text-muted",
            "transition",
          ],
          leadingIcon: "size-4 shrink-0",
          link: "group lg:ps-2 lg:-ms-2",
        },
      },
      h3: {
        slots: {
          base: [
            "relative text-xl text-highlighted font-bold mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(32px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-lg/6 [&>a>code]:font-bold",
            "[&>a>code]:transition-colors",
          ],
          leading: [
            "absolute -ms-8 top-0.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:flex text-muted",
            "transition",
          ],
          leadingIcon: "size-4 shrink-0",
          link: "group lg:ps-2 lg:-ms-2",
        },
      },
      h4: {
        slots: {
          base: "text-lg text-highlighted font-bold mt-6 mb-2 scroll-mt-[calc(24px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(24px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary",
          link: "",
        },
      },
      p: {
        base: "my-5 leading-7 text-pretty text-neutral-700 text-lxgw",
      },
      strong: {
        base: "",
      },
      em: {
        base: "text-genyog font-medium decoration-secondary-700 dark:decoration-secondary-500 not-italic underline decoration-wavy decoration-auto underline-offset-2",
      },
      a: {
        base: [
          "text-primary border-b border-transparent hover:border-primary font-medium focus-visible:outline-primary [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary",
          "transition-colors [&>code]:transition-colors",
        ],
      },
      blockquote: {
        base: "border-s-4 border-accented ps-4 italic",
      },
      hr: {
        base: "border-t border-default my-12",
      },
    },
  },
});
