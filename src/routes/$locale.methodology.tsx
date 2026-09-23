import { createFileRoute } from "@tanstack/react-router";
import { legalHead } from "@/lib/legal-seo";
import { MethodologyPage } from "./methodology";

export const Route = createFileRoute("/$locale/methodology")({
  head: ({ params }) =>
    legalHead({
      title: "Word Data, Dictionary & Algorithm Methodology",
      description:
        "Transparent technical documentation explaining where word data comes from, how our 92 tools calculate scores, which APIs and AI models are used, and how word validity is determined.",
      path: "/methodology",
      crumb: "Methodology",
      locale: params.locale,
    }),
  component: MethodologyPage,
});
