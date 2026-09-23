import { createFileRoute } from "@tanstack/react-router";
import { legalHead } from "@/lib/legal-seo";
import { FirozKhanProfilePage } from "./about.firoz-khan";

export const Route = createFileRoute("/$locale/about/firoz-khan")({
  head: ({ params }) =>
    legalHead({
      title: "Firoz Khan — Full Stack Developer & Creator of AllWordTools",
      description:
        "Author and maintainer profile for Firoz Khan, Full Stack Developer and creator of AllWordTools.com under FK Digital Media.",
      path: "/about/firoz-khan",
      crumb: "Firoz Khan",
      locale: params.locale,
    }),
  component: FirozKhanProfilePage,
});
