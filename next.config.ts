import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { resolve } from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const projectRoot = resolve(import.meta.dirname);

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    // Starter CSP — tighten per-site based on actual script/style sources needed.
    // The web-designer agent should adjust this when adding third-party scripts.
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config) => {
    // Ensure CSS @import "tailwindcss" resolves from the project's node_modules,
    // even if the dev server is started from a parent directory.
    config.resolve.modules = [
      resolve(projectRoot, 'node_modules'),
      ...(config.resolve.modules || ['node_modules']),
    ];
    return config;
  },
};

export default withNextIntl(nextConfig);
