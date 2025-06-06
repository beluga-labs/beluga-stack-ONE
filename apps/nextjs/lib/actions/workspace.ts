'use server';

import { actionClient, ActionError } from '@/lib/actions/safe-action';
import { workspaceCreateSchema } from '../zod/workspace';
import { insertWorkspace } from '@beluga/db';
import { getCurrentUser } from '@/lib/api/user';
import type { workspaces } from '@beluga/db';

type Workspace = typeof workspaces.$inferSelect;

export const createWorkspace = actionClient
    .schema(workspaceCreateSchema)
    .action(async ({ parsedInput }): Promise<Workspace> => {
        const user = await getCurrentUser();
        if (!user?.id) {
            throw new ActionError('Not authenticated.');
        }

        try {
            const workspace = await insertWorkspace(parsedInput, user.id);
            return workspace;
        } catch (error) {
            console.error('Error creating workspace:', error);
            if (error instanceof ActionError) {
                throw error;
            }
            throw new ActionError('An error occurred. Please try again later.');
        }
    });
