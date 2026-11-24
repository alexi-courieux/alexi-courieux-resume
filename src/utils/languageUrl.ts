/** Builds the URL of the current page in another language: /<lang>/ plus the hash (and the search, minus legacy language parameters). */
export const buildLanguageUrl = (language: string, keepSearch = false): string => {
  const params = new URLSearchParams(keepSearch ? globalThis.location.search : "");
  for (const name of ["lang", "language", "lng"]) params.delete(name);
  const search = params.size > 0 ? `?${params}` : "";
  return `/${language}/${search}${globalThis.location.hash}`;
};
