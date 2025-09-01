'use server';

import { auth } from '@beluga/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export interface RequireAuthOptions {
    locale?: string;
    callbackUrl?: string;
}

/**
 * Requires user authentication.
 * Redirects to signin if not authenticated.
 */
export async function requireAuth({ locale, callbackUrl }: RequireAuthOptions) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        const url = locale ? `/${locale}/signin` : '/signin';
        const searchParams = new URLSearchParams();
        if (callbackUrl) {
            searchParams.set('callbackUrl', callbackUrl);
        }
        redirect(`${url}?${searchParams.toString()}`);
    }

    return session.user;
}
