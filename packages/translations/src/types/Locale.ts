import { LANGUAGES } from '../languages';

export type Locale = (typeof LANGUAGES)[number]['code'];
