"use client";

import { useEffect, useState } from "react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "cookie-consent";

function getStoredCategory(category: keyof CookiePreferences): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) return false;
    const prefs: CookiePreferences = JSON.parse(stored);
    return prefs[category] === true;
  } catch {
    return false;
  }
}

interface ConsentGateProps {
  category: keyof CookiePreferences;
  children: React.ReactNode;
}

/**
 * Renders children only when the user has consented to the specified
 * cookie category. Reads from localStorage on the client — renders nothing
 * on the server to avoid hydration mismatches.
 *
 * Usage:
 *   <ConsentGate category="analytics"><Analytics /></ConsentGate>
 */
export function ConsentGate({ category, children }: ConsentGateProps) {
  // Lazy initializer runs once on client mount — no setState-in-effect needed
  const [allowed, setAllowed] = useState<boolean>(() =>
    getStoredCategory(category),
  );

  useEffect(() => {
    // Re-check when localStorage changes in another tab / window
    function handleStorage(e: StorageEvent) {
      if (e.key === COOKIE_KEY) {
        setAllowed(getStoredCategory(category));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [category]);

  if (!allowed) return null;

  return <>{children}</>;
}
