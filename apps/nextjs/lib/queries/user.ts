import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getUserWorkspaces } from '@/lib/api/user';
import type { users } from '@beluga/db';

export type User = typeof users.$inferSelect;

export const userKeys = {
    all: ['user'] as const,
    current: () => [...userKeys.all, 'current'] as const,
    detail: (id: string) => [...userKeys.all, id] as const,
    workspaces: (userId: string) =>
        [...userKeys.all, 'workspaces', userId] as const
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: userKeys.current(),
        queryFn: getCurrentUser
    });
};

export const useUserWorkspaces = (userId: string) => {
    return useQuery({
        queryKey: userKeys.workspaces(userId),
        queryFn: () => getUserWorkspaces(userId),
        enabled: !!userId
    });
};
