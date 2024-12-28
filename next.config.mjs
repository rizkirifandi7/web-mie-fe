/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
};

export default nextConfig;
