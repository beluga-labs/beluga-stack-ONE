import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { PayloadLocale, TranslationsProvider } from '@beluga/translations';
import '@fontsource-variable/inter';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/700.css';
import '@fontsource/krona-one';
import type { Metadata } from 'next';
import './globals.css';
import { ReactScan } from '@/components/ReactScan';

export const metadata: Metadata = {
    title: 'beluga stack 2025',
    description: ''
};

type Args = {
    params: Promise<{ locale?: PayloadLocale }>;
    children: React.ReactNode;
};

export default async function RootLayout({
    params: paramsPromise,
    children
}: Args): Promise<JSX.Element> {
    const { locale = 'de' } = await paramsPromise;

    const translations = {};

    return (
        <html
            lang={locale}
            suppressHydrationWarning>
            <body
                className={`
                scroll-smooth w-full antialiased
                bg-gray-bg
                antialiased
                min-w-full
                min-h-full
                font-body
                `}>
                <TranslationsProvider
                    translations={translations}
                    locale={locale}>
                    <Header locale={locale} />
                    {children}
                    {await Footer({ locale })}
                </TranslationsProvider>
                <ReactScan />
            </body>
        </html>
    );
}
