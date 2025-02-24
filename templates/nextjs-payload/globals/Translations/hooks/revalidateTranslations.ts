import type { GlobalAfterChangeHook } from 'payload';

import { revalidateTag } from 'next/cache';

export const revalidateTranslations: GlobalAfterChangeHook = ({
    doc,
    req: { payload, context }
}) => {
    if (!context.disableRevalidate) {
        payload.logger.info(`Revalidating translations`);

        revalidateTag('global_translations');
    }

    return doc;
};
