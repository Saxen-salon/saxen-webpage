import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: SITE_URL,
      type: "website",
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Saxen Frisør",
      item: SITE_URL,
    },
  ],
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <>
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section
        aria-label="Velkomst"
        style={{
          backgroundColor: "var(--color-background)",
          paddingTop: "clamp(5rem, 10vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 9rem)",
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
          {/* Location badge */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "var(--space-8)",
            }}
          >
            {t("hero.location")}
          </p>

          {/* Headline — full-width, no right panel */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--text-7xl), 8vw, var(--text-8xl))",
              fontWeight: 400,
              lineHeight: "var(--leading-display)",
              color: "var(--color-foreground)",
              letterSpacing: "-0.02em",
              marginBottom: "var(--space-8)",
              maxWidth: "16ch",
            }}
          >
            {t("hero.headline")}
          </h1>

          {/* Sub-headline */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(var(--text-lg), 2vw, var(--text-xl))",
              fontWeight: 400,
              color: "var(--color-muted)",
              lineHeight: "var(--leading-normal)",
              marginBottom: "var(--space-12)",
              maxWidth: "44ch",
            }}
          >
            {t("hero.subHeadline")}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              alignItems: "center",
            }}
          >
            <Link
              href="/ydelser"
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
              {t("hero.ctaPrimary")}
            </Link>

            <Link
              href="/kontakt"
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
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        <style>{`
          .cta-primary:hover {
            background-color: var(--color-accent-500) !important;
          }
          .cta-secondary:hover {
            background-color: var(--color-foreground) !important;
            color: var(--color-ink-50) !important;
          }
        `}</style>
      </section>

      {/* ── 2. PRICE TRANSPARENCY ────────────────────────────────────────────── */}
      <section
        aria-labelledby="prices-heading"
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "start",
            }}
            className="prices-grid"
          >
            {/* Left — large display number */}
            <div style={{ position: "relative" }}>
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
                {t("prices.eyebrow")}
              </p>

              {/* "35+" service count — editorial display */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-6)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(5rem, 12vw, 11rem)",
                    fontWeight: 400,
                    lineHeight: "var(--leading-display)",
                    color: "var(--color-foreground)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {t("prices.serviceCount")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-lg)",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    maxWidth: "12rem",
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  {t("prices.serviceCountLabel")}
                </span>
              </div>

              {/* Hairline under the number */}
              <div
                style={{
                  width: "3rem",
                  height: "1px",
                  backgroundColor: "var(--color-accent-500)",
                  marginBottom: "var(--space-6)",
                }}
              />
            </div>

            {/* Right — copy + CTA */}
            <div>
              <h2
                id="prices-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-4xl), 4vw, var(--text-5xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-tight)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-6)",
                }}
              >
                {t("prices.headline")}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  marginBottom: "var(--space-10)",
                  maxWidth: "480px",
                }}
              >
                {t("prices.body")}
              </p>

              <Link
                href="/ydelser"
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
                {t("prices.cta")}
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .prices-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: var(--space-20) !important;
              align-items: center !important;
            }
          }
        `}</style>
      </section>

      {/* ── 3. LOCATION / SALON INFO STRIP ───────────────────────────────────── */}
      <section
        aria-labelledby="location-heading"
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
              marginBottom: "var(--space-10)",
            }}
          >
            {t("location.eyebrow")}
          </p>

          {/* Horizontal editorial split — address/hours left | phone/booking right */}
          {/* 1px hairline divider between halves on desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
            }}
            className="location-grid"
          >
            {/* Left — address + hours */}
            <div>
              <h2
                id="location-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-3xl), 3vw, var(--text-4xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("location.address")}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-3xl), 3vw, var(--text-4xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-muted)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-10)",
                }}
              >
                {t("location.city")}
              </p>

              {/* Opening hours — hairline-separated rows */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("location.hoursTitle")}
              </p>

              <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
                {(
                  [
                    { day: t("location.weekdays"), hours: t("location.weekdayHours") },
                    { day: t("location.saturday"), hours: t("location.saturdayHours") },
                    { day: t("location.sunday"), hours: t("location.sundayHours") },
                  ] as const
                ).map(({ day, hours }, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--space-4) 0",
                      borderBottom: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-base)",
                        fontWeight: 400,
                        color: "var(--color-foreground)",
                      }}
                    >
                      {day}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-base)",
                        fontWeight: 500,
                        color: idx === 2 ? "var(--color-muted)" : "var(--color-foreground)",
                      }}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider — visible on desktop only */}
            <div
              className="location-divider"
              aria-hidden="true"
              style={{ display: "none", width: "1px", backgroundColor: "var(--color-border)", alignSelf: "stretch" }}
            />

            {/* Right — phone + booking note */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: "var(--space-8)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {t("location.phoneLabel")}
                </p>
                <a
                  href="tel:+4598920099"
                  aria-label="Ring til os: 98 92 00 99"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(var(--text-2xl), 2.5vw, var(--text-3xl))",
                    fontWeight: 400,
                    color: "var(--color-foreground)",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    display: "block",
                    transition: "color var(--duration-fast) var(--easing-out)",
                  }}
                  className="phone-link"
                >
                  {t("location.phone")}
                </a>
              </div>

              {/* Booking note */}
              <div
                style={{
                  borderLeft: "2px solid var(--color-accent-500)",
                  paddingLeft: "var(--space-5)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-ink-600)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  {t("location.bookingNote")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .location-grid {
              grid-template-columns: 1fr auto 1fr !important;
              gap: var(--space-16) !important;
              align-items: start !important;
            }
            .location-divider {
              display: block !important;
            }
          }
          .phone-link:hover {
            color: var(--color-accent-500) !important;
          }
        `}</style>
      </section>

      {/* ── 5. COLOR BOOKING CALLOUT STRIP ───────────────────────────────────── */}
      <section
        aria-label="Farve og highlights"
        style={{
          backgroundColor: "var(--color-ink-950)",
          padding: "var(--space-10) var(--container-padding)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-8)",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(var(--text-base), 1.5vw, var(--text-lg))",
              fontWeight: 400,
              color: "var(--color-ink-50)",
              lineHeight: "var(--leading-normal)",
              maxWidth: "640px",
            }}
          >
            {t("colorStrip.copy")}
          </p>

          <a
            href="tel:+4598920099"
            aria-label="Ring til os: 98 92 00 99"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-ink-50)",
              textDecoration: "none",
              border: "1px solid var(--color-ink-400)",
              padding: "0.625rem 1.5rem",
              borderRadius: 0,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "inline-block",
              transition: "border-color var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
            }}
            className="strip-cta"
          >
            98 92 00 99
          </a>
        </div>

        <style>{`
          .strip-cta:hover {
            border-color: var(--color-ink-50) !important;
            color: var(--color-ink-50) !important;
          }
        `}</style>
      </section>
    </>
  );
}
