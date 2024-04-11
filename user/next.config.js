/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const NextFederationPlugin = require('@module-federation/nextjs-mf')

const nextConfig = {
   async headers() {
      return [
         {
            source: '/:path*',
            headers: [
               { key: 'Cache-Control', value: 'no-store' },
               { key: 'Pragma', value: 'no-cache' }
            ]
         }
      ]
   },
   webpack: (config, options) => {
      ;(config.output.publicPath = `http://localhost:8084/_next/static/${options.isServer ? 'ssr' : 'chunks'}/`),
         (config.output.clean = true),
         config.plugins.push(
            new NextFederationPlugin({
               name: 'user',
               filename: `static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
               exposes: {
                  './User': './pages/index'
               },
               shared: {}
            })
         )
      return config
   }
}

module.exports = nextConfig
