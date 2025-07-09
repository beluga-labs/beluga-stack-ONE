export const getAppUrl = (): string =>
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const getDatabaseUrl = (): string => process.env.DATABASE_URL ?? '';

export const getGitHubClientId = (): string =>
    process.env.GITHUB_CLIENT_ID ?? '';
export const getGitHubClientSecret = (): string =>
    process.env.GITHUB_CLIENT_SECRET ?? '';

export const getSmtpHost = (): string => process.env.SMTP_HOST ?? '';
export const getSmtpPort = (): string => process.env.SMTP_PORT ?? '';
export const getSmtpUser = (): string => process.env.SMTP_USER ?? '';
export const getSmtpPassword = (): string => process.env.SMTP_PASSWORD ?? '';

export const getMailSenderAddress = (): string =>
    process.env.MAIL_SENDER_ADDRESS ?? '';
export const getMailSenderName = (): string =>
    process.env.MAIL_SENDER_NAME ?? '';

export const isProduction = (): boolean =>
    process.env.NODE_ENV === 'production';
