import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getToolMethodology } from "@/data/tool-methodology";
import { uiText } from "@/i18n/ui-template";
import { AlertCircle, Bot, Cpu, Gamepad2, Layers } from "lucide-react";

export type DisclaimerType = "word-list" | "ai" | "game" | "calculation";

export function getToolDisclaimerType(slug: string): DisclaimerType {
  const m = getToolMethodology(slug);
  if (m.source.includes("AI")) return "ai";
  if (slug.includes("scrabble") || slug.includes("words-with-friends") || slug.includes("boggle") || slug.includes("wordle")) return "game";
  if (m.source.includes("Deterministic") || m.processing.includes("deterministic") || m.resultType.includes("statistics")) return "calculation";
  return "word-list";
}

export function DisclaimerBanner({ slug, className = "" }: { slug: string; className?: string }) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const type = getToolDisclaimerType(slug);

  const limitationsPath = isDefault ? "/data-limitations" : "/$locale/data-limitations";
  const aiPath = isDefault ? "/ai-tools" : "/$locale/ai-tools";
  const reportPath = isDefault ? "/report-error" : "/$locale/report-error";
  const routeParams = isDefault ? {} : { locale };

  if (type === "ai") {
    return (
      <div className={`flex items-center justify-between gap-3 rounded-xl border border-purple-500/25 bg-purple-500/5 px-3.5 py-2 text-xs text-muted-foreground ${className}`}>
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <span>
            <strong className="text-foreground font-medium">{uiText(locale, "disclaimer.aiNotice", "AI Notice:")}</strong> {uiText(locale, "disclaimer.aiBody", "AI-generated content may contain errors. Review important results before relying on them.")}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <Link to={aiPath} params={routeParams} className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
            {uiText(locale, "methodology.aiTransparency", "AI Transparency")}
          </Link>
        </div>
      </div>
    );
  }

  if (type === "game") {
    return (
      <div className={`flex items-center justify-between gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 px-3.5 py-2 text-xs text-muted-foreground ${className}`}>
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong className="text-foreground font-medium">{uiText(locale, "disclaimer.gameNotice", "Game Notice:")}</strong> {uiText(locale, "disclaimer.gameBody", "Game rules and accepted word lists differ by game and change over time. Independent tool.")}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <Link to={limitationsPath} params={routeParams} className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
            {uiText(locale, "disclaimer.scoringRules", "Scoring Rules")}
          </Link>
        </div>
      </div>
    );
  }

  if (type === "calculation") {
    return (
      <div className={`flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/30 px-3.5 py-2 text-xs text-muted-foreground ${className}`}>
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>
            <strong className="text-foreground font-medium">{uiText(locale, "disclaimer.calcNotice", "Calculation Notice:")}</strong> {uiText(locale, "disclaimer.calcBody", "Calculated results depend on user inputs and the methodology described on this page.")}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <Link to={limitationsPath} params={routeParams} className="text-honey font-medium hover:underline">
            {uiText(locale, "disclaimer.limitations", "Limitations")}
          </Link>
        </div>
      </div>
    );
  }

  // Default: word-list
  return (
    <div className={`flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/30 px-3.5 py-2 text-xs text-muted-foreground ${className}`}>
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span>
          <strong className="text-foreground font-medium">{uiText(locale, "disclaimer.wordListNotice", "Word List Notice:")}</strong> {uiText(locale, "disclaimer.wordListBody", "Word validity depends on the word list used by this tool.")}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0 text-[11px]">
        <Link to={limitationsPath} params={routeParams} className="text-honey font-medium hover:underline">
          {uiText(locale, "disclaimer.dataLimitations", "Data Limitations")}
        </Link>
        <Link to={reportPath} params={routeParams} className="text-muted-foreground hover:text-foreground underline decoration-dotted">
          {uiText(locale, "disclaimer.reportError", "Report Error")}
        </Link>
      </div>
    </div>
  );
}
