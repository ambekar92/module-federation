import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'styles', 'helpers'),
      path.join(__dirname, 'styles', 'components'),
      path.join(__dirname, 'styles', 'base'),
    ],
  },
}

export default nextConfig
