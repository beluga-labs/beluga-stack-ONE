import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { de } from '@payloadcms/translations/languages/de';
import { en } from '@payloadcms/translations/languages/en';
import { getDatabaseUrl, getPayloadSecret } from '@beluga/utils/env';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Media } from './collections/Media';
import { migrations } from './migrations';
import { Translations } from './globals/Translations';
import { Footer } from './globals/Footer';
import { DEFAULT_LOCALE, LOCALES } from '@beluga/translations';

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Media],
    globals: [Footer, Translations],
    localization: {
        locales: LOCALES,
        defaultLocale: DEFAULT_LOCALE,
        fallback: true
    },
    i18n: {
        supportedLanguages: { en, de },
        fallbackLanguage: 'de',
        translations: {
            de: {
                lin: {
                    unlock: 'Entsperren',
                    lock: 'Sperren'
                }
            },
            en: {
                lin: {
                    unlock: 'Unlock',
                    lock: 'Lock'
                }
            }
        }
    },
    secret: getPayloadSecret() || '',
    db: postgresAdapter({
        pool: {
            connectionString: getDatabaseUrl()
        },
        prodMigrations: migrations,
        push: false
    }),
    sharp
});
