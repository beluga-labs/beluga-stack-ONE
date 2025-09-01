import { domainRouter } from '@/lib/middleware/domainRouter';
import { i18nRouter } from '@/lib/middleware/i18nRouter';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const i18nRedirectResponse = i18nRouter(request);

    if (i18nRedirectResponse) {
        return i18nRedirectResponse;
    }

    const domainRewriteResponse = domainRouter(request);

    return domainRewriteResponse;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|public|images|videos|favicon.ico|icon.png|icon.svg|apple-icon.png|manifest.json|sw.js).*)'
    ]
};
