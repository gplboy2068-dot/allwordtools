import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { BASE_URL, inLanguage, buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Mail,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const MAINTAINER_EMAIL = "hello@allwordtools.com";

export const ERROR_CATEGORIES = [
  "Incorrect Word",
  "Missing Word",
  "Incorrect Definition",
  "Incorrect Pronunciation",
  "Incorrect Score",
  "Incorrect Calculation",
  "Incorrect Tool Result",
  "Broken Tool",
  "Outdated Information",
  "Other",
] as const;

export const Route = createFileRoute("/report-error")({
  head: () => {
    const title = "Report a Word or Tool Error — AllWordTools";
    const description =
      "Help improve AllWordTools by reporting incorrect results, missing words, scoring bugs, or outdated data directly to the engineering and maintenance team.";
    const path = "/report-error";
    const { meta, links } = buildLocaleHead({ path, locale: DEFAULT_LOCALE, title, description });
    const home = `${BASE_URL}/`;
    const url = `${BASE_URL}${path}`;

    return {
      meta,
      links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            inLanguage: inLanguage(DEFAULT_LOCALE),
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: home },
              { "@type": "ListItem", position: 2, name: "Report an Error", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: title,
            description,
            url,
            inLanguage: inLanguage(DEFAULT_LOCALE),
            isPartOf: { "@type": "WebSite", name: "AllWordTools", url: home },
          }),
        },
      ],
    };
  },
  component: ReportErrorPage,
});

export function ReportErrorPage() {
  const [category, setCategory] = useState<string>("");
  const [toolUrl, setToolUrl] = useState<string>("");
  const [wordInput, setWordInput] = useState<string>("");
  const [expectedResult, setExpectedResult] = useState<string>("");
  const [actualResult, setActualResult] = useState<string>("");
  const [sourceRef, setSourceRef] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      toast.error("Please select an error category.");
      return;
    }
    if (!wordInput && !toolUrl && !additionalDetails) {
      toast.error("Please provide the affected word, tool, or description.");
      return;
    }

    setIsSubmitting(true);

    const subject = encodeURIComponent(`[Error Report: ${category}] ${wordInput ? `Word: "${wordInput}"` : toolUrl || "AllWordTools"}`);
    const bodyContent = [
      `ISSUE CATEGORY: ${category}`,
      `TOOL OR URL: ${toolUrl || "Not specified"}`,
      `WORD OR INPUT TEXT: ${wordInput || "Not specified"}`,
      `EXPECTED RESULT: ${expectedResult || "Not specified"}`,
      `ACTUAL RESULT: ${actualResult || "Not specified"}`,
      `SOURCE OR REFERENCE: ${sourceRef || "None provided"}`,
      `ADDITIONAL DETAILS:\n${additionalDetails || "None provided"}`,
      contactEmail ? `REPORTER CONTACT: ${contactEmail}` : "REPORTER CONTACT: Anonymous",
    ].join("\n\n");

    const mailtoUrl = `mailto:${MAINTAINER_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoUrl;

    toast.success("Thank you! Your report has been prepared in your email client.");
    setIsSubmitting(false);
  };

  return (
    <PageLayout
      crumb="Report Error"
      title="Report a Word or Tool Error"
      intro="Help us improve AllWordTools by reporting incorrect results, missing words, broken tools, or outdated information."
    >
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Main Form */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Issue Category <span className="text-destructive">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="rounded-xl text-xs sm:text-sm">
                    <SelectValue placeholder="Select the type of error..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ERROR_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-xs sm:text-sm">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="toolUrl" className="text-xs font-semibold">
                  Affected Tool or Page URL
                </Label>
                <Input
                  id="toolUrl"
                  placeholder="e.g. /tool/word-unscrambler or Scrabble Helper"
                  value={toolUrl}
                  onChange={(e) => setToolUrl(e.target.value)}
                  className="rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="wordInput" className="text-xs font-semibold">
                  Word or Input Text Involved
                </Label>
                <Input
                  id="wordInput"
                  placeholder="e.g. 'QUARTZ', 'misspell', or input letters 'ABCD'"
                  value={wordInput}
                  onChange={(e) => setWordInput(e.target.value)}
                  className="rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="expectedResult" className="text-xs font-semibold">
                    Expected Result
                  </Label>
                  <Input
                    id="expectedResult"
                    placeholder="e.g. 24 points, or valid 5-letter play"
                    value={expectedResult}
                    onChange={(e) => setExpectedResult(e.target.value)}
                    className="rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="actualResult" className="text-xs font-semibold">
                    Actual Result
                  </Label>
                  <Input
                    id="actualResult"
                    placeholder="e.g. Word missing, or scored as 19 points"
                    value={actualResult}
                    onChange={(e) => setActualResult(e.target.value)}
                    className="rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sourceRef" className="text-xs font-semibold">
                  Source or Reference (Optional)
                </Label>
                <Input
                  id="sourceRef"
                  placeholder="e.g. Collins CSW21, Merriam-Webster, NASPA NWL"
                  value={sourceRef}
                  onChange={(e) => setSourceRef(e.target.value)}
                  className="rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="additionalDetails" className="text-xs font-semibold">
                  Additional Details or Steps to Reproduce
                </Label>
                <Textarea
                  id="additionalDetails"
                  rows={4}
                  placeholder="Please describe what happened, your device/browser, or why you believe this word/score is incorrect."
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  className="rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contactEmail" className="text-xs font-semibold">
                  Your Email (Optional, if you'd like a follow-up)
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="rounded-xl text-xs sm:text-sm"
                />
                <p className="text-[11px] text-muted-foreground">
                  We never share your email or use it for marketing. Only used if we need clarification on your report.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-full font-semibold"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Error Report
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info & Correction Workflow */}
        <div className="space-y-6">
          {/* Reporting Expectations */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft text-xs space-y-3">
            <h3 className="font-display text-sm font-semibold flex items-center gap-2 text-foreground">
              <ShieldCheck className="h-4 w-4 text-honey" />
              Reporting Expectations
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Reports may be reviewed to help identify data, methodology, or technical issues.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              While we cannot guarantee individual responses to every submission or promise that every reported word will be added, valid bug reports and verified missing words are scheduled for inclusion in upcoming data updates.
            </p>
          </div>

          {/* Actual Correction Workflow */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft text-xs space-y-3">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Our Data Correction Workflow
            </h3>
            <ol className="space-y-2.5 text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-foreground">1.</span>
                <span><strong>Report:</strong> User submits details of the discrepancy.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground">2.</span>
                <span><strong>Review:</strong> Maintainer inspects the report against target tool logic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground">3.</span>
                <span><strong>Verify:</strong> Cross-checked against underlying methodology (e.g. ENABLE or Wiktionary).</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground">4.</span>
                <span><strong>Correct:</strong> Data files, regex rules, or algorithms are patched.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground">5.</span>
                <span><strong>Deploy:</strong> Updated application build is pushed live to edge servers.</span>
              </li>
            </ol>
          </div>

          {/* Related Links */}
          <div className="rounded-2xl border border-border/50 bg-secondary/30 p-5 text-xs space-y-3">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Helpful Documentation
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/data-limitations" className="text-honey hover:underline flex items-center gap-1 font-medium">
                  AllWordTools Data Limitations <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-honey hover:underline flex items-center gap-1 font-medium">
                  Methodology &amp; Word Data Guide <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link to="/ai-tools" className="text-honey hover:underline flex items-center gap-1 font-medium">
                  AI Tools Transparency <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link to="/about/firoz-khan" className="text-honey hover:underline flex items-center gap-1 font-medium">
                  Maintainer: Firoz Khan Profile <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
