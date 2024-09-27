import path from 'path'
import { fileURLToPath } from 'url'
import createNextJsObfuscator from 'nextjs-obfuscator';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const withNextJsObfuscator = createNextJsObfuscator(
  {
    // Options for javascript-obfuscator
    compact: true,
    controlFlowFlattening: true,
    deadCodeInjection: true,
    disableConsoleOutput: process.env.NODE_ENV === 'production' ? true : false, // Disable console output in production
  },
  {
    // Options for nextjs-obfuscator
    enabled: process.env.NODE_ENV === 'production', // Enable obfuscation only in production
    patterns: ['./**/*.(js|jsx|ts|tsx)'], // Files to obfuscate
  }
);

/** @type {import('next').NextConfig} */
const nextConfig = withNextJsObfuscator({
  reactStrictMode: true,
  productionBrowserSourceMaps: false,  // Disable source maps in production
  optimization: {
    minimize: true
  },
  swcMinify: true,  // Enable SWC-based minification
  async redirects() {
    return [
      {
        source: '/help',
        destination: 'https://sbaone.atlassian.net/servicedesk/customer/portal/13', // Replace this with the URL where you want to redirect
        permanent: true, // This can be set to true for a 308 permanent redirect or false for a 307 temporary redirect
      },
      {
        source: '/kb',
        destination: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/overview?homepageId=3085172979e', // Replace this with the URL where you want to redirect
        permanent: true, // This can be set to true for a 308 permanent redirect or false for a 307 temporary redirect
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'styles', 'helpers'),
      path.join(__dirname, 'styles', 'components'),
      path.join(__dirname, 'styles', 'base'),
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',  // or 'origin-when-cross-origin'
          },
        ],
      },
      {
        // Apply HSTS headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // 2 years
          },
        ],
      },
      {
        source: "/(.*)", // Apply globally
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Change the policy as needed
          },
        ],
      },
    ]
  },
});

export default nextConfig
