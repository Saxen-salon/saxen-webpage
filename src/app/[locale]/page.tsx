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

// ─── Team member data ─────────────────────────────────────────────────────────

const teamMembers = [
  { key: "susanne", name: "Susanne", large: true },
  { key: "anita", name: "Anita", large: true },
  { key: "heidi", name: "Heidi", large: false },
  { key: "tina", name: "Tina", large: false },
  { key: "merete", name: "Merete", large: false },
  { key: "camilla", name: "Camilla", large: false },
] as const;

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
          paddingTop: "clamp(4rem, 8vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
          borderBottom: "1px solid var(--color-border-subtle)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-padding)",
          }}
        >
          {/* Asymmetric grid: ~60% text left / 40% visual right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* Left — typography composition */}
            <div style={{ maxWidth: "640px" }}>
              {/* Location badge */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-6)",
                }}
              >
                {t("hero.location")}
              </p>

              {/* Headline — Playfair Display, 72–88px, leading-display */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-7xl), 7vw, var(--text-8xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-display)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-8)",
                }}
              >
                {t("hero.headline")}
              </h1>

              {/* Sub-headline — Work Sans, 18–20px, muted */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(var(--text-lg), 2vw, var(--text-xl))",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  lineHeight: "var(--leading-normal)",
                  marginBottom: "var(--space-10)",
                  maxWidth: "480px",
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
                {/* Primary — terracotta flat, 0px radius */}
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

                {/* Secondary — ink outline, flat */}
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

            {/* Right — typographic / textural composition on ink-100 */}
            <div
              aria-hidden="true"
              style={{
                position: "relative",
                height: "420px",
                backgroundColor: "var(--color-ink-100)",
                overflow: "hidden",
                flexShrink: 0,
              }}
              className="hero-visual"
            >
              {/* Large editorial number — 6 stylists */}
              <span
                style={{
                  position: "absolute",
                  bottom: "-0.15em",
                  right: "-0.05em",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(12rem, 22vw, 22rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "var(--color-ink-200)",
                  userSelect: "none",
                  letterSpacing: "-0.05em",
                }}
              >
                6
              </span>
              {/* Descriptive overlay text */}
              <div
                style={{
                  position: "absolute",
                  top: "var(--space-10)",
                  left: "var(--space-10)",
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
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Hjørring
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-2xl)",
                    fontWeight: 400,
                    color: "var(--color-ink-700)",
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  Frisører
                  <br />
                  siden vi<br />
                  åbnede.
                </p>
              </div>
              {/* Hairline vertical accent */}
              <div
                style={{
                  position: "absolute",
                  top: "var(--space-8)",
                  bottom: "var(--space-8)",
                  left: "var(--space-8)",
                  width: "1px",
                  backgroundColor: "var(--color-border)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Hero responsive styles */}
        <style>{`
          @media (min-width: 768px) {
            .hero-grid {
              grid-template-columns: 60fr 40fr !important;
              gap: var(--space-16) !important;
            }
            .hero-visual {
              height: 520px !important;
            }
          }
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

      {/* ── 3. TEAM TEASER ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="team-heading"
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
          {/* Section header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              marginBottom: "var(--space-16)",
            }}
            className="team-header"
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 500,
                color: "var(--color-muted)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {t("team.eyebrow")}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "var(--space-6)" }}>
              <h2
                id="team-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-4xl), 4vw, var(--text-5xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-tight)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("team.headline")}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  lineHeight: "var(--leading-normal)",
                  maxWidth: "360px",
                }}
              >
                {t("team.body")}
              </p>
            </div>
          </div>

          {/* Asymmetric portrait grid:
              2 large portraits (top row, irregular widths) +
              4 smaller portraits below (strip layout)
              Not three-equal Bootstrap cards. */}
          <div
            style={{
              display: "grid",
              gap: "var(--space-4)",
            }}
            className="team-portrait-grid"
          >
            {/* Row 1 — 2 large, asymmetric: 55% / 45% */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "55fr 45fr",
                gap: "var(--space-4)",
              }}
              className="team-row-large"
            >
              {teamMembers.filter((m) => m.large).map((member) => (
                <div key={member.key} style={{ position: "relative" }}>
                  {/* Portrait placeholder — TODO: replace with next/image */}
                  {/* TODO: Expected image path: /images/employees/{member.key}.jpg */}
                  {/* Source URL: https://www.saxen.dk/images/employees/{member.key}.jpg */}
                  <div
                    role="img"
                    aria-label={t("team.altText", { name: member.name })}
                    style={{
                      aspectRatio: "3/4",
                      backgroundColor: "var(--color-ink-100)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Decorative initial */}
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(5rem, 10vw, 9rem)",
                        fontWeight: 400,
                        color: "var(--color-ink-300)",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {member.name[0]}
                    </span>
                    {/* Top hairline */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: "var(--color-border)",
                      }}
                    />
                  </div>
                  {/* Name caption */}
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-xl)",
                      fontWeight: 400,
                      color: "var(--color-foreground)",
                      letterSpacing: "-0.01em",
                      paddingTop: "var(--space-4)",
                    }}
                  >
                    {member.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2 — 4 smaller portraits, horizontal strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "var(--space-4)",
              }}
              className="team-row-small"
            >
              {teamMembers.filter((m) => !m.large).map((member) => (
                <div key={member.key} style={{ position: "relative" }}>
                  {/* Portrait placeholder — TODO: replace with next/image */}
                  {/* TODO: Expected image path: /images/employees/{member.key}.jpg */}
                  {/* Source URL: https://www.saxen.dk/images/employees/{member.key}.jpg */}
                  <div
                    aria-label={t("team.altText", { name: member.name })}
                    style={{
                      aspectRatio: "3/4",
                      backgroundColor: "var(--color-surface-alt)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: 400,
                        color: "var(--color-ink-300)",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {member.name[0]}
                    </span>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: "var(--color-border-subtle)",
                      }}
                    />
                  </div>
                  {/* Name caption */}
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 400,
                      color: "var(--color-foreground)",
                      letterSpacing: "-0.01em",
                      paddingTop: "var(--space-3)",
                    }}
                  >
                    {member.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA below grid */}
          <div style={{ marginTop: "var(--space-12)", paddingTop: "var(--space-8)", borderTop: "1px solid var(--color-border-subtle)" }}>
            <Link
              href="/team"
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
              {t("team.cta")}
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 599px) {
            .team-row-large {
              grid-template-columns: 1fr !important;
            }
            .team-row-small {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </section>

      {/* ── 4. LOCATION / SALON INFO STRIP ───────────────────────────────────── */}
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
