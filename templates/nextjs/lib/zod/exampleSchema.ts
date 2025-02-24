import { z } from 'zod';

export const exampleSchema: any = z.object({
    name: z
        .string({
            required_error: ''
        })
        .min(1, {
            message: ''
        })
});
