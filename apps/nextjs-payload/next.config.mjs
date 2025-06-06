import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost'
            }
        ]
    },
    output: 'standalone',
    experimental: {
        reactCompiler: false
    },
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    transpilePackages: ['@beluga/design-system', '@beluga/ui']
};

export default withPayload(nextConfig);
