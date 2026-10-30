import { createFileRoute } from "@tanstack/react-router";
import { buildLocaleHead, BASE_URL } from "@/i18n/seo";
import { BlogPage, TITLE, DESCRIPTION } from "./blog.index";

// The blog is English-only: locale blog indexes are noindex and canonicalize
// to the English blog, with hreflang limited to en + x-default.
export const Route = createFileRoute("/$locale/blog/")({
  head: ({ params }) => {
    const built = buildLocaleHead({
      path: "/blog",
      locale: params.locale,
      title: TITLE,
      description: DESCRIPTION,
      robots: "noindex, follow",
    });
    return {
      meta: built.meta,
      links: [
        { rel: "canonical", href: `${BASE_URL}/blog` },
        { rel: "alternate", hrefLang: "en", href: `${BASE_URL}/blog` },
        { rel: "alternate", hrefLang: "x-default", href: `${BASE_URL}/blog` },
      ],
    };
  },
  component: BlogPage,
});
