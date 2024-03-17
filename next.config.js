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
                    { key: 'Pragma', value: 'no-cache' },
                ],
            },
        ]
    },
    webpack: (config, options) => {
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'home',
                    filename: 'static/chunks/remoteEntry.js',
                    remotes: {
                        main: 'main@http://localhost:8081/_next/static/chunks/remoteEntry.js',
                        entity_application:
                            'entity_application@http://localhost:8082/_next/static/chunks/remoteEntry.js',
                        evaluation:
                            'evaluation@http://localhost:8083/_next/static/chunks/remoteEntry.js',
                        helpdesk:
                            'helpdesk@http://localhost:8084/_next/static/chunks/remoteEntry.js',
                        user: 'user@http://localhost:8085/_next/static/chunks/remoteEntry.js',
                        admin: 'admin@http://localhost:8086/_next/static/chunks/remoteEntry.js',
                        field_operation:
                            'field_operation@http://localhost:8087/_next/static/chunks/remoteEntry.js',
                    },
                    exposes: {
                        './home': './src/pages/index.tsx',
                        './home-protected': './src/pages/home.tsx',
                        './nav': './src/pages/navbar.tsx',
                        './login': './src/pages/login.tsx',
                        './profile': './src/pages/profile.tsx',
                    },
                    shared: {
                        react: {
                            eager: true,
                            requiredVersion: '^18.2.0',
                        },
                        'react-dom': {
                            eager: true,
                            requiredVersion: '^18.2.0',
                        },
                        next: {
                            eager: true,
                            requiredVersion: '13.5.6',
                        },
                    },
                })
            )
        }
        return config
    },
}

module.exports = nextConfig
