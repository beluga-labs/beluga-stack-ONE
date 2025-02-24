export type IsActivePathProps = {
    isLastKey?: boolean;
    isExactPath?: boolean;
    pathname: string;
    pathKey?: string;
    url?: string;
};

export const isActivePath = ({
    pathname,
    url,
    pathKey,
    isLastKey,
    isExactPath
}: IsActivePathProps) => {
    const pathnames = pathname.split('/');
    const lastPathname = pathnames.slice(-1);

    let isActive;
    if (isLastKey) {
        isActive = lastPathname[0] == pathKey ? true : false;
    } else if (isExactPath) {
        isActive = pathname == url ? true : false;
    } else {
        isActive = pathnames.includes(pathKey!);
    }

    return isActive;
};
