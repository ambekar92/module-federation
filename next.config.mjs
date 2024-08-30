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
    ];
  },
  eslint: {
    // This allows the build to complete even with ESLint errors.
    ignoreDuringBuilds: true,
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
    ]
  },
}

export default nextConfig
