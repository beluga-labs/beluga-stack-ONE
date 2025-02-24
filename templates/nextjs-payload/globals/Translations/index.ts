import type { GlobalConfig } from 'payload';
import { revalidateTranslations } from './hooks/revalidateTranslations';

export const Translations: GlobalConfig = {
    slug: 'translations',
    label: {
        de: 'Globale Übersetzungen',
        en: 'Global translations'
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: {
                        de: 'Deutsch',
                        en: 'German'
                    },
                    fields: [
                        {
                            name: 'de',
                            type: 'json',
                            label: ''
                        }
                    ]
                },
                {
                    label: {
                        de: 'Englisch',
                        en: 'English'
                    },
                    fields: [
                        {
                            name: 'en',
                            type: 'json',
                            label: ''
                        }
                    ]
                }
            ]
        }
    ],
    hooks: {
        afterChange: [revalidateTranslations]
    }
};
