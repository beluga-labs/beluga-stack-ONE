'use server';

import { signIn, signOut as signOutAuth } from '@beluga/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

const SIGNIN_ERROR_URL = '/error';

export async function signInWithCredentials(formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
        }
        throw error;
    }
}

export async function signInWithProvider(
    providerId: string,
    callbackUrl?: string
) {
    try {
        await signIn(providerId, {
            redirectTo: callbackUrl ?? '/account/workspaces'
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
        }
        throw error;
    }
}

export async function signOut() {
    try {
        await signOutAuth();
    } catch (error) {
        console.error(error);
    }
}
