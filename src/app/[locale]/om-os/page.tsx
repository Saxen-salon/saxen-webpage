import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("omOs.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/om-os",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/om-os`,
      type: "website",
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "HairSalon"],
  name: "Saxen Frisør",
  url: `${SITE_URL}/om-os`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jernbanegade 1",
    postalCode: "9800",
    addressLocality: "Hjørring",
    addressCountry: "DK",
  },
  telephone: "+4598920099",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 6,
  },
};

// ─── Values data ──────────────────────────────────────────────────────────────

const values = [
  {
    key: "priser",
    concept: "Åbne priser",
    body: "Vi har altid offentliggjort alle vores priser. Det er den mest ærlige måde at drive frisørsalon på — ingen overraskelser, ingen ubehagelige regninger.",
  },
  {
    key: "hold",
    concept: "Et stabilt hold",
    body: "Vi er seks frisører: Susanne, Anita, Heidi, Tina, Merete og Camilla. Mange af vores kunder har den samme frisør år efter år — det er ikke tilfældigt.",
  },
  {
    key: "personlig",
    concept: "Dine personlige ønsker",
    body: "Vi sætter fokus på dig som person. Inden vi begynder, lytter vi til dine ønsker og rådgiver om, hvad der passer til dit hår — og din hverdag.",
  },
] as const;

// ─── Salon facts ──────────────────────────────────────────────────────────────

const salonFacts = [
  { stat: "6 frisører", label: "på holdet" },
  { stat: "Jernbanegade 1", label: "Hjørring" },
  { stat: "Man–Fre 09–17:30", label: "Lørdag 08–13:00" },
  { stat: "Wella", label: "[NEEDS: øvrige produktmærker brugt i salonen]" },
] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function OmOsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("omOs");

  return (
    <>
      {/* JSON-LD Organization + HairSalon */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ── 1. HERO / INTRO ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="om-os-heading"
        style={{
          backgroundColor: "var(--color-background)",
          paddingTop: "clamp(4rem, 8vw, 7rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
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
            {t("eyebrow")}
          </p>

          {/* Asymmetric grid: wide headline left / narrower lead right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "start",
            }}
            className="om-os-intro-grid"
          >
            {/* Left — headline */}
            <div>
              <h1
                id="om-os-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-5xl), 6vw, var(--text-7xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-display)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-8)",
                }}
              >
                {t("headline")}
              </h1>
            </div>

            {/* Right — lead paragraph */}
            <div>
              {/* Hairline accent above lead */}
              <div
                style={{
                  width: "2.5rem",
                  height: "1px",
                  backgroundColor: "var(--color-accent-500)",
                  marginBottom: "var(--space-6)",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(var(--text-lg), 2vw, var(--text-xl))",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  maxWidth: "520px",
                }}
              >
                {t("lead")}
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .om-os-intro-grid {
              grid-template-columns: 55fr 45fr !important;
              gap: var(--space-20) !important;
              align-items: end !important;
            }
          }
        `}</style>
      </section>

      {/* ── 2. FOUNDING STORY ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="story-heading"
        style={{
          backgroundColor: "var(--color-background)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
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
          {/* Asymmetric layout: large pull-quote left / story text right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-16)",
              alignItems: "start",
            }}
            className="story-grid"
          >
            {/* Left — editorial pull-quote column */}
            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "var(--space-10)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-8)",
                }}
              >
                Historien
              </p>

              {/* Pull-quote with founding year placeholder */}
              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-3xl), 3.5vw, var(--text-5xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  marginBottom: "var(--space-8)",
                }}
              >
                &ldquo;Saxen åbnede dørene i{" "}
                <span
                  style={{ color: "var(--color-muted)", fontStyle: "italic" }}
                >
                  [NEEDS: stiftelsesår]
                </span>{" "}
                på Jernbanegade i Hjørring.&rdquo;
              </blockquote>

              {/* Accent hairline under quote */}
              <div
                style={{
                  width: "3rem",
                  height: "1px",
                  backgroundColor: "var(--color-accent-500)",
                }}
              />
            </div>

            {/* Right — story body text */}
            <div
              style={{
                paddingTop: "var(--space-10)",
                borderTop: "1px solid var(--color-border-subtle)",
              }}
              className="story-body-col"
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-8)",
                }}
              >
                Saxen er en lokal frisørsalon i hjertet af Hjørring — på
                Jernbanegade, tæt på byens midte. Vi er et hold på seks, og vi
                kender de fleste af vores kunder ved navn. Hos os er du ikke en
                nummereret aftale — du er det menneske, vi har glædet os til at
                se.
              </p>

              {/* Founding story placeholder */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  lineHeight: "var(--leading-relaxed)",
                  borderLeft: "2px solid var(--color-border)",
                  paddingLeft: "var(--space-5)",
                  fontStyle: "italic",
                }}
              >
                [NEEDS: 2–3 sætninger om salonens opstartshistorie — hvad drev
                beslutningen om at åbne? Hvad er særligt ved at drive
                frisørsalon i Hjørring?]
              </p>

              {/* Owner note placeholder */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  lineHeight: "var(--leading-normal)",
                  marginTop: "var(--space-8)",
                  paddingTop: "var(--space-8)",
                  borderTop: "1px solid var(--color-border-subtle)",
                }}
              >
                [NEEDS: Bekræftelse på om Susanne er ejer/daglig leder — til
                brug i teksten nedenfor]
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .story-grid {
              grid-template-columns: 45fr 55fr !important;
              gap: var(--space-20) !important;
            }
            .story-body-col {
              border-top: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── 3. VALUES — 3 facts, editorial pull-out layout ───────────────────── */}
      <section
        aria-labelledby="values-heading"
        style={{
          backgroundColor: "var(--color-surface-alt)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
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
          {/* Section header */}
          <p
            id="values-heading"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              color: "var(--color-muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "var(--space-16)",
            }}
          >
            Sådan driver vi salon
          </p>

          {/* Values — stacked editorial rows, not cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {values.map((value, idx) => (
              <div
                key={value.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "var(--space-8)",
                  paddingTop: "var(--space-12)",
                  paddingBottom: "var(--space-12)",
                  borderTop: idx === 0
                    ? "1px solid var(--color-border)"
                    : "1px solid var(--color-border-subtle)",
                  alignItems: "baseline",
                }}
                className="value-row"
              >
                {/* Left — large concept label */}
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(var(--text-3xl), 3.5vw, var(--text-5xl))",
                      fontWeight: 400,
                      lineHeight: "var(--leading-tight)",
                      color: "var(--color-foreground)",
                      letterSpacing: "-0.02em",
                      display: "block",
                    }}
                  >
                    {value.concept}
                  </span>
                </div>

                {/* Right — explanatory paragraph */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 400,
                      color: "var(--color-ink-600)",
                      lineHeight: "var(--leading-relaxed)",
                      maxWidth: "540px",
                    }}
                  >
                    {value.body}
                  </p>
                </div>
              </div>
            ))}

            {/* Closing hairline */}
            <div style={{ borderTop: "1px solid var(--color-border-subtle)" }} />
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .value-row {
              grid-template-columns: 40fr 60fr !important;
              gap: var(--space-16) !important;
              align-items: baseline !important;
            }
          }
        `}</style>
      </section>

      {/* ── 4. SALON FACTS STRIP ─────────────────────────────────────────────── */}
      <section
        aria-label="Salonens fakta"
        style={{
          backgroundColor: "var(--color-background)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
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
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              color: "var(--color-muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "var(--space-12)",
            }}
          >
            Kort sagt
          </p>

          {/* Facts — hairline-separated rows, stat left / label right */}
          <dl style={{ borderTop: "1px solid var(--color-border)" }}>
            {salonFacts.map((fact) => (
              <div
                key={fact.stat}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "var(--space-2)",
                  padding: "var(--space-6) 0",
                  borderBottom: "1px solid var(--color-border-subtle)",
                }}
                className="fact-row"
              >
                <dt
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(var(--text-xl), 2vw, var(--text-2xl))",
                    fontWeight: 400,
                    color: "var(--color-foreground)",
                    letterSpacing: "-0.01em",
                    lineHeight: "var(--leading-tight)",
                  }}
                >
                  {fact.stat}
                </dt>
                <dd
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    lineHeight: "var(--leading-normal)",
                    margin: 0,
                  }}
                >
                  {fact.label}
                </dd>
              </div>
            ))}

            {/* Certifications placeholder row */}
            <div
              style={{
                padding: "var(--space-6) 0",
                borderBottom: "1px solid var(--color-border-subtle)",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  lineHeight: "var(--leading-normal)",
                  fontStyle: "italic",
                }}
              >
                [NEEDS: Faglig certificering eller brancheforening (f.eks.
                Frisørernes Arbejdsgiverforening)?]
              </dt>
            </div>
          </dl>
        </div>

        <style>{`
          @media (min-width: 600px) {
            .fact-row {
              grid-template-columns: 1fr 2fr !important;
              gap: var(--space-8) !important;
              align-items: baseline !important;
            }
          }
        `}</style>
      </section>

      {/* ── 5. CLOSING / CTA ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-heading"
        style={{
          backgroundColor: "var(--color-surface-alt)",
          paddingTop: "var(--section-gap)",
          paddingBottom: "var(--section-gap)",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-padding)",
          }}
        >
          {/* Asymmetric: large heading left, CTAs right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "end",
            }}
            className="cta-grid"
          >
            {/* Left — heading + address */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-5)",
                }}
              >
                Find os
              </p>

              <h2
                id="cta-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-4xl), 4vw, var(--text-6xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-tight)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-8)",
                }}
              >
                Kom og besøg os
              </h2>

              {/* Address + hours */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-foreground)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  Jernbanegade 1, 9800 Hjørring
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  Man–Fre 09:00–17:30 · Lørdag 08:00–13:00
                </p>
                <a
                  href="tel:+4598920099"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 500,
                    color: "var(--color-foreground)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color var(--duration-fast) var(--easing-out)",
                    display: "inline-block",
                    marginTop: "var(--space-2)",
                  }}
                  className="cta-phone"
                >
                  98 92 00 99
                </a>
              </div>
            </div>

            {/* Right — CTAs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                alignItems: "flex-start",
              }}
            >
              {/* Primary — book online */}
              <Link
                href="/kontakt"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  backgroundColor: "var(--color-accent-600)",
                  color: "var(--color-ink-50)",
                  textDecoration: "none",
                  padding: "0.75rem 1.75rem",
                  borderRadius: 0,
                  letterSpacing: "0.04em",
                  display: "inline-block",
                  transition: "background-color var(--duration-fast) var(--easing-out)",
                }}
                className="cta-primary"
              >
                Book tid online
              </Link>

              {/* Secondary — see prices */}
              <Link
                href="/ydelser"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  border: "1px solid var(--color-foreground)",
                  color: "var(--color-foreground)",
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  padding: "0.75rem 1.75rem",
                  borderRadius: 0,
                  letterSpacing: "0.04em",
                  display: "inline-block",
                  transition: "background-color var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
                }}
                className="cta-secondary"
              >
                Se vores priser
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .cta-grid {
              grid-template-columns: 55fr 45fr !important;
              gap: var(--space-20) !important;
            }
          }
          .cta-primary:hover {
            background-color: var(--color-accent-500) !important;
          }
          .cta-secondary:hover {
            background-color: var(--color-foreground) !important;
            color: var(--color-ink-50) !important;
          }
          .cta-phone:hover {
            color: var(--color-accent-500) !important;
          }
        `}</style>
      </section>
    </>
  );
}
