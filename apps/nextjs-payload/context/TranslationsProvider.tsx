'use client';

import {
    TranslationsProvider as BelugaTranslationsProvider,
    TranslationsProviderProps as BelugaTranslationsProviderProps
} from 'beluga-i18n';

interface TranslationsProviderProps extends BelugaTranslationsProviderProps {
    children: React.ReactNode[] | React.ReactNode;
}

const TranslationsProvider = ({
    children,
    ...props
}: TranslationsProviderProps) => {
    return (
        <BelugaTranslationsProvider {...props}>
            {children}
        </BelugaTranslationsProvider>
    );
};

export default TranslationsProvider;
