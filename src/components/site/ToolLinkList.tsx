import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toolIcons, type Tool } from "@/data/tools";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getLocalizedToolInfo } from "@/i18n/tools-data";

/**
 * Compact, titled list of internal tool links with descriptive anchors.
 * Used for the many contextual "related" sections on tool pages
 * (Similar Tools, Popular In This Category, Users Also Used, etc.).
 */
export function ToolLinkList({
  title,
  tools,
  columns = 2,
}: {
  title: string;
  tools: Tool[];
  columns?: 1 | 2 | 3;
}) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;

  if (tools.length === 0) return null;
  const grid = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <div>
      <h3 className="font-display text-base font-semibold tracking-tight">{title}</h3>
      <ul className={`mt-3 grid gap-x-6 gap-y-2 ${grid}`}>
        {tools.map((tool) => {
          const Icon = toolIcons[tool.slug];
          return (
            <li key={tool.slug}>
              <Link
                to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-honey"
              >
                {Icon ? (
                  <Icon className="h-3.5 w-3.5 shrink-0 text-honey/60" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-honey/60" />
                )}
                <span>{getLocalizedToolInfo(tool, locale).name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
