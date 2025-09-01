import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18nRouter';

export function domainRouter(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/').filter(Boolean);
    const hostname = request.headers.get('host');

    if (!hostname) {
        console.warn(
            'DomainRouter: Hostname not found in request headers. Rewriting to /not-found.'
        );
        return NextResponse.rewrite(new URL('/not-found', request.url));
    }

    // Determine the path that remains after potential locale identification
    let pathAfterLocale = '';
    let initialLocaleSegment: string | undefined;
    let pathSegmentsToKeep: string[] = [];

    // Check if the first segment of the *original* URL is a locale (e.g., /en/path)
    if (segments.length > 0 && locales.includes(segments[0])) {
        initialLocaleSegment = segments[0];
        pathSegmentsToKeep = segments.slice(1);
    } else {
        pathSegmentsToKeep = segments;
    }

    pathAfterLocale = pathSegmentsToKeep.join('/');

    // Construct the internal rewrite URL: /[hostname (as domain)]/[locale]/[restOfPath]
    // The locale must always be present in the internal path for Next.js routing.
    const finalInternalLocale = initialLocaleSegment || defaultLocale;

    // Use the hostname directly as the domain segment)
    const cleanHostname = hostname.split(':')[0];

    let internalPath = `/${cleanHostname}/${finalInternalLocale}`;
    if (pathAfterLocale) {
        internalPath += `/${pathAfterLocale}`;
    }

    const rewriteUrl = new URL(internalPath, request.url);
    rewriteUrl.search = request.nextUrl.search;

    console.log(
        `DomainRouter: Rewriting from "${request.url}" to internal "${rewriteUrl.pathname}${rewriteUrl.search}" using hostname "${cleanHostname}" as domain.`
    );
    return NextResponse.rewrite(rewriteUrl);
}
