"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * Saxen Frisør — Site Header
 *
 * Design: S4 Architectural Line (0px radius, 1px hairline bottom border)
 * Color: C3 Ink + Cream — cream background (#FAF7F2), ink text (#0F0E0C)
 * Typography: Playfair Display wordmark, Work Sans nav links
 * CTA: Flat terracotta (#B8623A) "Book tid" → /kontakt
 * Mobile: hamburger slides in from right, phone number visible
 */
export function Header() {
  const t = useTranslations("header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus trap + Escape key for mobile drawer
  useEffect(() => {
    if (!menuOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const navLinks = [
    { href: "/ydelser", label: t("nav.ydelser") },
    { href: "/team", label: t("nav.team") },
    { href: "/om-os", label: t("nav.omOs") },
    { href: "/kontakt", label: t("nav.kontakt") },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: "var(--color-background)",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid var(--color-border-subtle)",
          transition: "border-color 150ms ease-out",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 var(--container-padding)",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-8)",
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.625rem",
              fontWeight: 400,
              color: "var(--color-foreground)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label="Saxen Frisør — Forside"
          >
            Saxen
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primær navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-8)",
            }}
            className="saxen-desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: "var(--color-foreground)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 150ms ease-out",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Phone — visible desktop */}
            <a
              href={`tel:+4598920099`}
              aria-label={`Ring til os: ${t("phone")}`}
              className="saxen-phone-link"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--color-muted)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 150ms ease-out",
                whiteSpace: "nowrap",
              }}
            >
              {t("phone")}
            </a>

            {/* Book tid CTA */}
            <Link
              href="/kontakt"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                backgroundColor: "var(--color-accent-600)",
                color: "var(--color-ink-50)",
                textDecoration: "none",
                padding: "0.5rem 1.25rem",
                borderRadius: 0,
                letterSpacing: "0.04em",
                transition: "background-color 150ms ease-out",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "var(--color-accent-500)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "var(--color-accent-600)";
              }}
            >
              {t("bookCta")}
            </Link>
          </nav>

          {/* Mobile right: phone + hamburger — shown/hidden by scoped CSS, not inline style */}
          <div
            className="saxen-mobile-controls"
            style={{
              alignItems: "center",
              gap: "var(--space-4)",
            }}
          >
            {/* Phone number — always visible on mobile */}
            <a
              href="tel:+4598920099"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "var(--color-foreground)",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
              aria-label={`Ring til os: ${t("phone")}`}
            >
              {t("phone")}
            </a>

            {/* Hamburger button */}
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "var(--space-2)",
                color: "var(--color-foreground)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  backgroundColor: "var(--color-foreground)",
                  transition: "transform 150ms ease-out, opacity 150ms ease-out",
                  transform: menuOpen
                    ? "translateY(6px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  backgroundColor: "var(--color-foreground)",
                  transition: "opacity 150ms ease-out",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  backgroundColor: "var(--color-foreground)",
                  transition: "transform 150ms ease-out, opacity 150ms ease-out",
                  transform: menuOpen
                    ? "translateY(-6px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 39,
            backgroundColor: "rgba(15, 14, 12, 0.3)",
          }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        {...(!menuOpen && { inert: true })}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          zIndex: 50,
          backgroundColor: "var(--color-background)",
          borderLeft: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 200ms cubic-bezier(0.0, 0.0, 0.2, 1)",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 var(--container-padding)",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.375rem",
              fontWeight: 400,
              color: "var(--color-foreground)",
            }}
          >
            Saxen
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label={t("closeMenu")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "var(--space-2)",
              color: "var(--color-foreground)",
              fontSize: "1.25rem",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Drawer nav */}
        <nav
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--space-8) var(--container-padding)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xl)",
                fontWeight: 500,
                color: "var(--color-foreground)",
                textDecoration: "none",
                padding: "var(--space-5) 0",
                borderBottom:
                  idx < navLinks.length - 1
                    ? "1px solid var(--color-border-subtle)"
                    : "none",
                transition: "color 150ms ease-out",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Book tid CTA in drawer */}
          <Link
            href="/kontakt"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: 500,
              backgroundColor: "var(--color-accent-600)",
              color: "var(--color-ink-50)",
              textDecoration: "none",
              padding: "var(--space-4) var(--space-6)",
              borderRadius: 0,
              letterSpacing: "0.04em",
              display: "block",
              textAlign: "center",
              marginTop: "var(--space-8)",
            }}
          >
            {t("bookCta")}
          </Link>

          {/* Phone in drawer */}
          <a
            href="tel:+4598920099"
            aria-label={`Ring til os: ${t("phone")}`}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-muted)",
              textDecoration: "none",
              display: "block",
              textAlign: "center",
              marginTop: "var(--space-6)",
              letterSpacing: "0.02em",
            }}
          >
            {t("phone")}
          </a>
        </nav>
      </div>

      {/* Scoped CSS for responsive hide/show */}
      <style>{`
        .saxen-desktop-nav {
          display: none;
        }
        .saxen-mobile-controls {
          display: flex;
        }
        @media (min-width: 768px) {
          .saxen-desktop-nav {
            display: flex;
          }
          .saxen-mobile-controls {
            display: none;
          }
        }
        .saxen-desktop-nav a:hover { color: var(--color-accent-500) !important; }
        .saxen-phone-link:hover { color: var(--color-foreground) !important; }
      `}</style>
    </>
  );
}
