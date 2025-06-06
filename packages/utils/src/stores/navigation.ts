import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isActivePath } from '../helpers/isActivePath';
import type {
    NavigationState,
    NavigationActions,
    NavigationElement,
    NavigationGroup,
    NavigationItem
} from '../types/navigation';

// Navigation structure with translation keys
const initialElements: NavigationElement[] = [
    {
        id: 'dashboard',
        labelKey: 'workspace-navigation.dashboard.label',
        icon: 'LayoutDashboard',
        items: [
            {
                id: 'overview',
                labelKey: 'workspace-navigation.dashboard.overview',
                href: '/dashboard',
                icon: 'ChartNoAxesGantt'
            },
            {
                id: 'ai-insights',
                labelKey: 'workspace-navigation.dashboard.ai-insights',
                href: '/ai-insights',
                icon: 'Brain'
            }
        ]
    },
    {
        id: 'brand-management',
        labelKey: 'workspace-navigation.brand-management.label',
        icon: 'Crown',
        items: [
            {
                id: 'monitoring-and-perception',
                labelKey:
                    'workspace-navigation.brand-management.monitoring-and-perception',
                href: '/monitoring-and-perception',
                icon: 'SquareActivity'
            },
            {
                id: 'community-and-moderation',
                labelKey:
                    'workspace-navigation.brand-management.community-and-moderation',
                href: '/community-and-moderation',
                icon: 'ShieldAlert'
            },
            {
                id: 'content-and-campaigns',
                labelKey:
                    'workspace-navigation.brand-management.content-and-campaigns',
                href: '/content-and-campaigns',
                icon: 'NotepadText'
            },
            {
                id: 'ai-brand-analysis',
                labelKey:
                    'workspace-navigation.brand-management.ai-brand-analysis',
                href: '/ai-brand-analysis',
                icon: 'ChartNoAxesCombined'
            }
        ]
    },
    {
        id: 'creators-and-cooperations',
        labelKey: 'workspace-navigation.creators-and-cooperations.label',
        icon: 'Contact',
        items: [
            {
                id: 'find-creators',
                labelKey:
                    'workspace-navigation.creators-and-cooperations.find-creators',
                href: '/find-creators',
                icon: 'UserSearch'
            },
            {
                id: 'cooperations-and-campaigns',
                labelKey:
                    'workspace-navigation.creators-and-cooperations.cooperations-and-campaigns',
                href: '/cooperations-and-campaigns',
                icon: 'NotepadText'
            },
            {
                id: 'competition-and-market',
                labelKey:
                    'workspace-navigation.creators-and-cooperations.competition-and-market',
                href: '/competition-and-market',
                icon: 'ChartNoAxesCombined'
            }
        ]
    }
];

export const useNavigationStore = create<NavigationState & NavigationActions>()(
    persist(
        (set, get) => ({
            // State
            elements: initialElements,
            collapsedGroups: [],
            sidebarCollapsed: false,

            // Actions
            toggleGroup: (groupId: string) => {
                const { collapsedGroups } = get();
                set({
                    collapsedGroups: collapsedGroups.includes(groupId)
                        ? collapsedGroups.filter((id) => id !== groupId)
                        : [...collapsedGroups, groupId]
                });
            },

            toggleSidebar: () => {
                set((state) => ({
                    sidebarCollapsed: !state.sidebarCollapsed
                }));
            },

            setActivePath: (pathname: string) => {
                set((state) => ({
                    elements: state.elements.map((element) => {
                        if ('items' in element) {
                            // NavigationGroup
                            return {
                                ...element,
                                items: element.items.map((item) => ({
                                    ...item,
                                    active: isActivePath({
                                        pathname,
                                        pathKey: item.id
                                    })
                                }))
                            };
                        } else {
                            // NavigationItem
                            return {
                                ...element,
                                active: isActivePath({
                                    pathname,
                                    pathKey: element.id
                                })
                            };
                        }
                    })
                }));
            }
        }),
        {
            name: 'navigation-storage',
            partialize: (state) => ({
                collapsedGroups: state.collapsedGroups,
                sidebarCollapsed: state.sidebarCollapsed
            })
        }
    )
);
