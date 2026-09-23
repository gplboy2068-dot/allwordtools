import { createFileRoute } from "@tanstack/react-router";
import { legalHead } from "@/lib/legal-seo";
import { ReportErrorPage } from "./report-error";

export const Route = createFileRoute("/$locale/report-error")({
  head: ({ params }) =>
    legalHead({
      title: "Report a Word or Tool Error",
      description:
        "Help improve AllWordTools by reporting incorrect results, missing words, scoring bugs, or outdated data directly to the engineering and maintenance team.",
      path: "/report-error",
      crumb: "Report Error",
      locale: params.locale,
    }),
  component: ReportErrorPage,
});
