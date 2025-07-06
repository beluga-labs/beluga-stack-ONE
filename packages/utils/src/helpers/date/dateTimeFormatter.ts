import { Locale } from '@beluga/translations';
import { format, Locale as DateFnsLocale } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

const localeMap: Record<Locale, DateFnsLocale> = {
    de: de,
    en: enUS
};

export const df = (props: {
    value?: string | Date | null;
    format?: string;
    locale?: Locale;
    prefix?: string;
    suffix?: string;
}) => {
    const {
        value,
        format: formatString = 'dd.MM.yyyy',
        locale,
        prefix = '',
        suffix = ''
    } = props;

    if (!value) {
        return null;
    }

    const dateToFormat = new Date(value);

    if (isNaN(dateToFormat.getTime())) {
        console.warn('Invalid date provided to df:', value);
        return `${prefix}${suffix}`;
    }

    const localeToUse = locale && localeMap[locale] ? localeMap[locale] : enUS;

    try {
        const formattedDate = format(dateToFormat, formatString, {
            locale: localeToUse
        });

        return `${prefix}${formattedDate}${suffix}`;
    } catch (error) {
        console.error('Error formatting date:', {
            message: (error as Error).message,
            value,
            formatString,
            locale
        });

        return `${prefix}${suffix}`;
    }
};
