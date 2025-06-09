export interface Language {
    code: string;
    label: string;
    default?: boolean;
}

export const LANGUAGES: Language[] = [
    { code: 'de', label: 'Deutsch', default: true },
    { code: 'en', label: 'English' }
];
export const LOCALES = LANGUAGES.map((lang: Language) => lang.code);
export const DEFAULT_LOCALE =
    LANGUAGES.find((lang: Language) => lang.default)?.code || 'de';
