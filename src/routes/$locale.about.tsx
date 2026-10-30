import { createFileRoute } from "@tanstack/react-router";
import { legalHead } from "@/lib/legal-seo";
import { AboutPage } from "./about";
import { getAboutContent } from "@/i18n/about-content";

export const Route = createFileRoute("/$locale/about")({
  head: ({ params, matches }: any) => {
    // Nested /$locale/about/firoz-khan has its own head (see about.tsx).
    const leaf = (matches as any[])?.[(matches as any[]).length - 1];
    if (leaf && String(leaf.routeId).includes("firoz-khan")) {
      return { meta: [], links: [], scripts: [] };
    }
    const loc = getAboutContent(params.locale);
    return legalHead({
      title: loc?.metaTitle ?? "About",
      description:
        loc?.metaDescription ??
        "AllWordTools brings hundreds of free word game solvers and English language tools together in one fast, beautifully organised place.",
      path: "/about",
      crumb: loc?.crumb ?? "About",
      locale: params.locale,
    });
  },
  component: AboutPage,
});
