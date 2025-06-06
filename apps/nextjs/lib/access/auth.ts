import { auth } from '@beluga/auth';
import { redirect } from 'next/navigation';

export interface RequireAuthOptions {
    locale: string;
    callbackUrl?: string;
}

/**
 * Requires user authentication.
 * Redirects to signin if not authenticated.
 */
export async function requireAuth({ locale, callbackUrl }: RequireAuthOptions) {
    const session = await auth();

    if (!session?.user?.id) {
        const url = `/${locale}/signin`;
        const searchParams = new URLSearchParams();
        if (callbackUrl) {
            searchParams.set('callbackUrl', callbackUrl);
        }
        redirect(`${url}?${searchParams.toString()}`);
    }

    return session.user;
}
