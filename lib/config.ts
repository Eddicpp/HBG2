export const DEMO_ANCHOR = "#demo";

function externalUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password ? url : null;
  } catch {
    return null;
  }
}

export const TRIAL_URL = externalUrl(process.env.NEXT_PUBLIC_TRIAL_URL)?.href ?? DEMO_ANCHOR;
export const DEMO_URL = externalUrl(process.env.NEXT_PUBLIC_DEMO_URL)?.href ?? DEMO_ANCHOR;
export const LOGIN_URL = externalUrl(process.env.NEXT_PUBLIC_LOGIN_URL)?.href ?? DEMO_ANCHOR;
export const PRIVACY_URL = externalUrl(process.env.NEXT_PUBLIC_PRIVACY_URL)?.href;
export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export function withLandingUtm(href: string, section: string) {
  const url = externalUrl(href);
  if (!url) return href;
  url.searchParams.set("utm_source", "landing");
  url.searchParams.set("utm_content", section);
  return url.href;
}
