import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";
import { isPlaceholder } from "@/lib/placeholder";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("team.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/team",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/team`,
      type: "website",
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const hairSalonSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Saxen Frisør",
  employee: [
    { "@type": "Person", "name": "Susanne", "worksFor": { "@type": "Organization", "name": "Saxen Frisør" } },
    { "@type": "Person", "name": "Anita", "worksFor": { "@type": "Organization", "name": "Saxen Frisør" } },
    { "@type": "Person", "name": "Heidi", "worksFor": { "@type": "Organization", "name": "Saxen Frisør" } },
    { "@type": "Person", "name": "Tina", "worksFor": { "@type": "Organization", "name": "Saxen Frisør" } },
    { "@type": "Person", "name": "Merete", "worksFor": { "@type": "Organization", "name": "Saxen Frisør" } },
    { "@type": "Person", "name": "Camilla", "worksFor": { "@type": "Organization", "name": "Saxen Frisør" } },
  ],
};

// ─── Staff data ───────────────────────────────────────────────────────────────

type StaffMember = {
  key: "susanne" | "anita" | "heidi" | "tina" | "merete" | "camilla";
  imageSrc: string;
};

// Featured pair — larger portrait treatment, 55/45 asymmetric row
const featuredMembers: StaffMember[] = [
  { key: "susanne", imageSrc: "/images/team/susanne.jpg" },
  { key: "anita", imageSrc: "/images/team/anita.jpg" },
];

// Supporting four — compact portrait row below
const supportingMembers: StaffMember[] = [
  { key: "heidi", imageSrc: "/images/team/heidi.jpg" },
  { key: "tina", imageSrc: "/images/team/tina.jpg" },
  { key: "merete", imageSrc: "/images/team/merete.jpg" },
  { key: "camilla", imageSrc: "/images/team/camilla.jpg" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("team");

  return (
    <>
      {/* JSON-LD HairSalon with employees */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hairSalonSchema) }}
      />

      {/* ── 1. INTRO ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="team-heading"
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

          {/* Asymmetric intro: headline left (60fr), lead right (40fr) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-10)",
              alignItems: "end",
            }}
            className="team-intro-grid"
          >
            {/* Left — h1 */}
            <div>
              <h1
                id="team-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-5xl), 6vw, var(--text-7xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-display)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("headline")}
              </h1>
            </div>

            {/* Right — lead paragraph */}
            <div>
              {/* Hairline accent */}
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
                  maxWidth: "460px",
                }}
              >
                {t("lead")}
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .team-intro-grid {
              grid-template-columns: 60fr 40fr !important;
              gap: var(--space-20) !important;
            }
          }
        `}</style>
      </section>

      {/* ── 2. PORTRAIT GRID ─────────────────────────────────────────────────── */}
      <section
        aria-label="Vores frisører"
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
          {/* ── Featured row: 55/45 asymmetric — L2 Editorial Asymmetry ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-8)",
              marginBottom: "var(--space-12)",
            }}
            className="team-featured-row"
          >
            {featuredMembers.map((member) => {
              const bio = t(`members.${member.key}.bio`);
              const alt = t(`members.${member.key}.alt`);
              const name = t(`members.${member.key}.name`);
              return (
                <article key={member.key}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "3/4",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={member.imageSrc}
                      alt={alt}
                      fill
                      sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 55vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                        borderRadius: 0,
                      }}
                    />
                  </div>
                  <div style={{ paddingTop: "var(--space-5)" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-3xl)",
                        fontWeight: 400,
                        color: "var(--color-foreground)",
                        letterSpacing: "-0.01em",
                        marginBottom: "var(--space-3)",
                      }}
                    >
                      {name}
                    </h2>
                    <p
                      className={isPlaceholder(bio) ? "placeholder-content" : undefined}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-base)",
                        fontWeight: 400,
                        color: "var(--color-muted)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      {bio}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── Supporting row: 4-column compact portraits ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "var(--space-6)",
            }}
            className="team-supporting-row"
          >
            {supportingMembers.map((member) => {
              const bio = t(`members.${member.key}.bio`);
              const alt = t(`members.${member.key}.alt`);
              const name = t(`members.${member.key}.name`);
              return (
                <article key={member.key}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "3/4",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={member.imageSrc}
                      alt={alt}
                      fill
                      sizes="(max-width: 599px) 50vw, (max-width: 899px) 50vw, 25vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                        borderRadius: 0,
                      }}
                    />
                  </div>
                  <div style={{ paddingTop: "var(--space-4)" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xl)",
                        fontWeight: 400,
                        color: "var(--color-foreground)",
                        letterSpacing: "-0.01em",
                        marginBottom: "var(--space-2)",
                      }}
                    >
                      {name}
                    </h3>
                    <p
                      className={isPlaceholder(bio) ? "placeholder-content" : undefined}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 400,
                        color: "var(--color-muted)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      {bio}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .team-featured-row { grid-template-columns: 55fr 45fr !important; }
            .team-supporting-row { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ── 3. CLOSING / BOOKING CTA ─────────────────────────────────────────── */}
      <section
        aria-label="Book tid"
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
          {/* Asymmetric: closing headline left, CTA right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-10)",
              alignItems: "end",
            }}
            className="team-closing-grid"
          >
            {/* Left — warm closing text */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(var(--text-3xl), 3vw, var(--text-5xl))",
                  fontWeight: 400,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--color-foreground)",
                  letterSpacing: "-0.01em",
                  maxWidth: "560px",
                }}
              >
                {t("closing")}
              </p>
            </div>

            {/* Right — booking CTA */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
                alignItems: "flex-start",
              }}
            >
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
                className="team-cta-primary"
              >
                {t("bookCta")}
              </Link>

              <a
                href="tel:+4598920099"
                aria-label="Ring til os: 98 92 00 99"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color var(--duration-fast) var(--easing-out)",
                }}
                className="team-phone-link"
              >
                98 92 00 99
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .team-closing-grid {
              grid-template-columns: 60fr 40fr !important;
              gap: var(--space-20) !important;
            }
          }
          .team-cta-primary:hover {
            background-color: var(--color-accent-500) !important;
          }
          .team-phone-link:hover {
            color: var(--color-foreground) !important;
          }
        `}</style>
      </section>
    </>
  );
}
