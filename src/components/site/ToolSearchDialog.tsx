import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { categories, toolIcons } from "@/data/tools";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Global tool search — a command palette that searches every tool by name and
 * description and jumps straight to the tool page. Also opens with ⌘K / Ctrl+K.
 */
export function ToolSearchDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const groups = useMemo(() => categories, []);

  const go = (slug: string) => {
    onOpenChange(false);
    setQuery("");
    navigate({ to: "/tool/$tool", params: { tool: slug } });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search 92 word tools…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No tools found. Try another search.</CommandEmpty>
        {groups.map((cat) => (
          <CommandGroup key={cat.slug} heading={cat.title}>
            {cat.tools.map((tool) => {
              const Icon = toolIcons[tool.slug];
              return (
                <CommandItem
                  key={tool.slug}
                  value={`${tool.name} ${tool.description} ${cat.title}`}
                  onSelect={() => go(tool.slug)}
                >
                  {Icon ? <Icon className="mr-2 h-4 w-4 text-honey" /> : null}
                  <span className="font-medium">{tool.name}</span>
                  <span className="ml-2 truncate text-xs text-muted-foreground">
                    {tool.description}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
