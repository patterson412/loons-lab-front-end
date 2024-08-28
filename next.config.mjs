/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'openweathermap.org',
                port: '',
                pathname: '/img/wn/**',
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
