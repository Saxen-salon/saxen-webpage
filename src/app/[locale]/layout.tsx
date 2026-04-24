import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentGate } from "@/components/ConsentGate";
import { SITE_URL } from "@/lib/site-config";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Saxen Frisør — Hjørring",
    template: "%s | Saxen Frisør",
  },
  description:
    "Saxens frisørsalon i Hjørring. Book online eller ring på 98 92 00 99. Fuldt prisoverslag på alle ydelser.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "Saxen Frisør",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HairSalon"],
  "@id": `${SITE_URL}/#organization`,
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
  priceRange: "180–1590 kr",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${playfairDisplay.variable} ${workSans.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationSchema} />
          {/* Skip-to-content — visually hidden until focused */}
          <a href="#main-content" className="skip-to-content">
            Spring til indhold
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
        {/* Analytics only renders when user has consented to analytics cookies */}
        <ConsentGate category="analytics">
          <Analytics />
        </ConsentGate>
      </body>
    </html>
  );
}
