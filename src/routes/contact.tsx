import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, Bug, Lightbulb, Briefcase, ShieldCheck, AlertCircle, User, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { legalHead } from "@/lib/legal-seo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMAIL = "hello@allwordtools.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/firoz-khan-1153358a/";
const GITHUB_URL = "https://github.com/fkdigitalmedia";
const INSTAGRAM_URL = "https://www.instagram.com/rtibyfiroz/";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  topic: z.string().min(1, "Please choose a topic"),
  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters")
    .max(2000, "Message is too long"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export const Route = createFileRoute("/contact")({
  head: () =>
    legalHead({
      title: "Contact & Error Reporting",
      description:
        "Contact Firoz Khan and the AllWordTools project under FK Digital Media. Report incorrect words, solver bugs, suggest tools, or make general inquiries.",
      path: "/contact",
      crumb: "Contact",
    }),
  component: ContactPage,
});

export function ContactPage() {
  const [topic, setTopic] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      topic,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    const { name, email, topic: t, message } = result.data;
    const subject = encodeURIComponent(`[${t}] Message from ${name} via AllWordTools`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})\nTopic: ${t}`);
    // Open the user's email client with a prefilled message.
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Thanks! Your email draft is ready to send.");
    form.reset();
    setTopic("");
    setSubmitting(false);
  }

  return (
    <PageLayout
      crumb="Contact"
      title="Contact & Error Reporting"
      intro="AllWordTools is developed and maintained by Firoz Khan under FK Digital Media. Reach out for word corrections, bug reports, feature suggestions, or business inquiries."
    >
      {/* Dedicated error reporting banner */}
      <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-foreground">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <strong className="font-semibold block text-sm">Reporting a word error, missing dictionary term, or solver bug?</strong>
            <span className="text-muted-foreground">Use our dedicated error reporting form with structured issue categories for faster review.</span>
          </div>
          <Button asChild size="sm" variant="outline" className="rounded-full shrink-0 border-amber-500/40 text-foreground hover:bg-amber-500/20">
            <Link to="/report-error">Open Error Form &rarr;</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              maxLength={100}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Your name"
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={255}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger
                id="topic"
                aria-invalid={!!errors.topic}
                aria-describedby={errors.topic ? "topic-error" : undefined}
              >
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Word / Dictionary Error">Report a Word or Dictionary Error</SelectItem>
                <SelectItem value="Tool Bug / Broken Feature">Report a Solver Bug or Broken Feature</SelectItem>
                <SelectItem value="General Enquiry">General Enquiry</SelectItem>
                <SelectItem value="Suggestion / New Tool">Suggestion for a New Tool or Improvement</SelectItem>
                <SelectItem value="Business / Collaboration">Business or Collaboration</SelectItem>
                <SelectItem value="Privacy Request">Privacy Request</SelectItem>
              </SelectContent>
            </Select>
            {errors.topic && (
              <p id="topic-error" className="text-sm text-destructive">
                {errors.topic}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              maxLength={2000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Please provide details (for word errors, include the tool name, input entered, expected word, and any relevant game rules)."
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={submitting} className="gap-2">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Send message
          </Button>
          <p className="text-sm text-muted-foreground">
            Prefer direct email? Write to{" "}
            <a href={`mailto:${EMAIL}`} className="font-medium text-honey hover:underline">
              {EMAIL}
            </a>
            .
          </p>
        </form>

        {/* Contact options & Identity */}
        <aside className="space-y-4">
          <ContactCard
            icon={<AlertCircle className="h-5 w-5" />}
            title="Report a Word or Tool Error"
            desc="Found an incorrect word, missing entry, wrong definition, wrong syllable count, inaccurate score, or solver glitch? We appreciate your help in keeping our tools accurate."
          />
          <ContactCard
            icon={<Bug className="h-5 w-5" />}
            title="Bug reports"
            desc="Something not displaying properly or failing to load? Let us know which browser and device you are using."
          />
          <ContactCard
            icon={<Lightbulb className="h-5 w-5" />}
            title="Suggestions"
            desc="Ideas for new tools, additional language datasets, or workflow improvements."
          />
          <ContactCard
            icon={<Briefcase className="h-5 w-5" />}
            title="Business inquiries"
            desc="Partnerships, technical inquiries, and collaborations."
          />
          <ContactCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Privacy requests"
            desc={
              <>
                Access or data inquiries — read our{" "}
                <Link to="/privacy" className="font-medium text-honey hover:underline">
                  Privacy Policy
                </Link>
                .
              </>
            }
          />

          {/* Maintainer Identity Card */}
          <div className="mt-6 rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-honey">
              <User className="h-4 w-4" /> Project Maintainer
            </div>
            <h4 className="mt-2 font-display text-base font-bold text-foreground">Firoz Khan</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Full Stack Developer · <span className="font-medium text-foreground">FK Digital Media</span>
            </p>
            <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
              Firoz builds and maintains AllWordTools.com independently. View his background, technical focus, and profile links:
            </p>
            <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-border/60 text-xs">
              <Link to="/about/firoz-khan" className="font-semibold text-honey hover:underline">
                Author Profile →
              </Link>
              <span className="text-muted-foreground/40">·</span>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                GitHub
              </a>
              <span className="text-muted-foreground/40">·</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                LinkedIn
              </a>
              <span className="text-muted-foreground/40">·</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                Instagram
              </a>
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}

function ContactCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-honey">
        {icon}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
