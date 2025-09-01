import { LANGUAGES } from '../languages';

export type Language = (typeof LANGUAGES)[number];
export type Locale = (typeof LANGUAGES)[number]['code'];
export type PayloadLocale =
    | (typeof LANGUAGES)[number]['code']
    | 'all'
    | 'id'
    | undefined;
