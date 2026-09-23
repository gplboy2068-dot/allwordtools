import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { legalHead } from "@/lib/legal-seo";

const EMAIL = "dmca@allwordtools.com";

export const Route = createFileRoute("/dmca")({
  head: () =>
    legalHead({
      title: "DMCA Policy",
      description:
        "How to submit a copyright infringement notice or counter-notice for content on AllWordTools.com.",
      path: "/dmca",
      crumb: "DMCA",
    }),
  component: DmcaPage,
});

export function DmcaPage() {
  return (
    <PageLayout
      crumb="DMCA"
      title="DMCA / Copyright Policy"
      intro="Last updated July 2026. We respect intellectual property rights and respond to valid notices."
    >
      <Prose>
        <p>
          AllWordTools.com respects the intellectual property of others. If you believe content on
          our Service infringes your copyright, you may submit a notice under the Digital Millennium
          Copyright Act (DMCA) or applicable intellectual property law.
        </p>

        <h2>Filing a Copyright Notice</h2>
        <p>To be effective, your notice should include:</p>
        <ul>
          <li>Your physical or electronic signature.</li>
          <li>Identification of the copyrighted work you claim has been infringed.</li>
          <li>The URL or location of the allegedly infringing material on our Service.</li>
          <li>Your contact information (name, address, email, phone).</li>
          <li>
            A statement that you have a good-faith belief the use is not authorised by the copyright
            owner, its agent or the law.
          </li>
          <li>
            A statement, under penalty of perjury, that the information is accurate and that you are
            the owner or authorised to act on the owner's behalf.
          </li>
        </ul>

        <h2>Counter-Notice</h2>
        <p>
          If you believe your content was removed by mistake or misidentification, you may submit a
          counter-notice containing your signature, identification of the removed material and its
          former location, a statement under penalty of perjury that removal was a mistake, and your
          contact information and consent to jurisdiction.
        </p>

        <h2>Repeat Infringers</h2>
        <p>
          We may, in appropriate circumstances, restrict or terminate access for users who are
          repeat infringers.
        </p>

        <h2>Contact / Designated Agent</h2>
        <p>
          Notices and counter-notices may be submitted to our designated contact at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> (Attention: DMCA / Copyright Agent, Firoz Khan,
          FK Digital Media). For general questions or non-copyright inquiries, please use our{" "}
          <Link to="/contact">contact page</Link>.
        </p>
      </Prose>
    </PageLayout>
  );
}
