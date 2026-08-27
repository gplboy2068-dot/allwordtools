import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn, SpellCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { BASE_URL } from "@/i18n/seo";

const SITE = "AllWordTools.com";
const TITLE = `Login — ${SITE}`;
const DESCRIPTION =
  "Sign in to AllWordTools to save favourite tools, track quiz progress and sync across devices.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/login` },
      { property: "og:site_name", content: SITE },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/login` }],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-hero px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-lift">
        <Link
          to="/"
          className="flex items-center justify-center gap-2.5"
          aria-label="AllWordTools home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-ink text-primary-foreground">
            <SpellCheck2 className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            AllWord<span className="text-honey">Tools</span>
          </span>
        </Link>

        <h1 className="mt-6 text-center font-display text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Sign in to save favourites and track your progress.
        </p>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="h-11 w-full rounded-xl text-base font-semibold">
            <LogIn className="mr-2 h-4 w-4" /> Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Accounts are coming soon. All tools are 100% free to use without signing in.
        </p>

        <div className="mt-6 border-t border-border/60 pt-5 text-center text-sm flex justify-between items-center">
          <Link to="/" className="font-medium text-honey hover:underline">
            ← Back to home
          </Link>
          <Link to="/admin" className="font-medium text-primary hover:underline">
            AI Translation Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
