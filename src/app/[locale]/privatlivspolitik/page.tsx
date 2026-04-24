import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privatlivspolitik.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/privatlivspolitik",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/privatlivspolitik`,
      type: "website",
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function PrivatlivspolitikPage({
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
        aria-labelledby="privacy-heading"
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
            Juridisk information · GDPR
          </p>

          <h1
            id="privacy-heading"
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
            Privatlivspolitik for Saxen Frisør
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
        </div>
      </section>

      {/* ── DOCUMENT BODY ────────────────────────────────────────────────────── */}
      <section
        aria-label="Privatlivspolitik indhold"
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
          <div style={{ maxWidth: "760px" }}>

            {/* ── Section: Dataansvarlig ─── */}
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
                Dataansvarlig
              </h2>

              {[
                { label: "Navn", value: "Saxen Frisør" },
                { label: "Adresse", value: "Jernbanegade 1, 9800 Hjørring" },
                { label: "Telefon", value: "98 92 00 99" },
                {
                  label: "Email",
                  value:
                    "susanne@karlborg.dk",
                },
                { label: "CVR", value: "[NEEDS: CVR-nummer]" },
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
                      minWidth: "5rem",
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

            {/* ── Section: Hvilke personoplysninger? ─── */}
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
                Hvilke personoplysninger behandler vi?
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
                Vi behandler kun oplysninger, du aktivt afgiver:
              </p>

              {[
                {
                  title: "Kontakt via telefon eller email",
                  body: "Navn og kontaktoplysninger i forbindelse med tidsbestilling",
                },
                {
                  title: "Online booking",
                  body: "Data afgivet til Admind A/S (saxenhjoerring.bestilling.nu) via deres bookingplatform. Se Admind's privatlivspolitik for detaljer.",
                  link: { href: "https://admind.dk", label: "Admind's privatlivspolitik" },
                },
                {
                  title: "Analyse (med samtykke)",
                  body: "Anonymiserede sidevisninger via Vercel Analytics — ingen personoplysninger",
                },
              ].map(({ title, body, link }, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "var(--space-5) 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      color: "var(--color-foreground)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 400,
                      color: "var(--color-ink-600)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {link ? (
                      <>
                        Data afgivet til Admind A/S (saxenhjoerring.bestilling.nu) via
                        deres bookingplatform. Se{" "}
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--color-foreground)",
                            textDecoration: "underline",
                            textUnderlineOffset: "2px",
                          }}
                        >
                          {link.label}
                        </a>{" "}
                        for detaljer.
                      </>
                    ) : (
                      body
                    )}
                  </p>
                </div>
              ))}

              <div
                style={{
                  marginTop: "var(--space-6)",
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
                  Vi indsamler{" "}
                  <strong style={{ fontWeight: 500 }}>ikke</strong>:
                  Betalingsoplysninger, CPR-numre, IP-adresser, eller anden
                  følsom information via vores hjemmeside.
                </p>
              </div>
            </div>

            {/* ── Section: Formål og retsgrundlag (table as hairline rows) ─── */}
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
                  marginBottom: "var(--space-8)",
                }}
              >
                Formål med behandlingen
              </h2>

              {/* Table header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr 3fr",
                  gap: "var(--space-4)",
                  padding: "var(--space-3) 0",
                  borderBottom: "1px solid var(--color-border)",
                }}
                className="gdpr-table-header"
              >
                {["Aktivitet", "Formål", "Retsgrundlag"].map((h) => (
                  <span
                    key={h}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 500,
                      color: "var(--color-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Table data rows */}
              {[
                {
                  activity: "Telefon og email kommunikation",
                  purpose: "Tidsbestilling og kundeservice",
                  basis: "Legitim interesse (GDPR art. 6, stk. 1, litra f)",
                },
                {
                  activity: "Online booking via Admind",
                  purpose: "Håndtering af tidsbestillinger",
                  basis: "Opfyldelse af kontrakt (art. 6, stk. 1, litra b)",
                },
                {
                  activity: "Vercel Analytics (anonymiseret)",
                  purpose: "Forbedring af hjemmesiden",
                  basis: "Samtykke (art. 6, stk. 1, litra a)",
                },
              ].map(({ activity, purpose, basis }, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 3fr",
                    gap: "var(--space-4)",
                    padding: "var(--space-5) 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                  className="gdpr-table-row"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      color: "var(--color-foreground)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    {activity}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 400,
                      color: "var(--color-ink-600)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    {purpose}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 400,
                      color: "var(--color-muted)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {basis}
                  </span>
                </div>
              ))}

              {/* Mobile: collapse to stacked layout */}
              <style>{`
                @media (max-width: 599px) {
                  .gdpr-table-header {
                    display: none !important;
                  }
                  .gdpr-table-row {
                    grid-template-columns: 1fr !important;
                    gap: var(--space-2) !important;
                    padding: var(--space-5) 0 !important;
                  }
                }
              `}</style>
            </div>

            {/* ── Section: Opbevaring ─── */}
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
                Opbevaring
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
                Vi opbevarer oplysninger så længe det er nødvendigt for
                formålet, og sletter dem derefter. Bookingdata opbevares i
                Admind-platformen; kontakt Admind vedrørende opbevaring af
                bookingdata.
              </p>
            </div>

            {/* ── Section: Dine rettigheder ─── */}
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
                Dine rettigheder
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
                Du har følgende rettigheder under GDPR:
              </p>

              {[
                {
                  right: "Indsigt",
                  desc: "Du har ret til at se, hvilke oplysninger vi behandler om dig",
                },
                {
                  right: "Berigtigelse",
                  desc: "Du kan bede os rette forkerte oplysninger",
                },
                {
                  right: "Sletning",
                  desc: "Du kan bede os slette dine oplysninger",
                },
                {
                  right: "Begrænsning",
                  desc: "Du kan bede os begrænse behandlingen af dine oplysninger",
                },
                {
                  right: "Dataportabilitet",
                  desc: "Du har ret til at modtage dine oplysninger i et struktureret format",
                },
                {
                  right: "Indsigelse",
                  desc: "Du kan gøre indsigelse mod behandling baseret på legitim interesse",
                },
                {
                  right: "Tilbagetrækning af samtykke",
                  desc: "Du kan til enhver tid trække dit analyticssamtykke tilbage via cookiebanneret",
                },
              ].map(({ right, desc }, idx) => (
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
                      color: "var(--color-foreground)",
                      minWidth: "10rem",
                      flexShrink: 0,
                    }}
                  >
                    {right}
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
                    {desc}
                  </span>
                </div>
              ))}

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  lineHeight: "var(--leading-relaxed)",
                  marginTop: "var(--space-6)",
                }}
              >
                For at udøve dine rettigheder, kontakt os på adressen ovenfor.
              </p>
            </div>

            {/* ── Section: Klage ─── */}
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
                Klage
              </h2>
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
                Du kan klage til Datatilsynet:
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
                Datatilsynet, Carl Jacobsens Vej 35, 2500 Valby
              </p>
              <a
                href="https://www.datatilsynet.dk"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-foreground)",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                www.datatilsynet.dk
              </a>
            </div>

            {/* ── Section: Tredjeparter ─── */}
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
                  marginBottom: "var(--space-8)",
                }}
              >
                Tredjeparter
              </h2>

              {[
                {
                  name: "Vercel Inc.",
                  desc: "Hosting og anonymiseret analytics. Vercel er EU-GDPR compliant.",
                  link: {
                    href: "https://vercel.com/legal/privacy-policy",
                    label: "Vercel Privacy Policy",
                  },
                },
                {
                  name: "Admind A/S",
                  desc: "Online bookingplatform. Data afgivet ved booking behandles af Admind.",
                  link: {
                    href: "https://admind.dk",
                    label: "Admind's privatlivspolitik",
                  },
                },
              ].map(({ name, desc, link }, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "var(--space-5) 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      color: "var(--color-foreground)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 400,
                      color: "var(--color-ink-600)",
                      lineHeight: "var(--leading-relaxed)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {desc}
                  </p>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 400,
                      color: "var(--color-foreground)",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>

            {/* ── Section: Ændringer ─── */}
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
                Ændringer til denne politik
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
                Vi opdaterer denne side, når vores databehandling ændrer sig.
                Seneste opdatering: 24. april 2026.
              </p>
            </div>

            {/* ── Cross-link to Cookiepolitik ─── */}
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
                href="/cookie-politik"
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
                Cookiepolitik
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
