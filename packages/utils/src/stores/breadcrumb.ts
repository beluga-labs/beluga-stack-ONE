import { create } from 'zustand';

// Types
export interface BreadcrumbItem {
    label: string;
    link?: string;
}

export interface Breadcrumb {
    id: string;
    items: BreadcrumbItem[];
}

interface BreadcrumbStore {
    breadcrumbs: Record<string, Breadcrumb>;
    workspaceBreadcrumb: BreadcrumbItem | null;

    // Actions
    setBreadcrumb: (id: string, items: BreadcrumbItem[]) => void;
    deleteBreadcrumb: (id: string) => void;
    getBreadcrumb: (id: string) => Breadcrumb | undefined;
}

// Create store
export const useBreadcrumbStore = create<BreadcrumbStore>((set, get) => ({
    breadcrumbs: {},
    workspaceBreadcrumb: null,

    setBreadcrumb: (id: string, items: BreadcrumbItem[]) => {
        set((state: BreadcrumbStore) => ({
            breadcrumbs: {
                ...state.breadcrumbs,
                [id]: { id, items }
            }
        }));
    },

    deleteBreadcrumb: (id: string) => {
        set((state: BreadcrumbStore) => {
            const newBreadcrumbs = { ...state.breadcrumbs };
            delete newBreadcrumbs[id];
            return { breadcrumbs: newBreadcrumbs };
        });
    },

    getBreadcrumb: (id: string) => {
        return get().breadcrumbs[id];
    }
}));
