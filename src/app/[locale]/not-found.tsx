import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 var(--container-padding)",
        backgroundColor: "var(--color-background)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-6xl)",
            fontWeight: 400,
            color: "var(--color-border)",
            marginBottom: "var(--space-6)",
            lineHeight: "var(--leading-display)",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            fontWeight: 400,
            color: "var(--color-foreground)",
            marginBottom: "var(--space-4)",
            lineHeight: "var(--leading-tight)",
          }}
        >
          {t("title")}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            color: "var(--color-ink-600)",
            marginBottom: "var(--space-10)",
            lineHeight: "var(--leading-normal)",
          }}
        >
          {t("description")}
        </p>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            backgroundColor: "var(--color-accent-600)",
            color: "var(--color-ink-50)",
            textDecoration: "none",
            borderRadius: 0,
            padding: "0.75rem 1.75rem",
            display: "inline-block",
            letterSpacing: "0.04em",
            transition: "background-color var(--duration-fast) var(--easing-out)",
          }}
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
