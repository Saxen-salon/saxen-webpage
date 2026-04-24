import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE_URL } from "@/lib/site-config";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("kontakt.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/kontakt",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/kontakt`,
      type: "website",
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": ["ContactPage", "HairSalon"],
  name: "Saxen Frisør — Kontakt",
  url: `${SITE_URL}/kontakt`,
  telephone: "+4598920099",
  email: "susanne@karlborg.dk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jernbanegade 1",
    postalCode: "9800",
    addressLocality: "Hjørring",
    addressCountry: "DK",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "13:00",
    },
  ],
  hasMap: "https://www.google.com/maps/search/?api=1&query=Jernbanegade+1%2C+9800+Hj%C3%B8rring",
};

// ─── Hours data ───────────────────────────────────────────────────────────────

const openingHours = [
  { day: "Mandag", hours: "09:00–17:30", closed: false },
  { day: "Tirsdag", hours: "09:00–17:30", closed: false },
  { day: "Onsdag", hours: "09:00–17:30", closed: false },
  { day: "Torsdag", hours: "09:00–17:30", closed: false },
  { day: "Fredag", hours: "09:00–17:30", closed: false },
  { day: "Lørdag", hours: "08:00–13:00", closed: false },
  { day: "Søndag", hours: "Lukket", closed: true },
] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("kontakt");

  return (
    <>
      {/* JSON-LD ContactPage + HairSalon */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* ── 1. HERO / INTRO ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="kontakt-heading"
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

          {/* Asymmetric layout: headline left (~60%), lead right (~40%) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "end",
            }}
            className="kontakt-intro-grid"
          >
            {/* Left — headline */}
            <div>
              <h1
                id="kontakt-heading"
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
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(var(--text-lg), 2vw, var(--text-xl))",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  maxWidth: "420px",
                }}
              >
                {t("lead")}
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .kontakt-intro-grid {
              grid-template-columns: 60fr 40fr !important;
              gap: var(--space-20) !important;
            }
          }
        `}</style>
      </section>

      {/* ── 2. MAIN CONTACT INFO ─────────────────────────────────────────────── */}
      {/* Critical above-the-fold section: phone, address, email, booking CTA   */}
      <section
        aria-labelledby="contact-info-heading"
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
            id="contact-info-heading"
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
            {t("eyebrow")}
          </p>

          {/* Asymmetric two-column: primary info left (phone, address, email), booking right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-16)",
            }}
            className="contact-grid"
          >
            {/* Left column — primary contact details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-12)",
              }}
            >
              {/* Phone — large, scannable, click-to-call */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {t("phone.label")}
                </p>
                <a
                  href="tel:+4598920099"
                  aria-label="Ring til os: 98 92 00 99"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(var(--text-4xl), 5vw, var(--text-6xl))",
                    fontWeight: 400,
                    lineHeight: "var(--leading-tight)",
                    color: "var(--color-foreground)",
                    textDecoration: "none",
                    letterSpacing: "-0.02em",
                    display: "block",
                    transition: "color var(--duration-fast) var(--easing-out)",
                  }}
                  className="phone-link-primary"
                >
                  {t("phone.number")}
                </a>
              </div>

              {/* Address */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {t("address.label")}
                </p>
                <address
                  style={{
                    fontStyle: "normal",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(var(--text-3xl), 3vw, var(--text-4xl))",
                      fontWeight: 400,
                      lineHeight: "var(--leading-snug)",
                      color: "var(--color-foreground)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t("address.street")}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(var(--text-3xl), 3vw, var(--text-4xl))",
                      fontWeight: 400,
                      lineHeight: "var(--leading-snug)",
                      color: "var(--color-muted)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t("address.city")}
                  </p>
                </address>
              </div>

              {/* Email */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {t("email.label")}
                </p>
                <a
                  href={`mailto:${t("email.address")}`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-lg)",
                    fontWeight: 400,
                    color: "var(--color-foreground)",
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                    transition: "color var(--duration-fast) var(--easing-out)",
                  }}
                  className="email-link"
                >
                  {t("email.address")}
                </a>
              </div>
            </div>

            {/* Vertical divider — desktop only */}
            <div
              className="contact-divider"
              aria-hidden="true"
              style={{
                display: "none",
                width: "1px",
                backgroundColor: "var(--color-border)",
                alignSelf: "stretch",
              }}
            />

            {/* Right column — booking CTA block */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "var(--space-10)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "var(--space-5)",
                  }}
                >
                  {t("booking.onlineLabel")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 400,
                    color: "var(--color-ink-600)",
                    lineHeight: "var(--leading-relaxed)",
                    marginBottom: "var(--space-8)",
                    maxWidth: "340px",
                  }}
                >
                  {t("booking.onlineDesc")}
                </p>
                <a
                  href="https://saxenhjoerring.bestilling.nu"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    transition:
                      "background-color var(--duration-fast) var(--easing-out)",
                  }}
                  className="cta-primary"
                >
                  {t("booking.primary")}
                  <span style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>
                    (åbner i nyt vindue)
                  </span>
                </a>
              </div>

              {/* Color inquiry callout — left-border accent, not a card */}
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
                  {t("colorNote.text")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .contact-grid {
              grid-template-columns: 55fr auto 45fr !important;
              gap: var(--space-16) !important;
              align-items: start !important;
            }
            .contact-divider {
              display: block !important;
            }
          }
          .phone-link-primary:hover {
            color: var(--color-accent-500) !important;
          }
          .email-link:hover {
            color: var(--color-accent-500) !important;
          }
          .cta-primary:hover {
            background-color: var(--color-accent-500) !important;
          }
        `}</style>
      </section>

      {/* ── 3. OPENING HOURS ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hours-heading"
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
          {/* Asymmetric: heading left, hours table right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "start",
            }}
            className="hours-grid"
          >
            {/* Left — heading block */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("hours.label")}
              </p>
              <h2
                id="hours-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-4xl), 4vw, var(--text-5xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-tight)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("hours.heading")}
              </h2>
            </div>

            {/* Right — hairline-row hours table */}
            <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
              {openingHours.map(({ day, hours, closed }) => (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "var(--space-4) 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 400,
                      color: closed
                        ? "var(--color-muted)"
                        : "var(--color-foreground)",
                    }}
                  >
                    {day}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: closed ? 400 : 500,
                      color: closed
                        ? "var(--color-muted)"
                        : "var(--color-foreground)",
                      letterSpacing: closed ? 0 : "0.01em",
                    }}
                  >
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .hours-grid {
              grid-template-columns: 40fr 60fr !important;
              gap: var(--space-20) !important;
            }
          }
        `}</style>
      </section>

      {/* ── 4. MAP SECTION ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="map-heading"
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
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              color: "var(--color-muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "var(--space-4)",
            }}
          >
            {t("map.eyebrow")}
          </p>
          <h2
            id="map-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--text-4xl), 4vw, var(--text-5xl))",
              fontWeight: 400,
              lineHeight: "var(--leading-tight)",
              color: "var(--color-foreground)",
              letterSpacing: "-0.02em",
              marginBottom: "var(--space-10)",
            }}
          >
            Jernbanegade 1, Hjørring
          </h2>

          {/* Asymmetric: map iframe left (~65%), address block right (~35%) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-10)",
              alignItems: "start",
            }}
            className="map-grid"
          >
            {/* Google Maps embed */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "60%",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
              }}
              className="map-embed-container"
            >
              <iframe
                title="Saxen Frisør på Jernbanegade 1, Hjørring"
                aria-label="Saxen Frisør på Jernbanegade 1, Hjørring"
                src="https://maps.google.com/maps?q=Jernbanegade+1,+9800+Hjørring,+Denmark&hl=da&z=16&output=embed"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right — address + Google Maps link */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
                paddingTop: "var(--space-2)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {t("map.addressLabel")}
                </p>
                <address style={{ fontStyle: "normal" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-2xl)",
                      fontWeight: 400,
                      lineHeight: "var(--leading-snug)",
                      color: "var(--color-foreground)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Jernbanegade 1<br />
                    <span style={{ color: "var(--color-muted)" }}>
                      9800 Hjørring
                    </span>
                  </p>
                </address>
              </div>

              {/* Google Maps external link */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jernbanegade+1%2C+9800+Hjørring"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: "var(--color-foreground)",
                  textDecoration: "none",
                  border: "1px solid var(--color-border)",
                  padding: "0.625rem 1.25rem",
                  borderRadius: 0,
                  letterSpacing: "0.04em",
                  display: "inline-block",
                  transition:
                    "background-color var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out), border-color var(--duration-fast) var(--easing-out)",
                }}
                className="map-link"
              >
                {t("booking.mapLink")}
                <span style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>
                  (åbner i nyt vindue)
                </span>
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .map-grid {
              grid-template-columns: 65fr 35fr !important;
              gap: var(--space-12) !important;
              align-items: start !important;
            }
            .map-embed-container {
              padding-bottom: 56% !important;
            }
          }
          .map-link:hover {
            background-color: var(--color-foreground) !important;
            color: var(--color-ink-50) !important;
            border-color: var(--color-foreground) !important;
          }
        `}</style>
      </section>

      {/* ── 5. BOOKING CTA ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="booking-cta-heading"
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
          {/* Asymmetric: large heading left, CTAs right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "end",
            }}
            className="booking-cta-grid"
          >
            {/* Left — heading */}
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
                {t("booking.ctaEyebrow")}
              </p>
              <h2
                id="booking-cta-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-4xl), 4vw, var(--text-6xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-tight)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                  maxWidth: "560px",
                }}
              >
                {t("booking.ctaHeading")}
              </h2>
            </div>

            {/* Right — CTAs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 400,
                  color: "var(--color-ink-600)",
                  lineHeight: "var(--leading-relaxed)",
                  maxWidth: "380px",
                }}
              >
                {t("booking.ctaBody")}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-4)",
                  alignItems: "center",
                }}
              >
                {/* Primary — external booking */}
                <a
                  href="https://saxenhjoerring.bestilling.nu"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    transition:
                      "background-color var(--duration-fast) var(--easing-out)",
                  }}
                  className="booking-cta-primary"
                >
                  {t("booking.primary")}
                  <span style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>
                    (åbner i nyt vindue)
                  </span>
                </a>

                {/* Secondary — phone */}
                <a
                  href="tel:+4598920099"
                  aria-label="Ring til os: 98 92 00 99"
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
                    transition:
                      "background-color var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
                  }}
                  className="booking-cta-secondary"
                >
                  98 92 00 99
                </a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .booking-cta-grid {
              grid-template-columns: 55fr 45fr !important;
              gap: var(--space-20) !important;
            }
          }
          .booking-cta-primary:hover {
            background-color: var(--color-accent-500) !important;
          }
          .booking-cta-secondary:hover {
            background-color: var(--color-foreground) !important;
            color: var(--color-ink-50) !important;
          }
        `}</style>
      </section>
    </>
  );
}
