"use client";

import { useState } from "react";
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
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-lg p-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">{t("title")}</h2>
        <p className="text-sm text-neutral-600 mb-4">{t("description")}</p>

        {showDetails && (
          <div className="mb-4 space-y-3">
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked disabled className="accent-accent" />
              <span>
                <strong>{t("necessary")}</strong> — {t("necessaryDesc")}
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                }
                className="accent-accent"
              />
              <span>
                <strong>{t("analytics")}</strong> — {t("analyticsDesc")}
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                }
                className="accent-accent"
              />
              <span>
                <strong>{t("marketing")}</strong> — {t("marketingDesc")}
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={acceptAll}
            className="px-5 py-2 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors"
          >
            {t("acceptAll")}
          </button>
          <button
            onClick={rejectOptional}
            className="px-5 py-2 border border-neutral-300 text-sm font-medium rounded hover:bg-neutral-50 transition-colors"
          >
            {t("rejectOptional")}
          </button>
          {showDetails ? (
            <button
              onClick={acceptSelected}
              className="px-5 py-2 border border-neutral-300 text-sm font-medium rounded hover:bg-neutral-50 transition-colors"
            >
              {t("savePreferences")}
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="text-sm text-neutral-500 underline hover:text-neutral-700"
            >
              {t("customize")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
