import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Globe2,
  Sparkles,
  Bot,
  Layers,
  CheckCircle2,
  AlertCircle,
  Play,
  Save,
  RefreshCw,
  Search,
  ArrowRight,
  Key,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  FileText,
  HelpCircle,
  ListOrdered,
  BookOpen,
  Database,
  Server,
  Activity,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { categories, allTools, type Tool } from "@/data/tools";
import { toolContent } from "@/data/tool-content";
import { LOCALES } from "@/i18n/locales";
import {
  getTranslationStats,
  translateToolWithAi,
  translateCategoryWithAi,
  saveToolTranslation,
  type LocaleCoverage,
} from "@/lib/translation.functions";
import { checkDbStatus, type DbStatusResponse } from "@/lib/db.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "AI Translation Studio — Admin | AllWordTools" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminTranslationStudio,
});

export function AdminTranslationStudio() {
  const [selectedLocale, setSelectedLocale] = useState("hi");
  const [selectedCategory, setSelectedCategory] = useState("word-solvers");
  const [selectedToolSlug, setSelectedToolSlug] = useState<string>("word-unscrambler");
  const [apiKey, setApiKey] = useState("");
  const [stats, setStats] = useState<LocaleCoverage | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [translatingTool, setTranslatingTool] = useState(false);
  const [translatingCategory, setTranslatingCategory] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number; currentSlug?: string } | null>(null);

  // Form states for the currently selected tool
  const [toolForm, setToolForm] = useState<{
    name: string;
    metaTitle: string;
    metaDescription: string;
    heading: string;
    subheading: string;
    howToTitle: string;
    howToSteps: { title: string; detail: string }[];
    faqs: { question: string; answer: string }[];
    examples: { input: string; output: string; note: string }[];
  }>({
    name: "",
    metaTitle: "",
    metaDescription: "",
    heading: "",
    subheading: "",
    howToTitle: "",
    howToSteps: [],
    faqs: [],
    examples: [],
  });

  const selectedCatObj = categories.find((c) => c.slug === selectedCategory) || categories[0];
  const selectedToolObj = allTools.find((t) => t.slug === selectedToolSlug) || allTools[0];
  const sourceToolContent = toolContent[selectedToolSlug];

  const [dbStatus, setDbStatus] = useState<DbStatusResponse | null>(null);
  const [checkingDb, setCheckingDb] = useState(false);

  // Load stats when locale changes
  const loadStats = async (loc: string) => {
    setLoadingStats(true);
    try {
      const res = await getTranslationStats({ data: { locale: loc } });
      setStats(res);
    } catch (err: any) {
      toast.error("Failed to load translation coverage: " + (err.message || String(err)));
    } finally {
      setLoadingStats(false);
    }
  };

  const loadDbStatus = async () => {
    setCheckingDb(true);
    try {
      const res = await checkDbStatus();
      setDbStatus(res);
      if (res.connected) {
        toast.success("Connected to Cloudflare D1 Database!");
      }
    } catch (err: any) {
      toast.error("DB Status check failed: " + (err.message || String(err)));
    } finally {
      setCheckingDb(false);
    }
  };

  useEffect(() => {
    loadStats(selectedLocale);
    loadDbStatus();
  }, [selectedLocale]);

  // Handle single tool translation with AI
  const handleTranslateTool = async () => {
    if (!selectedToolSlug) return;
    setTranslatingTool(true);
    try {
      const res = await translateToolWithAi({
        data: {
          slug: selectedToolSlug,
          targetLocale: selectedLocale,
          apiKey: apiKey.trim() || undefined,
        },
      });
      if (res.success && res.data) {
        setToolForm({
          name: res.data.name || selectedToolObj.name,
          metaTitle: res.data.metaTitle || "",
          metaDescription: res.data.metaDescription || "",
          heading: res.data.heading || "",
          subheading: res.data.subheading || "",
          howToTitle: res.data.howToTitle || "",
          howToSteps: res.data.howToSteps || [],
          faqs: res.data.faqs || [],
          examples: res.data.examples || [],
        });
        toast.success(`Successfully translated "${selectedToolObj.name}" to ${selectedLocale.toUpperCase()}!`);
        loadStats(selectedLocale);
      }
    } catch (err: any) {
      toast.error("AI Translation failed: " + (err.message || String(err)));
    } finally {
      setTranslatingTool(false);
    }
  };

  // Handle batch category translation with AI
  const handleTranslateCategory = async () => {
    if (!selectedCategory || !selectedCatObj) return;
    setTranslatingCategory(true);
    setBatchProgress({ current: 0, total: selectedCatObj.tools.length });

    let count = 0;
    for (const tool of selectedCatObj.tools) {
      setBatchProgress({
        current: count + 1,
        total: selectedCatObj.tools.length,
        currentSlug: tool.name,
      });
      try {
        await translateToolWithAi({
          data: {
            slug: tool.slug,
            targetLocale: selectedLocale,
            apiKey: apiKey.trim() || undefined,
          },
        });
        count++;
      } catch (err) {
        console.error(`Failed tool ${tool.slug}`, err);
      }
    }

    setTranslatingCategory(false);
    setBatchProgress(null);
    toast.success(`Category "${selectedCatObj.title}" translated! (${count}/${selectedCatObj.tools.length} tools updated)`);
    loadStats(selectedLocale);
  };

  // Handle manual saving
  const handleSaveTool = async () => {
    try {
      await saveToolTranslation({
        data: {
          slug: selectedToolSlug,
          targetLocale: selectedLocale,
          content: toolForm,
        },
      });
      toast.success("Translation saved to site data successfully!");
      loadStats(selectedLocale);
    } catch (err: any) {
      toast.error("Failed to save: " + (err.message || String(err)));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/60 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-honey text-honey-foreground shadow-soft">
                <Bot className="h-5 w-5" />
              </span>
              <Badge variant="outline" className="text-honey border-honey/40">
                Admin Studio
              </Badge>
              <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                ☁️ Cloudflare D1 Database Ready
              </Badge>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              AI Multi-Language Translation Studio
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Translate tools and category landing pages category-wise into any language using AI in one click.
            </p>
          </div>

          {/* Quick API key setting */}
          <div className="flex items-center gap-3 bg-card border border-border/70 p-3 rounded-2xl shadow-soft">
            <Key className="h-4 w-4 text-honey shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">Custom AI API Key (Optional)</span>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="text-xs bg-transparent border-0 outline-none placeholder:text-muted-foreground w-44"
              />
            </div>
          </div>
        </div>

        {/* Cloudflare D1 Database Diagnostics Card */}
        <div className="mt-6 rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                dbStatus?.connected ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              }`}>
                <Database className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-sm">Database Status:</span>
                  <Badge variant="outline" className={
                    dbStatus?.connected
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                  }>
                    {dbStatus?.connected ? "🟢 Cloudflare D1 Active" : "⚪ File-Based Fallback"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {dbStatus?.message || "Checking database connectivity..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-xs font-semibold text-foreground">
                  {dbStatus?.toolsCount ?? 92} Tools · {dbStatus?.translationsCount ?? 644} Translations
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Latency: {dbStatus?.latencyMs ?? 0}ms
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-semibold"
                onClick={loadDbStatus}
                disabled={checkingDb}
              >
                <Activity className={`mr-1.5 h-3.5 w-3.5 ${checkingDb ? "animate-spin" : ""}`} />
                {checkingDb ? "Testing..." : "Test Connection"}
              </Button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar for Selected Language */}
        <div className="mt-6 rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Target Language
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {LOCALES.filter((l) => l.code !== "en").map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => setSelectedLocale(loc.code)}
                    className={
                      selectedLocale === loc.code
                        ? "inline-flex items-center gap-1.5 rounded-full gradient-honey px-4 py-1.5 text-sm font-semibold text-honey-foreground shadow-soft"
                        : "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/50 px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    }
                  >
                    <span>{loc.flag}</span>
                    <span>{loc.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-2xl font-bold font-display text-honey">
                  {stats?.overallPercent ?? 0}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {stats?.translatedTools ?? 0} of {stats?.totalTools ?? allTools.length} tools translated
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadStats(selectedLocale)}
                disabled={loadingStats}
              >
                <RefreshCw className={`h-4 w-4 ${loadingStats ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          <Progress value={stats?.overallPercent ?? 0} className="mt-5 h-2" />
        </div>

        {/* Category Grid & Tool Selector */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left Column: Categories List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-display text-lg font-semibold tracking-tight flex items-center justify-between">
              <span>Categories ({categories.length})</span>
            </h2>

            <div className="space-y-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const catCoverage = stats?.categories.find((c) => c.categorySlug === cat.slug);
                const isSelected = selectedCategory === cat.slug;

                return (
                  <div
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      if (cat.tools.length > 0) {
                        setSelectedToolSlug(cat.tools[0].slug);
                      }
                    }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? "border-honey bg-honey/10 shadow-soft"
                        : "border-border/70 bg-card hover:border-honey/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                            isSelected ? "gradient-honey text-honey-foreground" : "bg-accent text-accent-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="font-semibold text-sm">{cat.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {cat.tools.length} tools
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          (catCoverage?.percent ?? 0) >= 100
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }
                      >
                        {catCoverage?.percent ?? 0}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Category Tools & Translation Workspace (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Category Action Banner */}
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-honey uppercase tracking-wider">
                    Selected Category
                  </span>
                  <h3 className="font-display text-2xl font-bold">{selectedCatObj.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedCatObj.description}
                  </p>
                </div>

                <Button
                  onClick={handleTranslateCategory}
                  disabled={translatingCategory}
                  className="rounded-full gradient-honey text-honey-foreground font-semibold shrink-0"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {translatingCategory ? "Translating Category..." : "Translate Category with AI"}
                </Button>
              </div>

              {batchProgress && (
                <div className="mt-4 p-4 rounded-2xl bg-secondary/50 border border-border/60">
                  <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
                    <span>
                      Translating {batchProgress.current} of {batchProgress.total}: {batchProgress.currentSlug}
                    </span>
                    <span>{Math.round((batchProgress.current / batchProgress.total) * 100)}%</span>
                  </div>
                  <Progress value={(batchProgress.current / batchProgress.total) * 100} className="h-2" />
                </div>
              )}

              {/* Tools chips */}
              <div className="mt-6 border-t border-border/60 pt-4">
                <span className="text-xs font-medium text-muted-foreground">Tools in this category:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedCatObj.tools.map((t) => {
                    const isSelected = selectedToolSlug === t.slug;
                    return (
                      <button
                        key={t.slug}
                        onClick={() => setSelectedToolSlug(t.slug)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "border border-border/70 bg-card text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Tool Translation Editor */}
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                  <span className="text-xs font-semibold text-honey uppercase tracking-wider">
                    Tool Editor
                  </span>
                  <h4 className="font-display text-xl font-bold">{selectedToolObj.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    English Slug: <code className="bg-accent px-1.5 py-0.5 rounded">{selectedToolSlug}</code>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleTranslateTool}
                    disabled={translatingTool}
                    variant="outline"
                    className="rounded-full"
                  >
                    <Bot className="mr-2 h-4 w-4 text-honey" />
                    {translatingTool ? "Generating with AI..." : "Translate This Tool"}
                  </Button>
                  <Button onClick={handleSaveTool} className="rounded-full">
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="t-name">Localized Tool Name</Label>
                  <Input
                    id="t-name"
                    value={toolForm.name}
                    onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                    placeholder={selectedToolObj.name}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="t-metaTitle">Meta Title (SEO)</Label>
                    <span className={`text-xs ${toolForm.metaTitle.length > 58 ? "text-amber-500" : "text-muted-foreground"}`}>
                      {toolForm.metaTitle.length}/58 chars
                    </span>
                  </div>
                  <Input
                    id="t-metaTitle"
                    value={toolForm.metaTitle}
                    onChange={(e) => setToolForm({ ...toolForm, metaTitle: e.target.value })}
                    placeholder={`${selectedToolObj.name} — AllWordTools`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="t-metaDesc">Meta Description (SEO)</Label>
                <Textarea
                  id="t-metaDesc"
                  rows={2}
                  value={toolForm.metaDescription}
                  onChange={(e) => setToolForm({ ...toolForm, metaDescription: e.target.value })}
                  placeholder={selectedToolObj.description}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="t-heading">Page Heading (H1)</Label>
                  <Input
                    id="t-heading"
                    value={toolForm.heading}
                    onChange={(e) => setToolForm({ ...toolForm, heading: e.target.value })}
                    placeholder={sourceToolContent?.heading || selectedToolObj.name}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="t-subheading">Page Subheading</Label>
                  <Input
                    id="t-subheading"
                    value={toolForm.subheading}
                    onChange={(e) => setToolForm({ ...toolForm, subheading: e.target.value })}
                    placeholder={sourceToolContent?.subheading || selectedToolObj.description}
                  />
                </div>
              </div>

              <div className="border-t border-border/60 pt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Tip: Clicking <strong>"Translate This Tool"</strong> or <strong>"Translate Category with AI"</strong> automatically generates high-quality native copy, FAQs, and How-To steps.
                </span>
                <Link
                  to="/$locale/tool/$tool"
                  params={{ locale: selectedLocale, tool: selectedToolSlug }}
                  className="text-honey hover:underline flex items-center gap-1 font-semibold"
                >
                  View live page <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
