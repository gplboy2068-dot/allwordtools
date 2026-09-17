import { useEffect, useRef } from "react";

interface AdBannerProps {
  className?: string;
  label?: string;
}

export function AdBanner({ className = "", label = "Advertisement" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script is already present in container
    const existingScript = containerRef.current.querySelector("script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://pl31388457.profitableratecpmnetwork.com/6c3f09b1b017c086c6fc02e8b60b4aa9/invoke.js";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto my-8 w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-3 sm:p-5 text-center shadow-soft backdrop-blur transition-all">
        <div className="mb-2 flex items-center justify-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
            {label}
          </span>
        </div>

        {/* Responsive ad unit slot */}
        <div
          ref={containerRef}
          className="flex min-h-[90px] w-full items-center justify-center overflow-x-auto"
        >
          <div
            id="container-6c3f09b1b017c086c6fc02e8b60b4aa9"
            className="w-full flex justify-center items-center min-h-[90px]"
          />
        </div>
      </div>
    </aside>
  );
}
