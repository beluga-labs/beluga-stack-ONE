// Name processing utilities
type NameOperation = 'initials' | 'firstName';

export const processName = (
    name: string,
    operationType: NameOperation
): string => {
    // Split name into words and remove empty strings
    const words = name.trim().split(/\s+/).filter(Boolean);

    switch (operationType) {
        case 'initials':
            if (words.length === 1) {
                // Return first two letters if only one word
                return words[0].slice(0, 2).toUpperCase();
            }
            // Return first letter of first and last word
            return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();

        case 'firstName':
            // Return first word
            return words[0];

        default:
            return name;
    }
};
