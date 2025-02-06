import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
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
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
		],
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
		}
		return config;
	},
};

export default nextConfig;
