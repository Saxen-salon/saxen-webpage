import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cookiePolitik.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/cookie-politik",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/cookie-politik`,
      type: "website",
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CookiePolitikPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cookie-heading"
        style={{
          backgroundColor: "var(--color-background)",
          paddingTop: "clamp(4rem, 8vw, 7rem)",
          paddingBottom: "clamp(3rem, 5vw, 5rem)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-padding)",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              color: "var(--color-muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "var(--space-6)",
            }}
          >
            Juridisk information
          </p>

          <h1
            id="cookie-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--text-4xl), 5vw, var(--text-6xl))",
              fontWeight: 400,
              lineHeight: "var(--leading-display)",
              color: "var(--color-foreground)",
              letterSpacing: "-0.02em",
              marginBottom: "var(--space-6)",
              maxWidth: "720px",
            }}
          >
            Cookiepolitik for Saxen Frisør
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              color: "var(--color-muted)",
              marginBottom: "var(--space-8)",
            }}
          >
            Senest opdateret: 24. april 2026
          </p>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-lg)",
              fontWeight: 400,
              color: "var(--color-ink-600)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "660px",
            }}
          >
            Saxen Frisør, Jernbanegade 1, 9800 Hjørring, anvender cookies og
            lignende teknologier på dette website. Denne side forklarer, hvad vi
            indsamler, hvorfor, og hvordan du kan styre dine præferencer.
          </p>
        </div>
      </section>

      {/* ── DOCUMENT BODY ────────────────────────────────────────────────────── */}
      <section
        aria-label="Cookiepolitik indhold"
        style={{
          backgroundColor: "var(--color-background)",
          paddingTop: "var(--section-gap-sm)",
          paddingBottom: "var(--section-gap-sm)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-padding)",
          }}
        >
          <div
            style={{ maxWidth: "760px" }}
            className="legal-content"
          >

            {/* ── Section: Hvad er cookies? ─── */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "var(--space-10)",
                marginBottom: "var(--space-12)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-2xl), 2.5vw, var(--text-3xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-6)",
                }}
              >
                Hvad er cookies?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                Cookies er små datafiler, der gemmes på din enhed, når du
                besøger et website. Vi bruger udelukkende{" "}
                <strong style={{ color: "var(--color-foreground)", fontWeight: 500 }}>
                  localStorage (lokal browserlagring)
                </strong>{" "}
                — ikke traditionelle HTTP-cookies — til at gemme dine
                cookiepræferencer.
              </p>
            </div>

            {/* ── Section: Hvilke data gemmer vi? ─── */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "var(--space-10)",
                marginBottom: "var(--space-12)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-2xl), 2.5vw, var(--text-3xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-6)",
                }}
              >
                Hvilke data gemmer vi?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-6)",
                }}
              >
                Vi gemmer ét element i din browsers localStorage:
              </p>

              {/* Data detail rows */}
              {[
                {
                  label: "Nøgle",
                  value: '"cookie-consent"',
                },
                {
                  label: "Indhold",
                  value:
                    "Dine cookiepræferencer (nødvendige, analyse, markedsføring) i JSON-format",
                },
                {
                  label: "Formål",
                  value:
                    "Huske dit valg, så du ikke ser banneret ved hvert besøg",
                },
                {
                  label: "Opbevaring",
                  value:
                    "Forbliver i din browser, indtil du rydder din browserhistorik eller trækker dit samtykke tilbage",
                },
              ].map(({ label, value }, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "var(--space-6)",
                    padding: "var(--space-4) 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--color-muted)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      minWidth: "7rem",
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 400,
                      color: "var(--color-foreground)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Section: Kategorier ─── */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "var(--space-10)",
                marginBottom: "var(--space-12)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-2xl), 2.5vw, var(--text-3xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-10)",
                }}
              >
                Kategorier
              </h2>

              {/* Category: Nødvendige */}
              <div style={{ marginBottom: "var(--space-10)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 400,
                    lineHeight: "var(--leading-snug)",
                    color: "var(--color-foreground)",
                    letterSpacing: "-0.01em",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Nødvendige{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 400,
                      color: "var(--color-muted)",
                      letterSpacing: "0",
                    }}
                  >
                    (altid aktive)
                  </span>
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-ink-600)",
                    lineHeight: "var(--leading-relaxed)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Disse er påkrævet for, at hjemmesiden fungerer korrekt. Du
                  kan ikke deaktivere dem.
                </p>
                <div
                  style={{
                    borderLeft: "2px solid var(--color-border)",
                    paddingLeft: "var(--space-4)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 400,
                      color: "var(--color-muted)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    Gemmer dine cookiepræferencer lokalt i din browser
                  </p>
                </div>
              </div>

              {/* Category: Analyse */}
              <div
                style={{
                  borderTop: "1px solid var(--color-border-subtle)",
                  paddingTop: "var(--space-8)",
                  marginBottom: "var(--space-10)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 400,
                    lineHeight: "var(--leading-snug)",
                    color: "var(--color-foreground)",
                    letterSpacing: "-0.01em",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Analyse{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 400,
                      color: "var(--color-muted)",
                      letterSpacing: "0",
                    }}
                  >
                    (kræver samtykke)
                  </span>
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-ink-600)",
                    lineHeight: "var(--leading-relaxed)",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  Vi bruger Vercel Analytics til at forstå, hvordan besøgende
                  bruger vores hjemmeside.
                </p>

                {[
                  {
                    label: "Udbyder",
                    value:
                      "Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA",
                  },
                  {
                    label: "Data indsamlet",
                    value:
                      "Anonymiserede sidevisninger — ingen IP-adresser gemmes",
                  },
                  {
                    label: "Formål",
                    value:
                      "Forståelse af brugeradfærd for at forbedre hjemmesiden",
                  },
                  {
                    label: "Tredjepart",
                    value:
                      "Vercel behandler data i overensstemmelse med EU-GDPR.",
                  },
                ].map(({ label, value }, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "var(--space-6)",
                      padding: "var(--space-3) 0",
                      borderBottom: "1px solid var(--color-border-subtle)",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        color: "var(--color-muted)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        minWidth: "7rem",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-base)",
                        fontWeight: 400,
                        color: "var(--color-foreground)",
                        lineHeight: "var(--leading-normal)",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    lineHeight: "var(--leading-relaxed)",
                    marginTop: "var(--space-4)",
                  }}
                >
                  Se{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--color-foreground)",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    Vercel&apos;s privatlivspolitik
                  </a>{" "}
                  for detaljer.
                </p>
              </div>

              {/* Category: Markedsføring */}
              <div
                style={{
                  borderTop: "1px solid var(--color-border-subtle)",
                  paddingTop: "var(--space-8)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 400,
                    lineHeight: "var(--leading-snug)",
                    color: "var(--color-foreground)",
                    letterSpacing: "-0.01em",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Markedsføring{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 400,
                      color: "var(--color-muted)",
                      letterSpacing: "0",
                    }}
                  >
                    (kræver samtykke)
                  </span>
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-ink-600)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  Vi bruger i øjeblikket ingen markedsføringscookies eller
                  trackingpixels. Denne kategori er reserveret til fremtidig
                  brug.
                </p>
              </div>
            </div>

            {/* ── Section: Administrer præferencer ─── */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "var(--space-10)",
                marginBottom: "var(--space-12)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-2xl), 2.5vw, var(--text-3xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-6)",
                }}
              >
                Sådan administrerer du dine præferencer
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-6)",
                }}
              >
                Du kan til enhver tid ændre eller trække dit samtykke tilbage:
              </p>

              {[
                'Klik på "Tilpas" i cookiebanneret ved genbesøg (ryd localStorage for at se banneret igen)',
                'Ryd din browsers "Website data" / "Lokalt lager" i browserindstillingerne',
                "Deaktiver JavaScript i din browser (dog vil dette påvirke hjemmesidens funktionalitet)",
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "var(--space-4)",
                    padding: "var(--space-4) 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--color-muted)",
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}.
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 400,
                      color: "var(--color-ink-600)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Section: Kontakt ─── */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "var(--space-10)",
                marginBottom: "var(--space-12)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-2xl), 2.5vw, var(--text-3xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-6)",
                }}
              >
                Kontakt
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-4)",
                }}
              >
                Spørgsmål om vores cookiepolitik? Kontakt os:
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-foreground)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-2)",
                }}
              >
                susanne@karlborg.dk
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                Saxen Frisør, Jernbanegade 1, 9800 Hjørring
              </p>
            </div>

            {/* ── Cross-link to Privatlivspolitik ─── */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "var(--space-8)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                }}
              >
                Se også:
              </span>
              <Link
                href="/privatlivspolitik"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: "var(--color-foreground)",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                  letterSpacing: "0.02em",
                }}
              >
                Privatlivspolitik (GDPR)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
