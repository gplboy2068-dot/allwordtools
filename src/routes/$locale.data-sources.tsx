import { createFileRoute } from "@tanstack/react-router";
import { legalHead } from "@/lib/legal-seo";
import { DataSourcesPage } from "./data-sources";

export const Route = createFileRoute("/$locale/data-sources")({
  head: ({ params }) =>
    legalHead({
      title: "Data Sources, Attribution & Dataset Licensing",
      description:
        "Transparent technical inventory of all word lists, dictionaries, APIs, open-source libraries, and AI services used by AllWordTools, including licenses, version benchmarks, and attributions.",
      path: "/data-sources",
      crumb: "Data Sources",
      locale: params.locale,
    }),
  component: DataSourcesPage,
});
