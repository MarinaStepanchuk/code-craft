/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    NEXTAUTH_SECRET: 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=',
    NEXTAUTH_URL: 'http://localhost:3000/',
    GOOGLE_CLIENT_ID: '612507440008-spufflq47211eticd78bq304875gc3cl.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    GITHUB_ID: 'Iv1.b86ccebf83a5caae',
    GITHUB_SECRET: '728e5412933ef656f7a1c522be3d44d6935d8c3f',
    API_URL: 'http://localhost:3001/api',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '*/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '*/**',
      },
    ],
  },
};

module.exports = nextConfig;
