import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * Saxen Frisør — Site Footer
 *
 * Design: S4 Architectural Line (0px radius, 1px hairline top border)
 * Color: C3 Ink + Cream — cream background, ink text
 * Layout: Two-column desktop (address+hours left, nav right)
 * NOT a five-column link-list footer
 *
 * Server component — no event handlers. Hover styles via CSS class.
 */
export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="saxen-footer">
      <style>{`
        .saxen-footer {
          background-color: var(--color-background);
          border-top: 1px solid var(--color-border);
          margin-top: var(--section-gap);
        }
        .saxen-footer__inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: var(--space-16) var(--container-padding);
        }
        .saxen-footer__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
        }
        @media (min-width: 768px) {
          .saxen-footer__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .saxen-footer__salon-name {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 400;
          color: var(--color-foreground);
          margin-bottom: var(--space-6);
          line-height: var(--leading-tight);
        }
        .saxen-footer address {
          font-style: normal;
          margin-bottom: var(--space-6);
        }
        .saxen-footer__addr-line {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-foreground);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-1);
          display: block;
        }
        .saxen-footer__addr-line--gap {
          margin-bottom: var(--space-4);
        }
        .saxen-footer__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-foreground);
          text-decoration: none;
          display: block;
          margin-bottom: var(--space-1);
          transition: color 150ms ease-out;
        }
        .saxen-footer__link:hover {
          color: var(--color-accent-500);
        }
        .saxen-footer__hours-block {
          border-top: 1px solid var(--color-border-subtle);
          padding-top: var(--space-6);
        }
        .saxen-footer__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }
        .saxen-footer__hours-line {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-foreground);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-1);
        }
        .saxen-footer__right {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }
        .saxen-footer__nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .saxen-footer__nav-list li {
          margin-bottom: var(--space-3);
        }
        .saxen-footer__nav-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-foreground);
          text-decoration: none;
          transition: color 150ms ease-out;
        }
        .saxen-footer__nav-link:hover {
          color: var(--color-accent-500);
        }
        .saxen-footer__book-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-accent-500);
          text-decoration: none;
          transition: color 150ms ease-out;
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
        }
        .saxen-footer__book-link:hover {
          color: var(--color-accent-400);
        }
        .saxen-footer__bottom {
          border-top: 1px solid var(--color-border-subtle);
          margin-top: var(--space-12);
          padding-top: var(--space-6);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
        }
        .saxen-footer__copyright {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--color-muted);
        }
        .saxen-footer__legal {
          display: flex;
          gap: var(--space-6);
        }
        .saxen-footer__legal-link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--color-muted);
          text-decoration: none;
          transition: color 150ms ease-out;
        }
        .saxen-footer__legal-link:hover {
          color: var(--color-foreground);
        }
      `}</style>

      <div className="saxen-footer__inner">
        {/* Two-column main content */}
        <div className="saxen-footer__grid">
          {/* Left: salon identity, address, hours */}
          <div>
            <p className="saxen-footer__salon-name">{t("salonName")}</p>

            <address>
              <span className="saxen-footer__addr-line">Jernbanegade 1</span>
              <span className="saxen-footer__addr-line saxen-footer__addr-line--gap">
                9800 Hjørring
              </span>
              <a href="tel:+4598920099" className="saxen-footer__link">
                {t("phone")}
              </a>
              <a
                href="mailto:susanne@karlborg.dk"
                className="saxen-footer__link"
              >
                {t("email")}
              </a>
            </address>

            {/* Opening hours */}
            <div className="saxen-footer__hours-block">
              <p className="saxen-footer__label">Åbningstider</p>
              <p className="saxen-footer__hours-line">{t("hours.weekdays")}</p>
              <p className="saxen-footer__hours-line">{t("hours.saturday")}</p>
            </div>
          </div>

          {/* Right: navigation + book online */}
          <div className="saxen-footer__right">
            <nav aria-label="Sidefødder navigation">
              <p className="saxen-footer__label">Navigation</p>
              <ul className="saxen-footer__nav-list">
                <li>
                  <Link href="/ydelser" className="saxen-footer__nav-link">
                    {t("nav.ydelser")}
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="saxen-footer__nav-link">
                    {t("nav.team")}
                  </Link>
                </li>
                <li>
                  <Link href="/om-os" className="saxen-footer__nav-link">
                    {t("nav.omOs")}
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="saxen-footer__nav-link">
                    {t("nav.kontakt")}
                  </Link>
                </li>
              </ul>
            </nav>

            <a
              href="https://saxenhjoerring.bestilling.nu"
              target="_blank"
              rel="noopener noreferrer"
              className="saxen-footer__book-link"
            >
              {t("bookOnline")}
              <span aria-hidden="true" style={{ fontSize: "0.75em" }}>
                ↗
              </span>
              <span style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>
                (åbner i nyt vindue)
              </span>
            </a>
          </div>
        </div>

        {/* Bottom: legal + copyright */}
        <div className="saxen-footer__bottom">
          <p className="saxen-footer__copyright">{t("copyright")}</p>
          <div className="saxen-footer__legal">
            <Link
              href="/cookie-politik"
              className="saxen-footer__legal-link"
            >
              {t("legal.cookies")}
            </Link>
            <Link
              href="/privatlivspolitik"
              className="saxen-footer__legal-link"
            >
              {t("legal.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
