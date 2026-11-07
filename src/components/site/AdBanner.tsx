import { useEffect, useRef } from "react";

interface AdBannerProps {
  className?: string;
  label?: string;
}

/**
 * Adsterra ad slot (owner-provided codes, added 2026-11-07).
 *
 * Units:
 * - Leaderboard 728x90 (desktop) / Banner 320x50 (mobile) — one of the pair
 *   is injected depending on viewport width, using the network's atOptions
 *   iframe format (bauval.org invoke script).
 * - Native banner — async script + fixed container id.
 *
 * The scripts are injected client-side on mount: scripts set via innerHTML
 * never execute, and the atOptions global must be assigned immediately
 * before its invoke script runs, so both units are wired up in useEffect.
 * On unmount (SPA navigation) the injected nodes are removed so a fresh
 * slot can load on the next page.
 */

const NATIVE_SCRIPT_SRC =
  "https://bauval.org/21/6c3f09b1b017c086c6fc02e8b60b4aa9";
const NATIVE_CONTAINER_ID = "container-6c3f09b1b017c086c6fc02e8b60b4aa9";

const BANNER_DESKTOP = {
  key: "52670e89157333e4384084c42dbde0c9",
  width: 728,
  height: 90,
};
const BANNER_MOBILE = {
  key: "214f701f782e741163ec770f79b43c75",
  width: 320,
  height: 50,
};

export function AdBanner({ className = "", label = "Advertisement" }: AdBannerProps) {
  const bannerHolderRef = useRef<HTMLDivElement>(null);
  const nativeHolderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bannerHolder = bannerHolderRef.current;
    const nativeHolder = nativeHolderRef.current;
    const injected: HTMLElement[] = [];

    // --- Banner (728x90 desktop / 320x50 mobile) ---
    if (bannerHolder && !bannerHolder.dataset.loaded) {
      bannerHolder.dataset.loaded = "1";
      const unit =
        window.innerWidth >= 768 ? BANNER_DESKTOP : BANNER_MOBILE;
      (window as unknown as Record<string, unknown>).atOptions = {
        key: unit.key,
        format: "iframe",
        height: unit.height,
        width: unit.width,
        params: {},
      };
      const script = document.createElement("script");
      script.src = `https://bauval.org/22/${unit.key}`;
      bannerHolder.appendChild(script);
      injected.push(script);
    }

    // --- Native banner ---
    if (nativeHolder && !nativeHolder.dataset.loaded) {
      nativeHolder.dataset.loaded = "1";
      const script = document.createElement("script");
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = NATIVE_SCRIPT_SRC;
      nativeHolder.appendChild(script);
      injected.push(script);
    }

    return () => {
      for (const node of injected) node.remove();
      if (bannerHolder) {
        delete bannerHolder.dataset.loaded;
        bannerHolder
          .querySelectorAll("iframe")
          .forEach((frame) => frame.remove());
      }
      if (nativeHolder) delete nativeHolder.dataset.loaded;
    };
  }, []);

  return (
    <div className={`mx-auto w-full max-w-3xl px-4 py-6 ${className}`}>
      <p className="mb-2 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {/* Banner unit (728x90 / 320x50) */}
      <div
        ref={bannerHolderRef}
        className="flex min-h-[50px] items-start justify-center md:min-h-[90px]"
      />
      {/* Native banner unit */}
      <div ref={nativeHolderRef} className="mt-4">
        <div id={NATIVE_CONTAINER_ID} />
      </div>
    </div>
  );
}
