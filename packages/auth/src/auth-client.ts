import { createAuthClient } from 'better-auth/react';
import { multiSession } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';

export const authClient = createAuthClient({
    plugins: [multiSession(), nextCookies()]
});

authClient.$store.listen('$sessionSignal', async () => {});
