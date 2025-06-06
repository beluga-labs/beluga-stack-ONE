'use client';

import { cn } from '@beluga/utils';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@beluga/ui';
import { useTranslation } from 'beluga-i18n';
import { useState, useEffect } from 'react';

interface ThemeSwitchProps {
    className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon-xs"
                className={cn('', className)}
                aria-label={t('theme.change-theme')}
                title={t('theme.change-theme')}>
                <Sun className="size-4" />
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-xs"
                    className={cn('', className)}
                    aria-label={t('theme-switch.toggle-theme')}
                    title={t('theme-switch.toggle-theme')}>
                    {theme === 'light' && <Sun className="size-4" />}
                    {theme === 'dark' && <Moon className="size-4" />}
                    {theme === 'system' && <Monitor className="size-4" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">
                        <Sun className="size-4 mr-2" />
                        {t('theme.light')}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                        <Moon className="size-4 mr-2" />
                        {t('theme.dark')}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                        <Monitor className="size-4 mr-2" />
                        {t('theme.system')}
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { ThemeSwitch, type ThemeSwitchProps };
