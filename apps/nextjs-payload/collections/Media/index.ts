import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: anyone,
        update: authenticated,
        delete: authenticated,
        create: authenticated
    },
    upload: {
        staticDir: 'data/payload/media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: undefined,
                position: 'centre'
            },
            {
                name: 'small',
                width: 768,
                height: undefined,
                position: 'centre'
            },
            {
                name: 'medium',
                width: 1024,
                height: undefined,
                position: 'centre'
            },
            {
                name: 'large',
                width: 1280,
                height: undefined,
                position: 'centre'
            },
            {
                name: 'extraLarge',
                width: 1536,
                height: undefined,
                position: 'centre'
            }
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*', 'video/*']
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: {
                de: 'Alternativtext',
                en: 'Alt Text'
            },
            localized: true,
            admin: {
                description: {
                    de: 'Ein alternativer Text für das Bild, falls dieses nicht angezeigt werden kann.',
                    en: 'An alternative text for the image, in case it cannot be displayed.'
                }
            }
        }
    ]
};
