import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock3, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { allTools, toolIcons } from "@/data/tools";
import { getLocalizedToolInfo } from "@/i18n/tools-data";
import {
  getFavorites,
  getRecents,
  onFavoritesChanged,
  toggleFavorite,
} from "@/lib/engagement";
import { Sparkles } from "lucide-react";

/** ⭐ favourite toggle shown in every tool page's meta row. */
export function FavoriteButton({ slug }: { slug: string }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    const sync = () => setFav(getFavorites().includes(slug));
    sync();
    return onFavoritesChanged(sync);
  }, [slug]);
  return (
    <button
      onClick={() => setFav(toggleFavorite(slug))}
      aria-pressed={fav}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium transition-colors",
        fav
          ? "border-honey/70 bg-honey/10 text-honey"
          : "border-border/60 bg-card/70 text-foreground hover:border-honey/60",
      )}
    >
      <Star className={cn("h-3.5 w-3.5", fav && "fill-honey")} />
      {fav ? "Saved" : "Save tool"}
    </button>
  );
}

function ToolChip({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const tool = allTools.find((t) => t.slug === slug);
  if (!tool) return null;
  const Icon = toolIcons[slug] ?? Sparkles;
  const info = getLocalizedToolInfo(tool, locale);
  return (
    <Link
      to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
      params={isDefault ? { tool: slug } : { locale, tool: slug }}
      className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card py-1.5 pl-2 pr-3.5 text-sm font-medium shadow-soft transition-colors hover:border-honey/60 hover:bg-accent"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-honey/15 text-honey">
        <Icon className="h-3.5 w-3.5" />
      </span>
      {info.name}
    </Link>
  );
}

/**
 * "My Tools" strip: the user's ⭐ favourites and recently used tools.
 * Renders nothing until the user has at least one of either.
 */
export function MyToolsStrip() {
  const [favs, setFavs] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => {
      setFavs(getFavorites());
      setRecents(getRecents());
    };
    sync();
    return onFavoritesChanged(sync);
  }, []);
  const recentOnly = recents.filter((r) => !favs.includes(r)).slice(0, 6);
  if (favs.length === 0 && recentOnly.length === 0) return null;
  return (
    <section className="border-b border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl space-y-3 px-4 py-5 sm:px-6 lg:px-8">
        {favs.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-honey text-honey" /> My tools
            </span>
            {favs.map((slug) => (
              <ToolChip key={slug} slug={slug} />
            ))}
          </div>
        )}
        {recentOnly.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" /> Recently used
            </span>
            {recentOnly.map((slug) => (
              <ToolChip key={slug} slug={slug} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
