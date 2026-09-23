import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { legalHead } from "@/lib/legal-seo";

const EMAIL = "hello@allwordtools.com";

export const Route = createFileRoute("/terms")({
  head: () =>
    legalHead({
      title: "Terms & Conditions",
      description:
        "The terms for using AllWordTools. Our free word tools are provided as-is for personal and educational use.",
      path: "/terms",
      crumb: "Terms & Conditions",
    }),
  component: TermsPage,
});

export function TermsPage() {
  return (
    <PageLayout
      crumb="Terms & Conditions"
      title="Terms & Conditions"
      intro="Last updated July 2026. Please read these terms carefully before using the Service."
    >
      <Prose>
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using AllWordTools.com (the "Service") you agree to be bound by these
          Terms &amp; Conditions and our <Link to="/privacy">Privacy Policy</Link>. If you do not
          agree, please do not use the Service.
        </p>

        <h2>Website Usage</h2>
        <p>
          The Service provides free word games, dictionary tools, grammar helpers, AI writing tools
          and generators for personal, educational and fair use. You may use the tools without an
          account. We may modify, suspend or discontinue any part of the Service at any time.
        </p>

        <h2>User Responsibilities</h2>
        <p>
          You are responsible for how you use the tools and any content you enter or generate. You
          agree to use the Service lawfully and not to misuse it in a way that harms others or the
          Service.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          The Service, including its design, branding, text and software, is owned by
          AllWordTools.com and protected by intellectual property laws. You may not copy, reproduce
          or redistribute the Service without permission, except for personal, non-commercial use of
          tool results.
        </p>

        <h2>Tool Accuracy Disclaimer</h2>
        <p>
          Our tools are provided for convenience and education. While we work to keep results
          accurate, we do not guarantee that any result is complete, current or error-free. See our
          full <Link to="/disclaimer">Disclaimer</Link>.
        </p>

        <h2>AI Content Disclaimer</h2>
        <p>
          AI-generated content is produced automatically and may be inaccurate, biased or
          inappropriate. You are responsible for reviewing and verifying any AI output before
          relying on or publishing it. Do not submit confidential information to AI tools.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, AllWordTools.com and its operators are not liable
          for any indirect, incidental or consequential damages, or any loss arising from your use
          of, or inability to use, the Service or its results.
        </p>

        <h2>No Guarantees</h2>
        <p>
          The Service is provided "as is" and "as available" without warranties of any kind, express
          or implied, including merchantability, fitness for a particular purpose and
          non-infringement.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          The Service may rely on or link to third-party services. We are not responsible for their
          content, availability or practices, and your use of them is governed by their own terms.
        </p>

        <h2>Advertisements</h2>
        <p>
          The Service may display advertisements, including through Google AdSense. Advertisers are
          responsible for their ads, and inclusion of an ad does not imply our endorsement.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          The Service may contain affiliate links. If you purchase through them we may earn a
          commission at no additional cost to you. See our <Link to="/disclaimer">Disclaimer</Link>{" "}
          for details.
        </p>

        <h2>Prohibited Activities</h2>
        <ul>
          <li>Attempting to disrupt, overload or gain unauthorised access to the Service.</li>
          <li>Scraping or harvesting data at scale or for commercial resale.</li>
          <li>Using the Service for unlawful, harmful or fraudulent purposes.</li>
          <li>Reverse engineering or interfering with the site's security features.</li>
        </ul>

        <h2>Copyright</h2>
        <p>
          If you believe content on the Service infringes your copyright, please review our{" "}
          <Link to="/dmca">DMCA policy</Link> and submit a notice as described there.
        </p>

        <h2>Termination</h2>
        <p>
          We may restrict or terminate access to the Service at our discretion, without notice, if
          we believe these terms have been violated.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms and your use of the Service are governed by and construed in accordance with
          applicable laws, without regard to conflict-of-law principles.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or visit our{" "}
          <Link to="/contact">contact page</Link>.
        </p>
      </Prose>
    </PageLayout>
  );
}
