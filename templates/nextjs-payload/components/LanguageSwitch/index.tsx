'use client';

import { cn } from '@beluga/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface LanguageSwitchProps {
    locale?: string;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
    locale: currentLocale
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const locales = [
        { code: 'de', label: 'DE' },
        { code: 'en', label: 'EN' }
    ];

    let sanitizedPathname: string | null = pathname;

    if (locales.some((locale) => pathname?.startsWith('/' + locale.code))) {
        sanitizedPathname = pathname?.slice(3) || '';
    }

    return (
        <ul className="flex align-center">
            {locales.map((locale, index) => {
                const active = currentLocale === locale.code;
                return (
                    <li
                        key={index}
                        className="relative block after:content-[''] after:absolute after:-right-0 after:top-1/2 after:translate-x-1/2 after:-translate-y-1/2 after:w-0.5 after:h-[70%] after:bg-gray-400 last:after:hidden">
                        <Link
                            href={`/${locale.code}${sanitizedPathname}${searchParams ? '?' + searchParams : ''}`}
                            className={cn(
                                'text-base text-gray-500 hover:text-gray-400 px-1.5 md:py-1.5',
                                active &&
                                    'text-primary hover:text-primary hover:pointer-events-none'
                            )}>
                            {locale.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default LanguageSwitch;
