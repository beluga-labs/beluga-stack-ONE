import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

import { LOCALES, DEFAULT_LOCALE } from '@beluga/translations';

export const locales = LOCALES;
export const defaultLocale = DEFAULT_LOCALE;

function getLocaleFromRequest(request: NextRequest): string {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => {
        negotiatorHeaders[key] = value;
    });
    const negotiator = new Negotiator({ headers: negotiatorHeaders });
    const languages = negotiator.languages(locales);
    return match(languages, locales, defaultLocale);
}

export function i18nRouter(request: NextRequest): NextResponse | null {
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/').filter(Boolean);

    const currentLocaleSegment = segments[0];
    const pathnameHasLocale = locales.includes(currentLocaleSegment);

    if (pathnameHasLocale) {
        return null;
    }

    const localeToRedirectTo = getLocaleFromRequest(request);

    const pathWithoutLocaleGuess = pathname.startsWith('/')
        ? pathname.substring(1)
        : pathname;
    const reconstructedPath = pathWithoutLocaleGuess
        .split('/')
        .filter((segment) => !locales.includes(segment))
        .join('/');

    const url = new URL(
        `/${localeToRedirectTo}/${reconstructedPath}`,
        request.url
    );
    url.search = request.nextUrl.search;

    return NextResponse.redirect(url);
}
