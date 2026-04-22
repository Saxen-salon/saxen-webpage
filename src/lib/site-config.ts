/**
 * Centralised site configuration.
 *
 * All domain / URL references should import from here so the value is
 * defined once and protocol-handling is consistent.
 *
 * When filling in SITE_DOMAIN, use the bare domain (e.g. "www.example.com").
 * If a protocol is accidentally included it will be stripped automatically.
 */

// TODO: Replace with your bare domain (no protocol), e.g. "www.example.com"
const RAW_DOMAIN = "{{DOMAIN}}";

/** Bare domain with any leading protocol stripped. */
export const SITE_DOMAIN = RAW_DOMAIN.replace(/^https?:\/\//, "").replace(
  /\/$/,
  "",
);

/** Full site URL with protocol — use this wherever a complete URL is needed. */
export const SITE_URL = `https://${SITE_DOMAIN}`;
