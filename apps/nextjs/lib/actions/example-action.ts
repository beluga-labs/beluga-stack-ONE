'use server';

import { actionClient } from '@/lib/actions/safe-action';
import { exampleSchema } from '@/lib/zod/exampleSchema';

export const exampleAction = actionClient
    .schema(exampleSchema)
    .action(async ({ parsedInput }) => {
        return {
            success: true,
            data: parsedInput
        };
    });
