'use client';

import { setCookie, getCookie } from '../helpers';
import { COOKIE_KEYS } from '../constants';
import { create } from 'zustand';

interface LayoutState {
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    hydrate: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
    sidebarCollapsed: false, // Default-Wert für SSR
    toggleSidebar: () =>
        set((state) => {
            const newState = !state.sidebarCollapsed;
            setCookie(COOKIE_KEYS.SIDEBAR_COLLAPSED, String(newState));
            return { sidebarCollapsed: newState };
        }),
    setSidebarCollapsed: (collapsed) => {
        setCookie(COOKIE_KEYS.SIDEBAR_COLLAPSED, String(collapsed));
        set({ sidebarCollapsed: collapsed });
    },
    hydrate: () => {
        const cookieValue = getCookie(COOKIE_KEYS.SIDEBAR_COLLAPSED);
        set({ sidebarCollapsed: cookieValue === 'true' });
    }
}));
