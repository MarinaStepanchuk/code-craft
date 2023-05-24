/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    NEXTAUTH_SECRET: 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=',
    NEXTAUTH_URL: 'http://localhost:3000',
    GOOGLE_CLIENT_ID: '595028946356-fa0uleo17lpjjnuhf6o2bu6607b4cuhj.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    GITHUB_ID: ' Iv1.b86ccebf83a5caae',
    GITHUB_SECRET: '728e5412933ef656f7a1c522be3d44d6935d8c3f',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
