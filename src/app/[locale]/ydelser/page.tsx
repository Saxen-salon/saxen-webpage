import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ydelser.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/ydelser",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/ydelser`,
      type: "website",
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const hairSalonSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Saxen Frisør",
  url: SITE_URL,
  telephone: "+4598920099",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jernbanegade 1",
    postalCode: "9800",
    addressLocality: "Hjørring",
    addressCountry: "DK",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prisliste",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Dameklip" },
        price: "445",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Børneklip (under 12 år)" },
        price: "300",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Vask og føn" },
        price: "340",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hel-farvning af bund, m. klip",
        },
        price: "1020",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Striber i pakker m. klip, kort",
        },
        price: "1215",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Brudefrisure" },
        price: "960",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Bryn, vipper + retning" },
        price: "210",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Herreklip" },
        price: "355",
        priceCurrency: "DKK",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Maskinklip" },
        price: "185",
        priceCurrency: "DKK",
      },
    ],
  },
};

// ─── Price data ───────────────────────────────────────────────────────────────

type PriceItem = { service: string; price: string };
type PriceCategory = {
  key: string;
  heading: string;
  note?: string;
  items: PriceItem[];
};

const priceCategories: PriceCategory[] = [
  {
    key: "klipninger",
    heading: "Klipninger",
    items: [
      { service: "Dameklip", price: "445 kr" },
      {
        service: "Dameklip langt/tykt eller ny frisure",
        price: "470 kr",
      },
      { service: "Børneklip (under 12 år)", price: "300 kr" },
      { service: "Babyklip", price: "fra 180 kr" },
      { service: "Vask og føn", price: "340 kr" },
      { service: "Vask, føn, fladjernskrøller", price: "410 kr" },
      { service: "Permanent med klip (kort hår)", price: "1.110 kr" },
      { service: "Permanent med klip (langt hår)", price: "1.270 kr" },
      { service: "Permanent uden klip (kort hår)", price: "810 kr" },
      { service: "Antipermanent uden klip", price: "620 kr" },
    ],
  },
  {
    key: "klipOgFarve",
    heading: "Klip og Farve",
    note: "Farve og highlights kræver telefonisk aftale — ring på 98 92 00 99",
    items: [
      { service: "Hel-farvning af bund, m. klip", price: "1.020 kr" },
      {
        service: "Hel-farvning af bund + længder m. klip",
        price: "1.055 kr",
      },
      {
        service: "Lyse striber i hætte m. klip, kort",
        price: "1.015 kr",
      },
      { service: "Striber i pakker m. klip, kort", price: "1.215 kr" },
      { service: "Striber i pakker m. klip, mellem", price: "1.315 kr" },
      { service: "Striber i pakker m. klip, langt", price: "1.415 kr" },
      {
        service: "Striber i pakker m. klip, langt + tykt",
        price: "1.530 kr",
      },
      { service: "Farve + reflekser m. klip, kort", price: "1.215 kr" },
      {
        service: "Farve + reflekser m. klip, mellem",
        price: "1.315 kr",
      },
      { service: "Farve + reflekser m. klip, langt", price: "1.435 kr" },
      {
        service: "Farve + reflekser m. klip, langt + tykt",
        price: "1.590 kr",
      },
      { service: "Glossing med klip", price: "800 kr" },
      { service: "Hel-farvning af bund (u. klip)", price: "575 kr" },
      {
        service: "Hel-farvning af bund + længder (u. klip)",
        price: "625 kr",
      },
      { service: "Lyse striber i hætte, kort", price: "570 kr" },
      { service: "Striber i pakker, kort", price: "770 kr" },
      { service: "Striber i pakker, mellem", price: "880 kr" },
      { service: "Striber i pakker, langt", price: "985 kr" },
      { service: "Striber i pakker, langt + tykt", price: "1.070 kr" },
      { service: "Farve + reflekser, kort", price: "780 kr" },
      { service: "Farve + reflekser, mellem", price: "880 kr" },
      { service: "Farve + reflekser, langt", price: "980 kr" },
      { service: "Farve + reflekser, langt + tykt", price: "1.120 kr" },
      { service: "Afrensning", price: "495 kr" },
      {
        service: "Wella Plex behandling + hjemmeprodukt",
        price: "349 kr",
      },
      { service: "Kur behandling", price: "135 kr" },
    ],
  },
  {
    key: "opsaetninger",
    heading: "Opsætninger",
    items: [
      { service: "Langt hår, opsætning", price: "660 kr" },
      { service: "Konfirmationsopsætning", price: "660 kr" },
      { service: "Brudefrisure", price: "960 kr" },
    ],
  },
  {
    key: "brynOgVipper",
    heading: "Bryn og Vipper",
    items: [
      { service: "Bryn, vipper + retning", price: "210 kr" },
      { service: "Bryn farve og ret", price: "120 kr" },
    ],
  },
  {
    key: "herrer",
    heading: "Herrer",
    items: [
      { service: "Herreklip", price: "355 kr" },
      { service: "Skægklipning", price: "110 kr" },
      { service: "Lyse striber i hætte, herre", price: "435 kr" },
      { service: "Maskinklip", price: "185 kr" },
      { service: "Maskinklip, krans", price: "110 kr" },
    ],
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function YdelserPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ydelser");

  return (
    <>
      {/* JSON-LD HairSalon with OfferCatalog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hairSalonSchema) }}
      />

      {/* ── 1. HERO / INTRO ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="ydelser-heading"
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
            {t("intro.eyebrow")}
          </p>

          {/* Asymmetric layout: headline left, note right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-12)",
              alignItems: "start",
            }}
            className="ydelser-intro-grid"
          >
            {/* Left — headline + lead */}
            <div>
              <h1
                id="ydelser-heading"
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
                {t("intro.headline")}
              </h1>

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
                {t("intro.lead")}
              </p>
            </div>

            {/* Right — color booking callout (left-border accent, not a card) */}
            <div
              style={{
                borderLeft: "2px solid var(--color-accent-500)",
                paddingLeft: "var(--space-6)",
                alignSelf: "end",
              }}
            >
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
                {t("colorNote.text")}
              </p>
              <a
                href="tel:+4598920099"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 500,
                  color: "var(--color-accent-500)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition:
                    "color var(--duration-fast) var(--easing-out)",
                }}
                className="color-note-phone"
              >
                98 92 00 99
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .ydelser-intro-grid {
              grid-template-columns: 55fr 45fr !important;
              gap: var(--space-20) !important;
              align-items: end !important;
            }
          }
          .color-note-phone:hover {
            color: var(--color-ink-700) !important;
          }
        `}</style>
      </section>

      {/* ── 2. PRICE LIST ────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="pricelist-heading"
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
          {/* Section heading — asymmetric: heading left, anchored text right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-6)",
              marginBottom: "var(--space-16)",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "var(--space-10)",
            }}
            className="pricelist-header-grid"
          >
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
                {t("pricelist.eyebrow")}
              </p>
              <h2
                id="pricelist-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-4xl), 4vw, var(--text-5xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-tight)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("pricelist.heading")}
              </h2>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                fontWeight: 400,
                color: "var(--color-muted)",
                lineHeight: "var(--leading-relaxed)",
                alignSelf: "end",
                maxWidth: "400px",
              }}
              className="pricelist-header-note"
            >
              {t("pricelist.note")}
            </p>
          </div>

          {/* The price list — two-column layout: categories left/right on desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-16)",
            }}
            className="pricelist-columns"
          >
            {priceCategories.map((category) => (
              <div key={category.key}>
                {/* Category heading — Playfair Display, editorial scale */}
                <div
                  style={{
                    marginBottom: "var(--space-8)",
                    paddingBottom: "var(--space-5)",
                    borderBottom: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "var(--space-6)",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(var(--text-3xl), 3vw, var(--text-4xl))",
                      fontWeight: 400,
                      lineHeight: "var(--leading-tight)",
                      color: "var(--color-foreground)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {category.heading}
                  </h3>
                  {/* Category item count — editorial detail */}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 400,
                      color: "var(--color-muted)",
                      letterSpacing: "0.08em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {category.items.length}{" "}
                    {category.items.length === 1 ? "ydelse" : "ydelser"}
                  </span>
                </div>

                {/* Category note (for color services) */}
                {category.note && (
                  <div
                    style={{
                      borderLeft: "2px solid var(--color-accent-500)",
                      paddingLeft: "var(--space-4)",
                      marginBottom: "var(--space-6)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 400,
                        color: "var(--color-muted)",
                        lineHeight: "var(--leading-normal)",
                      }}
                    >
                      {category.note}
                    </p>
                  </div>
                )}

                {/* Price rows — hairline dividers, service left / price right */}
                <dl>
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "var(--space-6)",
                        padding: "var(--space-4) 0",
                        borderBottom: "1px solid var(--color-border-subtle)",
                      }}
                    >
                      <dt
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-base)",
                          fontWeight: 400,
                          color: "var(--color-foreground)",
                          lineHeight: "var(--leading-normal)",
                        }}
                      >
                        {item.service}
                      </dt>
                      <dd
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-base)",
                          fontWeight: 500,
                          color: "var(--color-ink-700)",
                          lineHeight: "var(--leading-normal)",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          margin: 0,
                        }}
                      >
                        {item.price}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .pricelist-header-grid {
              grid-template-columns: 1fr 1fr !important;
              align-items: end !important;
            }
            .pricelist-header-note {
              text-align: right;
            }
            .pricelist-columns {
              grid-template-columns: 1fr 1fr !important;
              gap: var(--space-16) var(--space-20) !important;
            }
          }
        `}</style>
      </section>

      {/* ── 3. COLOR INQUIRY CALLOUT STRIP ───────────────────────────────────── */}
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
            {t("colorCallout.copy")}
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
              transition:
                "border-color var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
            }}
            className="strip-cta"
          >
            98 92 00 99
          </a>
        </div>

        <style>{`
          .strip-cta:hover {
            border-color: var(--color-ink-50) !important;
          }
        `}</style>
      </section>

      {/* ── 4. BOOKING CTA ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="booking-heading"
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
            className="booking-grid"
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
                {t("booking.eyebrow")}
              </p>
              <h2
                id="booking-heading"
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
                {t("booking.headline")}
              </h2>
            </div>

            {/* Right — CTAs + supporting copy */}
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
                {t("booking.body")}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-4)",
                  alignItems: "center",
                }}
              >
                {/* Primary — external booking link */}
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
                  {t("booking.ctaPrimary")}
                </a>

                {/* Secondary — internal contact page */}
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
                    transition:
                      "background-color var(--duration-fast) var(--easing-out), color var(--duration-fast) var(--easing-out)",
                  }}
                  className="booking-cta-secondary"
                >
                  {t("booking.ctaSecondary")}
                </Link>
              </div>

              {/* Phone as tertiary option */}
              <a
                href="tel:+4598920099"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color var(--duration-fast) var(--easing-out)",
                }}
                className="booking-phone"
              >
                {t("booking.phoneLabel")} 98 92 00 99
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .booking-grid {
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
          .booking-phone:hover {
            color: var(--color-foreground) !important;
          }
        `}</style>
      </section>
    </>
  );
}
