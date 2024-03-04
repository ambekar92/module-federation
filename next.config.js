/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig
