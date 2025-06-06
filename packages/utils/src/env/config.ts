export const getPublicUrl = (): string =>
    process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
export const getDatabaseUrl = (): string => process.env.DATABASE_URL ?? '';
export const isProduction = (): boolean =>
    process.env.NODE_ENV === 'production';
