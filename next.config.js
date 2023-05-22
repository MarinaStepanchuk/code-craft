/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_CLIENT_ID: '595028946356-fa0uleo17lpjjnuhf6o2bu6607b4cuhj.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    GITHUB_ID: 'Iv1.b86ccebf83a5caae',
    GITHUB_SECRET: 'c03dba81b0519c5dd9ac3ed3e6de437bc93efb78',
  },
};

module.exports = nextConfig;
