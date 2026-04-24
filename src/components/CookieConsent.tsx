"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "cookie-consent";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storePreferences(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(() => !getStoredPreferences());
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    () => getStoredPreferences() ?? defaultPreferences,
  );
  const dialogRef = useRef<HTMLDivElement>(null);

  // Move focus to dialog when it becomes visible
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dialogRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  function acceptAll() {
    const prefs = { necessary: true, analytics: true, marketing: true };
    setPreferences(prefs);
    storePreferences(prefs);
    setVisible(false);
  }

  function acceptSelected() {
    storePreferences(preferences);
    setVisible(false);
  }

  function rejectOptional() {
    const prefs = { necessary: true, analytics: false, marketing: false };
    setPreferences(prefs);
    storePreferences(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
      tabIndex={-1}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "var(--color-background)",
        borderTop: "1px solid var(--color-border)",
        padding: "var(--space-6)",
        /* S4: no shadow, hairline border only */
      }}
    >
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-lg)",
            fontWeight: 400,
            color: "var(--color-foreground)",
            marginBottom: "var(--space-2)",
          }}
        >
          {t("title")}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-muted)",
            marginBottom: "var(--space-4)",
            lineHeight: "var(--leading-normal)",
          }}
        >
          {t("description")}
        </p>

        {showDetails && (
          <div style={{ marginBottom: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-foreground)", cursor: "default" }}>
              <input
                type="checkbox"
                checked
                disabled
                style={{ accentColor: "var(--color-accent-500)", marginTop: "2px", flexShrink: 0 }}
              />
              <span>
                <strong>{t("necessary")}</strong> — {t("necessaryDesc")}
              </span>
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-foreground)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                }
                style={{ accentColor: "var(--color-accent-500)", marginTop: "2px", flexShrink: 0 }}
              />
              <span>
                <strong>{t("analytics")}</strong> — {t("analyticsDesc")}
              </span>
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-foreground)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                }
                style={{ accentColor: "var(--color-accent-500)", marginTop: "2px", flexShrink: 0 }}
              />
              <span>
                <strong>{t("marketing")}</strong> — {t("marketingDesc")}
              </span>
            </label>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)" }}>
          {/* Primary CTA — terracotta, flat, no radius */}
          <button
            onClick={acceptAll}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              backgroundColor: "var(--color-accent-600)",
              color: "var(--color-ink-50)",
              border: "none",
              borderRadius: 0,
              padding: "0.5rem 1.25rem",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "background-color 150ms ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-accent-500)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-accent-600)";
            }}
          >
            {t("acceptAll")}
          </button>

          {/* Secondary — ink border, flat, no radius */}
          <button
            onClick={rejectOptional}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              backgroundColor: "transparent",
              color: "var(--color-foreground)",
              border: "1px solid var(--color-foreground)",
              borderRadius: 0,
              padding: "0.5rem 1.25rem",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "background-color 150ms ease-out, color 150ms ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-foreground)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-ink-50)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-foreground)";
            }}
          >
            {t("rejectOptional")}
          </button>

          {showDetails ? (
            <button
              onClick={acceptSelected}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                backgroundColor: "transparent",
                color: "var(--color-foreground)",
                border: "1px solid var(--color-border)",
                borderRadius: 0,
                padding: "0.5rem 1.25rem",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "border-color 150ms ease-out",
              }}
            >
              {t("savePreferences")}
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--color-muted)",
                background: "none",
                border: "none",
                borderRadius: 0,
                padding: 0,
                cursor: "pointer",
                textDecoration: "underline",
                transition: "color 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-foreground)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)";
              }}
            >
              {t("customize")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
