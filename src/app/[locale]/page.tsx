import { setRequestLocale } from "next-intl/server";

// Starter page — replaced by web-designer agent during the build pipeline
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl font-bold mb-4">
          Website Redesign Kit
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Your project is ready. Open Claude Code and type <code className="bg-neutral-100 px-2 py-1 rounded">/redesign</code> to start the full pipeline.
        </p>
        <p className="text-sm text-neutral-400">
          The pipeline will analyze your brand, plan the site, establish a design system, and build every page.
        </p>
      </div>
    </div>
  );
}
