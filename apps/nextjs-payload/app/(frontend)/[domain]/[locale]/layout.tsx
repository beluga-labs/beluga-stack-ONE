import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Locale } from '@beluga/translations/types';
import { getTranslations } from '@/lib/api/getTranslations';
import '@fontsource-variable/inter';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/700.css';
import '@fontsource/krona-one';
import type { Metadata } from 'next';
import './globals.css';
import { ReactScan } from '@/components/ReactScan';
import { LayoutProvider } from '@beluga/utils';
import ThemeProvider from '@/context/ThemeProvider';
import TranslationsProvider from '@/context/TranslationsProvider';

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

    const translations = await getTranslations();

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
                        <TranslationsProvider
                            translations={translations}
                            locale={locale}>
                            <Header locale={locale} />
                            {children}
                            {await Footer({ locale })}
                        </TranslationsProvider>
                    </LayoutProvider>
                </ThemeProvider>
                <ReactScan />
            </body>
        </html>
    );
}
