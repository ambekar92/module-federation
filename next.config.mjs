import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  reactStrictMode: false,  // Disable React Strict Mode
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
}

export default nextConfig
