/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	images: {
		unoptimized: true, // necessary for static site generation
	},
	trailingSlash: true,
};

export default nextConfig;
