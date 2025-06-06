'use client';

interface CookieOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

const defaultOptions: CookieOptions = {
    path: '/',
    secure: true,
    sameSite: 'Strict'
};

export const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }

    return undefined;
};

export const setCookie = (
    name: string,
    value: string,
    options: CookieOptions = {}
): void => {
    if (typeof document === 'undefined') return;

    const mergedOptions = { ...defaultOptions, ...options };
    let cookieString = `${name}=${value}`;

    if (mergedOptions.path) cookieString += `; path=${mergedOptions.path}`;
    if (mergedOptions.domain)
        cookieString += `; domain=${mergedOptions.domain}`;
    if (mergedOptions.maxAge)
        cookieString += `; max-age=${mergedOptions.maxAge}`;
    if (mergedOptions.expires)
        cookieString += `; expires=${mergedOptions.expires.toUTCString()}`;
    if (mergedOptions.secure) cookieString += '; secure';
    if (mergedOptions.sameSite)
        cookieString += `; samesite=${mergedOptions.sameSite.toLowerCase()}`;

    document.cookie = cookieString;
};

export const deleteCookie = (
    name: string,
    options: CookieOptions = {}
): void => {
    const mergedOptions = { ...defaultOptions, ...options };
    setCookie(name, '', { ...mergedOptions, maxAge: -1 });
};
