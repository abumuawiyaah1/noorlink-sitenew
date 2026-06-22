/** Remove embedded script tags from legacy HTML blobs. */
export function stripScriptTags(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "");
}

/** Remove inline event handlers so legacy HTML can render without global JS. */
export function stripLegacyEventHandlers(html: string): string {
  return html
    .replace(/\s+on[a-z]+="[^"]*"/gi, "")
    .replace(/\s+on[a-z]+='[^']*'/gi, "");
}

/** Drop embedded header/footer blocks when replaced by React layout components. */
export function stripLegacyHeader(html: string): string {
  return html.replace(/<header[\s\S]*?<\/header>/i, "");
}

export function stripLegacyFooter(html: string): string {
  return html.replace(/<footer[\s\S]*?<\/footer>/i, "");
}

/** Remove elements by id (e.g. React mount points replaced by components). */
export function stripElementsById(html: string, ids: string[]): string {
  let result = html;
  for (const id of ids) {
    result = result.replace(
      new RegExp(`<div\\s+id="${id}"[^>]*>\\s*<\\/div>`, "gi"),
      "",
    );
  }
  return result;
}

export function stripLegacyTicker(html: string): string {
  return html.replace(/<!-- GLOBAL PULSE TICKER -->[\s\S]*?<\/div>\s*<\/div>/i, "");
}

export function stripLegacyWhatsAppFab(html: string): string {
  return html
    .replace(/<a[^>]*id="wa-btn"[^>]*>[\s\S]*?<\/a>/gi, "")
    .replace(/<a[^>]*class="[^"]*whatsapp-float[^"]*"[^>]*>[\s\S]*?<\/a>/gi, "")
    .replace(/<a[^>]*class="[^"]*wa-float[^"]*"[^>]*>[\s\S]*?<\/a>/gi, "");
}

export function prepareLegacyBodyHtml(html: string, options?: { stripHeader?: boolean; stripFooter?: boolean; stripIds?: string[]; stripTicker?: boolean; stripWhatsApp?: boolean }): string {
  let prepared = stripScriptTags(stripLegacyEventHandlers(html));
  if (options?.stripWhatsApp) prepared = stripLegacyWhatsAppFab(prepared);
  if (options?.stripTicker) prepared = stripLegacyTicker(prepared);
  if (options?.stripIds?.length) prepared = stripElementsById(prepared, options.stripIds);
  if (options?.stripHeader) prepared = stripLegacyHeader(prepared);
  if (options?.stripFooter) prepared = stripLegacyFooter(prepared);
  return prepared;
}
