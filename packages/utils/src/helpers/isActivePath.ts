export type IsActivePathProps = {
    isLastKey?: boolean;
    isExactPath?: boolean;
    pathname: string;
    pathKey?: string;
    url?: string;
};

/**
 * Checks if a given path matches the current pathname
 * @param props Configuration object for path matching
 * @returns boolean indicating if the path is active
 */
export const isActivePath = ({
    pathname,
    url,
    pathKey,
    isLastKey,
    isExactPath
}: IsActivePathProps): boolean => {
    // Validate required parameters
    if (!pathname) {
        return false;
    }

    if (isExactPath && !url) {
        return false;
    }

    if (!isExactPath && !pathKey) {
        return false;
    }

    // Split pathname into segments
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Check path based on configuration
    if (isLastKey) {
        return lastSegment === pathKey;
    }

    if (isExactPath) {
        return pathname === url;
    }

    return pathSegments.includes(pathKey!);
};
