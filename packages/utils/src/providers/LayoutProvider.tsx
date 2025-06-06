'use client';

import { useLayoutEffect } from 'react';
import { useLayoutStore } from '../stores';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const hydrateLayout = useLayoutStore(
        (state: { hydrate: any }) => state.hydrate
    );

    useLayoutEffect(() => {
        hydrateLayout();
    }, [hydrateLayout]);

    return <>{children}</>;
};
