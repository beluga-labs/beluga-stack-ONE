export const META_TITLE_APP_NAME = 'beluga';
export const META_TITLE_APP_NAME_DIVIDER = ' | ';
export const META_TITLE_APP_NAME_POSITION = 'end'; // start | end
export const META_TITLE_PAGES_DIVIDER = ' – ';

export const metaTitleGenerator = (
    pages: string[],
    options?: {
        appName?: string;
        appNameDivider?: string;
        appNamePosition?: 'start' | 'end';
        pagesDivider?: string;
    }
): string => {
    const appName = options?.appName ?? META_TITLE_APP_NAME;
    const appNameDivider =
        options?.appNameDivider ?? META_TITLE_APP_NAME_DIVIDER;
    const appNamePosition =
        options?.appNamePosition ?? META_TITLE_APP_NAME_POSITION;
    const pagesDivider = options?.pagesDivider ?? META_TITLE_PAGES_DIVIDER;

    const pagesString = pages.join(pagesDivider);

    if (appNamePosition == 'start') {
        return appName + appNameDivider + pagesString;
    }

    if (appNamePosition == 'end') {
        return pagesString + appNameDivider + appName;
    }

    throw Error('Error executing metaTitleGenerator.');
};
