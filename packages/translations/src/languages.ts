export interface Language {
    code: string;
    label: string;
    default?: boolean;
}

export const LANGUAGES: Language[] = [
    { code: 'en', label: 'English', default: true },
    { code: 'de', label: 'Deutsch' }
];
export const LOCALES = LANGUAGES.map((lang: Language) => lang.code);
export const DEFAULT_LOCALE =
    LANGUAGES.find((lang: Language) => lang.default)?.code || 'en';
