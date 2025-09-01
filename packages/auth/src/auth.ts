import { db } from '@beluga/db';
import { getGitHubClientId, getGitHubClientSecret } from '@beluga/utils/env';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { multiSession } from 'better-auth/plugins';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        usePlural: true
    }),
    advanced: {
        cookiePrefix: 'linqy'
    },
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: getGitHubClientId() as string,
            clientSecret: getGitHubClientSecret() as string
        }
    },
    plugins: [multiSession(), nextCookies()]
});
