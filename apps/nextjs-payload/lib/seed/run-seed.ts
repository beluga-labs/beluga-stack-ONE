import { getPayload } from 'payload';
import config from '@payload-config';

import { users, translations } from './seed-data.json';

async function run() {
    try {
        const payload = await getPayload({ config });

        for (const user of users) {
            await payload.create({
                collection: 'users',
                data: user
            });
        }

        // await payload.updateGlobal({
        //     slug: 'translations',
        //     data: {
        //         de: translations.de,
        //         en: translations.en
        //     }
        // })
    } catch (error) {
        console.error(JSON.stringify(error));
        process.exit(1);
    }

    process.exit(0);
}

await run();
