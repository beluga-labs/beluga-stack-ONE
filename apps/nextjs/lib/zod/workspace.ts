import { z } from 'zod';

export const workspaceCreateSchema = z.object({
    name: z.string().min(3, 'Name muss mindestens 3 Zeichen lang sein'),
    description: z.string().optional()
});

export type WorkspaceCreateInput = z.infer<typeof workspaceCreateSchema>;
