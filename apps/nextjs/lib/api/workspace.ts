'use server';

import { selectWorkspaceById } from '@beluga/db';

export const getWorkspace = async (workspaceId: string) => {
    try {
        const workspace = await selectWorkspaceById(workspaceId);
        if (!workspace) {
            return null;
        }

        return workspace;
    } catch (error) {
        console.error('Error fetching user workspaces:', error);
        return null;
    }
};
