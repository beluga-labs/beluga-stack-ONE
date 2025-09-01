import { WorkspaceCreateInput } from '@/lib/zod/workspace';
import { db } from '../index';
import { usersToWorkspaces } from '../schema/users-to-workspaces';
import { workspaces } from '../schema/workspaces';

export async function selectWorkspaceById(id: string) {
    return db.query.workspaces.findFirst({
        where: (w, { eq }) => eq(w.id, id),
        columns: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export async function insertWorkspace(
    workspace: WorkspaceCreateInput,
    userId: string
) {
    return db.transaction(async (tx) => {
        const [newWorkspace] = await tx
            .insert(workspaces)
            .values({
                name: workspace.name,
                description: workspace.description || null
            })
            .returning();

        await tx.insert(usersToWorkspaces).values({
            workspaceId: newWorkspace.id,
            userId: userId
        });

        return newWorkspace;
    });
}
