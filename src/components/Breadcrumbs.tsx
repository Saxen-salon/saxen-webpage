import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { JsonLd } from "./JsonLd";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useTranslations("header");

  const allCrumbs: Crumb[] = [{ label: t("home"), href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allCrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: crumb.href } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
        <ol className="flex items-center gap-2">
          {allCrumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-neutral-300">
                  /
                </span>
              )}
              {crumb.href && i < allCrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-neutral-800 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-neutral-700">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
