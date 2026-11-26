/**
 * Makes an asset path from the API (e.g. "images/logo.svg") root-relative ("/images/logo.svg"),
 * so it does not resolve under the language segment of the page URL (/en/, /fr/).
 * Absolute URLs (http:, https:, data:, //host) and paths already starting with "/" are returned unchanged.
 */
export function assetUrl(uri: string): string;
export function assetUrl(uri: string | null | undefined): string | undefined;
export function assetUrl(uri: string | null | undefined): string | undefined {
  if (!uri) return undefined;
  if (uri.startsWith("/") || /^[a-z][a-z\d+.-]*:/i.test(uri)) return uri;
  return `/${uri.replace(/^\.\//, "")}`;
}
