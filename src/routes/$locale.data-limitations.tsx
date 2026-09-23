import { createFileRoute } from "@tanstack/react-router";
import { legalHead } from "@/lib/legal-seo";
import { DataLimitationsPage } from "./data-limitations";

export const Route = createFileRoute("/$locale/data-limitations")({
  head: ({ params }) =>
    legalHead({
      title: "Data Limitations & Result Methodology",
      description:
        "Transparent technical explanation of AllWordTools data coverage, dictionary boundaries, word list differences, scoring rules, and why no single word list contains every possible word.",
      path: "/data-limitations",
      crumb: "Data Limitations",
      locale: params.locale,
    }),
  component: DataLimitationsPage,
});
