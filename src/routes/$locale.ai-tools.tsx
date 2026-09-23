import { createFileRoute } from "@tanstack/react-router";
import { legalHead } from "@/lib/legal-seo";
import { AiToolsTransparencyPage } from "./ai-tools";

export const Route = createFileRoute("/$locale/ai-tools")({
  head: ({ params }) =>
    legalHead({
      title: "AI Tools Transparency & Data Handling",
      description:
        "Transparent technical explanation of how AI tools on AllWordTools work, which models are used, data handling practices, privacy considerations, and important output limitations.",
      path: "/ai-tools",
      crumb: "AI Tools",
      locale: params.locale,
    }),
  component: AiToolsTransparencyPage,
});
