import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { legalHead } from "@/lib/legal-seo";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    legalHead({
      title: "Disclaimer",
      description:
        "AllWordTools is provided for educational purposes only. Read our disclaimer on tool accuracy, AI content, advertising and affiliate links.",
      path: "/disclaimer",
      crumb: "Disclaimer",
    }),
  component: DisclaimerPage,
});

export function DisclaimerPage() {
  return (
    <PageLayout
      crumb="Disclaimer"
      title="Disclaimer"
      intro="Last updated July 2026. Please read this disclaimer before relying on any content or tool."
    >
      <Prose>
        <h2>Educational Purpose</h2>
        <p>
          AllWordTools.com is an informational and educational platform. All tools and content are
          provided to help you play word games, learn English and improve your writing. They are not
          a substitute for professional judgement.
        </p>

        <h2>Independent Operation &amp; Trademark Disclaimer</h2>
        <p>
          AllWordTools.com is strictly an independent utility engineered and maintained by{" "}
          <Link to="/about/firoz-khan" className="font-semibold text-honey hover:underline">
            Firoz Khan
          </Link>{" "}
          under <strong>FK Digital Media</strong>. We have no affiliation, sponsorship, endorsement,
          authorization, or licensing partnership with <strong>Hasbro Inc.</strong> or <strong>Mattel Inc.</strong> (owners of Scrabble),{" "}
          <strong>Zynga Inc. / Take-Two Interactive</strong> (owners of Words With Friends),{" "}
          <strong>The New York Times Company</strong> (owners of Wordle and Strands),{" "}
          <strong>Fanatee Inc.</strong> (CodyCross), <strong>PeopleFun</strong> (Wordscapes), or{" "}
          <strong>Blue Ox Family Games</strong> (7 Little Words).
        </p>
        <p>
          All trademarks, game titles, registered names, and board designs belong exclusively to their
          respective owners and are referenced on this website solely for descriptive, comparative,
          and educational purposes under the doctrine of nominative fair use.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          Nothing on the Service constitutes legal, academic, medical, financial or other
          professional advice. Always consult a qualified professional for decisions that matter.
        </p>

        <h2>Tool Accuracy</h2>
        <p>
          Our tools rely on dictionaries, data sources and algorithms that may be incomplete or
          contain errors. We do not guarantee that any result is accurate, complete or suitable for
          a particular purpose. Verify important results independently, especially for exams,
          competitions or publication.
        </p>

        <h2>AI-Generated Content</h2>
        <p>
          Some tools use artificial intelligence to generate text such as sentences, stories, poems
          and examples. AI output is produced automatically and may be inaccurate, biased, outdated
          or inappropriate. Review, edit and fact-check any AI content before you use it, and do not
          submit confidential information.
        </p>

        <h2>External Links</h2>
        <p>
          The Service may contain links to third-party websites. We do not control and are not
          responsible for their content, accuracy or practices. Visiting external sites is at your
          own risk.
        </p>

        <h2>Affiliate Disclosure</h2>
        <p>
          The Service may include affiliate links. If you click one and make a purchase, we may earn
          a commission at no additional cost to you. We only intend to link to products and services
          we consider relevant, and our opinions remain our own.
        </p>

        <h2>Advertising Disclosure</h2>
        <p>
          The Service may display advertising, including through Google AdSense. Ads are provided by
          third parties and their appearance does not imply our endorsement of any product or
          service.
        </p>

        <h2>No Warranty</h2>
        <p>
          The Service is provided "as is" and "as available" without warranties of any kind, express
          or implied. To the fullest extent permitted by law, we disclaim all liability for any loss
          or damage arising from your use of the Service. See our{" "}
          <Link to="/terms">Terms &amp; Conditions</Link>.
        </p>
      </Prose>
    </PageLayout>
  );
}
