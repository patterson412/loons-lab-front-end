/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'openweathermap.org',
                pathname: '/**',
            },
        ],
    },
    env: {
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        API_KEY: process.env.API_KEY,
    },
};

export default nextConfig;
