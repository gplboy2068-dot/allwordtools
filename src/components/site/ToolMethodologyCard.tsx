import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getToolMethodology } from "@/data/tool-methodology";
import {
  Database,
  Cpu,
  Sparkles,
  Info,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function ToolMethodologyCard({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const m = getToolMethodology(slug);

  const methodologyPath = isDefault ? "/methodology" : "/$locale/methodology";
  const contactPath = isDefault ? "/contact" : "/$locale/contact";
  const routeParams = isDefault ? {} : { locale };

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:border-border">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-honey/10 text-honey">
            <Database className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
              Data Source &amp; Methodology
            </h3>
            <p className="text-xs text-muted-foreground">
              Transparent lexical datasets, algorithms, and limitations
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="text-[11px] font-medium">
            {m.source}
          </Badge>
          <Badge variant="outline" className="text-[11px] font-medium border-border/80">
            {m.resultType}
          </Badge>
        </div>
      </div>

      {/* Primary Technical Summary */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
        <div className="rounded-xl border border-border/50 bg-secondary/30 p-3">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Cpu className="h-3.5 w-3.5 text-honey" />
            Processing Method
          </span>
          <p className="mt-1 text-muted-foreground leading-relaxed">
            {m.processingDescription}
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-secondary/30 p-3">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-honey" />
            Dataset &amp; Validation
          </span>
          <p className="mt-1 text-muted-foreground leading-relaxed">
            {m.sourceDescription}
          </p>
        </div>
      </div>

      {m.scoringRules && (
        <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs">
          <span className="font-medium text-foreground">Scoring &amp; Multipliers: </span>
          <span className="text-muted-foreground leading-relaxed">{m.scoringRules}</span>
        </div>
      )}

      {/* Accordion for Caveats & Full Methodology Link */}
      <Accordion type="single" collapsible className="mt-2 w-full border-t border-border/40">
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground">
            View dataset limitations &amp; word validity rules
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-1 text-xs text-muted-foreground leading-relaxed">
            <div className="flex items-start gap-2 rounded-lg bg-secondary/40 p-2.5">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              <div>
                <strong className="font-medium text-foreground">Word Validity Notice:</strong>{" "}
                {m.limitations}
              </div>
            </div>

            <p>
              Different word games and tournament associations maintain their own distinct dictionaries
              (e.g., Collins CSW, NASPA NWL, Zynga WWF). Word validity is determined by the specific
              word list or dataset used by this tool. For sanctioned tournament play, always verify
              against the designated official rulebook.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={methodologyPath}
                  params={routeParams}
                  className="inline-flex items-center gap-1 font-semibold text-honey hover:underline"
                >
                  Full Methodology Guide
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  to={isDefault ? "/data-limitations" : "/$locale/data-limitations"}
                  params={routeParams}
                  className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground hover:underline"
                >
                  Data Limitations
                </Link>
                {m.source.includes("AI") && (
                  <Link
                    to={isDefault ? "/ai-tools" : "/$locale/ai-tools"}
                    params={routeParams}
                    className="inline-flex items-center gap-1 font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    AI Transparency
                  </Link>
                )}
              </div>
              <Link
                to={isDefault ? "/report-error" : "/$locale/report-error"}
                params={routeParams}
                className="text-xs text-muted-foreground hover:text-foreground underline decoration-dotted"
              >
                Report a dictionary error or missing word
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
