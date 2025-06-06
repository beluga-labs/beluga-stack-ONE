import { getCachedGlobal } from './getGlobals';

export const getTranslations = async () => {
    const data: any = await getCachedGlobal('translations', 2)();

    const translations = { de: data.de, en: data.en };

    return translations;
};
