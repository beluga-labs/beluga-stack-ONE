'use client';

import { cn } from '@beluga/utils';
import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@beluga/ui';
import { useTranslation } from 'beluga-i18n';
import { LANGUAGES } from '@beluga/translations';

interface LanguageSwitchProps {
    className?: string;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ className }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useTranslation();

    const getPathWithoutLocale = () => {
        const segments = pathname.split('/');
        if (LANGUAGES.some((lang) => lang.code === segments[1])) {
            return '/' + segments.slice(2).join('/');
        }
        return pathname;
    };

    const currentLocale = pathname.split('/')[1];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-xs"
                    className={cn('', className)}
                    aria-label={t('LanguageSwitch.toggleLanguage')}
                    title={t('LanguageSwitch.toggleLanguage')}>
                    <Languages className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={currentLocale}
                    onValueChange={(value) =>
                        router.push(`/${value}${getPathWithoutLocale()}`)
                    }>
                    {LANGUAGES.map((lang) => (
                        <DropdownMenuRadioItem
                            key={lang.code}
                            value={lang.code}>
                            {lang.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { LanguageSwitch, type LanguageSwitchProps };
