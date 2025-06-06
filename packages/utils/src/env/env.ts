import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    NEXT_PUBLIC_URL: z.string().url().optional(),
    DATABASE_URL: z.string().optional()
});

export const getEnv = () => {
    try {
        return envSchema.parse(process.env);
    } catch (error) {
        console.warn('Environment variables could not be validated:', error);
        return {
            NODE_ENV: process.env.NODE_ENV ?? 'development',
            NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
            DATABASE_URL: process.env.DATABASE_URL
        };
    }
};
