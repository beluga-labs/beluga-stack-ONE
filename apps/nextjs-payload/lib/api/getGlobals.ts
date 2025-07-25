import type { Config } from '@/payload-types';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import { PayloadLocale } from '@/types/PayloadLocale';

type Global = keyof Config['globals'];

async function getGlobal(slug: Global, depth = 0, locale?: PayloadLocale) {
    const payload = await getPayload({ config: configPromise });

    const global = await payload.findGlobal({
        slug,
        depth,
        locale,
        fallbackLocale: 'de'
    });

    return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (
    slug: Global,
    depth = 0,
    locale?: PayloadLocale
) =>
    unstable_cache(async () => getGlobal(slug, depth, locale), [slug], {
        tags: [`global_${slug}`]
    });
