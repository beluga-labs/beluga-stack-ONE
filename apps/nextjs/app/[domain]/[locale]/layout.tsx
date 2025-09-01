import Header from '@/components/Header';
import { ReactScan } from '@/components/ReactScan';
import QueryProvider from '@/context/QueryProvider';
import ThemeProvider from '@/context/ThemeProvider';
import ToasterProvider from '@/context/ToasterProvider';
import TranslationsProvider from '@/context/TranslationsProvider';
import {
    de as deTranslations,
    en as enTranslations
} from '@beluga/translations';
import { Locale } from '@beluga/translations/types';
import { LayoutProvider } from '@beluga/utils';
import '@fontsource-variable/inter';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/700.css';
import '@fontsource/krona-one';
import './globals.css';
import { Metadata } from 'next/dist/types';

export const metadata: Metadata = {
    title: 'beluga stack 2025',
    description: ''
};

type Args = {
    params: Promise<{ locale?: Locale }>;
    children: React.ReactNode;
};

export default async function RootLayout({
    params: paramsPromise,
    children
}: Args): Promise<JSX.Element> {
    const { locale = 'de' } = await paramsPromise;

    const translations = {
        de: deTranslations,
        en: enTranslations
    };

    return (
        <html
            lang={locale}
            suppressHydrationWarning>
            <body
                className={`
                scroll-smooth w-full antialiased
                bg-zinc-50
                dark:bg-zinc-950
                antialiased
                min-w-full
                min-h-full
                font-body
                `}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <LayoutProvider>
                        <QueryProvider>
                            <TranslationsProvider
                                translations={translations}
                                locale={locale}>
                                <Header locale={locale} />
                                {children}
                                <ToasterProvider />
                            </TranslationsProvider>
                        </QueryProvider>
                    </LayoutProvider>
                </ThemeProvider>
                <ReactScan />
            </body>
        </html>
    );
}
