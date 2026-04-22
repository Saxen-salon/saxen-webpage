/**
 * Placeholder content utilities.
 *
 * Convention: placeholders use the format `[NEEDS: Brief description]`
 * to mark content that must be supplied by the client.
 */

const PLACEHOLDER_REGEX = /\[NEEDS:\s*(.+?)\]/;
const PLACEHOLDER_REGEX_GLOBAL = /\[NEEDS:\s*(.+?)\]/g;

/** Returns `true` if the text contains one or more `[NEEDS: ...]` markers. */
export function isPlaceholder(text: string): boolean {
  return PLACEHOLDER_REGEX.test(text);
}

/** Extracts the description from the first `[NEEDS: ...]` marker, or `null`. */
export function getPlaceholderDescription(text: string): string | null {
  const match = text.match(PLACEHOLDER_REGEX);
  return match ? match[1].trim() : null;
}

/** Returns all `[NEEDS: ...]` descriptions found in the text. */
export function getAllPlaceholderDescriptions(text: string): string[] {
  const matches = Array.from(text.matchAll(PLACEHOLDER_REGEX_GLOBAL));
  return matches.map((m) => m[1].trim());
}
