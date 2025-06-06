'use client';

import {
    ThemeProvider as NextThemesProvider,
    ThemeProviderProps as NextThemesProviderProps
} from 'next-themes';

interface ThemeProviderProps extends NextThemesProviderProps {
    children: React.ReactNode[] | React.ReactNode;
}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
