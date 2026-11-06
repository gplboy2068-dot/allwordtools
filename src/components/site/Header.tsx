import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, Sparkles, SpellCheck2, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ToolSearchDialog } from "./ToolSearchDialog";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  categories,
  headerToolSlugs,
  toolIcons,
  toolsFromSlugs,
  totalToolCount,
} from "@/data/tools";

const topTools = toolsFromSlugs(headerToolSlugs);
const aiCategory = categories.find((c) => c.slug === "ai-tools");
const browseCategories = categories.filter((c) => c.slug !== "ai-tools");

const linkClass =
  "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";
const triggerClass =
  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-foreground";

import { DEFAULT_LOCALE } from "@/i18n/locales";

export function Header() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isDefault = locale === DEFAULT_LOCALE;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to={isDefault ? "/" : "/$locale/"}
          params={isDefault ? {} : { locale }}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="AllWordTools home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-ink text-primary-foreground shadow-soft">
            <SpellCheck2 className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            AllWord<span className="text-honey">Tools</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <Link
            to={isDefault ? "/" : "/$locale/"}
            params={isDefault ? {} : { locale }}
            className={linkClass}
            activeProps={{ className: "text-foreground" }}
            activeOptions={{ exact: true }}
          >
            {t("nav.home")}
          </Link>

          {/* Tools dropdown — a handful of popular tools + View all */}
          <DropdownMenu>
            <DropdownMenuTrigger className={triggerClass}>
              {t("nav.tools")} <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("nav.mostPopular")}
              </DropdownMenuLabel>
              {topTools.map((tool) => {
                const Icon = toolIcons[tool.slug];
                return (
                  <DropdownMenuItem key={tool.slug} asChild>
                    <Link
                      to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                      params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                      className="cursor-pointer"
                    >
                      {Icon ? <Icon className="mr-2 h-4 w-4 text-honey" /> : null}
                      {tool.name}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to={isDefault ? "/tools" : "/$locale/tools"}
                  params={isDefault ? {} : { locale }}
                  className="cursor-pointer font-semibold text-honey"
                >
                  {t("nav.viewAll", { count: totalToolCount })}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Categories dropdown — names only */}
          <DropdownMenu>
            <DropdownMenuTrigger className={triggerClass}>
              {t("nav.categories")} <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="grid w-[34rem] grid-cols-2 gap-0.5">
              {browseCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <DropdownMenuItem key={cat.slug} asChild>
                    <Link
                      to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                      params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 h-4 w-4 text-honey" />
                      <span className="truncate">{cat.title}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* AI Tools dropdown */}
          {aiCategory && (
            <DropdownMenu>
              <DropdownMenuTrigger className={triggerClass}>
                <Sparkles className="h-3.5 w-3.5 text-honey" /> {t("nav.aiTools")}{" "}
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72">
                {aiCategory.tools.map((tool) => {
                  const Icon = toolIcons[tool.slug];
                  return (
                    <DropdownMenuItem key={tool.slug} asChild>
                      <Link
                        to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                        params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                        className="cursor-pointer"
                      >
                        {Icon ? <Icon className="mr-2 h-4 w-4 text-honey" /> : null}
                        {tool.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                    params={isDefault ? { category: "ai-tools" } : { locale, category: "ai-tools" }}
                    className="cursor-pointer font-semibold text-honey"
                  >
                    {t("nav.exploreAiTools")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link
            to={isDefault ? "/learn" : "/$locale/learn"}
            params={isDefault ? {} : { locale }}
            className={linkClass}
            activeProps={{ className: "text-foreground" }}
          >
            {t("nav.learn")}
          </Link>
          <Link
            to={isDefault ? "/blog" : "/$locale/blog"}
            params={isDefault ? {} : { locale }}
            className={linkClass}
            activeProps={{ className: "text-foreground" }}
          >
            {t("nav.blog")}
          </Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label={t("nav.search")}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border/60 bg-background px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <Link
            to={isDefault ? "/" : "/$locale/"}
            params={isDefault ? {} : { locale }}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            {t("nav.home")}
          </Link>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="tools" className="border-none">
              <AccordionTrigger className="rounded-lg px-3 py-2.5 text-sm font-medium hover:no-underline">
                {t("nav.popularTools")}
              </AccordionTrigger>
              <AccordionContent className="pb-1 pl-3">
                {topTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                    params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                ))}
                <Link
                  to={isDefault ? "/tools" : "/$locale/tools"}
                  params={isDefault ? {} : { locale }}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-honey"
                >
                  {t("nav.viewAll", { count: totalToolCount })}
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categories" className="border-none">
              <AccordionTrigger className="rounded-lg px-3 py-2.5 text-sm font-medium hover:no-underline">
                {t("nav.categories")}
              </AccordionTrigger>
              <AccordionContent className="pb-1 pl-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                    params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {cat.title}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            to={isDefault ? "/learn" : "/$locale/learn"}
            params={isDefault ? {} : { locale }}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            {t("nav.learn")}
          </Link>
          <Link
            to={isDefault ? "/blog" : "/$locale/blog"}
            params={isDefault ? {} : { locale }}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            {t("nav.blog")}
          </Link>
        </nav>
      )}

      <ToolSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
