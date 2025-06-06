import { getWorkspace } from '@/lib/api/workspace';
import type { workspaces } from '@beluga/db';
import { useQuery } from '@tanstack/react-query';

export type Workspace = typeof workspaces.$inferSelect;

export const workspaceKeys = {
    all: ['workspace'] as const,
    current: () => [...workspaceKeys.all, 'current'] as const,
    detail: (id: string) => [...workspaceKeys.all, id] as const
};

export const useWorkspace = (workspaceId: string) => {
    return useQuery({
        queryKey: workspaceKeys.detail(workspaceId),
        queryFn: () => getWorkspace(workspaceId)
    });
};
