interface AdBannerProps {
  className?: string;
  label?: string;
}

/**
 * Ad slot placeholder.
 *
 * Third-party ad scripts are intentionally disabled while the site is under
 * review for Google AdSense approval. A competing ad network script here
 * (previously profitableratecpm) risks policy / code-interference flags, so
 * this component renders nothing until AdSense is approved. After approval,
 * replace the `return null` below with the AdSense ad unit markup.
 */
export function AdBanner(_props: AdBannerProps) {
  return null;
}
