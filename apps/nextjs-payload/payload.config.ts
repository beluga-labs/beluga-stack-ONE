import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { de } from '@payloadcms/translations/languages/de';
import { en } from '@payloadcms/translations/languages/en';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Media } from './collections/Media';
import { migrations } from './migrations';
import { Translations } from './globals/Translations';
import { Footer } from './globals/Footer';

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Media],
    globals: [Footer, Translations],
    localization: {
        locales: [
            {
                label: 'Deutsch',
                code: 'de'
            },
            {
                label: 'English',
                code: 'en'
            },
            {
                label: 'Français',
                code: 'fr'
            },
            {
                label: 'Español',
                code: 'es'
            }
        ],
        defaultLocale: 'de',
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
    secret: process.env.PAYLOAD_SECRET || '',
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL
        },
        prodMigrations: migrations,
        push: process.env.DATABASE_PUSH
            ? Boolean(process.env.DATABASE_PUSH)
            : false
    }),
    sharp
});
