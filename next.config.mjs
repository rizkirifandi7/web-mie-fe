/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/beranda",
				permanent: true,
			},
		];
	},
	images: {
		domains: ["localhost"],
	},
};

export default nextConfig;

