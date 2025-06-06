import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['de', 'en'];
let defaultLocale = 'de';

function getLocale(request: any) {
    let negotiator = new Negotiator(request);
    let languages = negotiator.language(locales);
    return match(languages, locales, defaultLocale);
}

export function middleware(request: any) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return Response.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|admin|assets|public|images|videos|favicon.ico|icon.png|icon.svg|apple-icon.png|manifest.json|sw.js).*)'
    ]
};
