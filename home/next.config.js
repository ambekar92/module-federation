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
      ;(config.output.publicPath = `http://localhost:8080/_next/static/${options.isServer ? 'ssr' : 'chunks'}/`),
         config.plugins.push(
            new NextFederationPlugin({
               name: 'home',
               filename: `remoteEntry.js`,
               exposes: {
                  './Home': './pages/index',
                  './Home-protected': './pages/home',
                  './Nav': './components/layout/Navbar',
                  './Login': './pages/login',
                  './Profile': './pages/profile',
                  './Button': './components/Buttons/Button'
               },
               shared: {}
            })
         )
      return config
   }
}

module.exports = nextConfig
