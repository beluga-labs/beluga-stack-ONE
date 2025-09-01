import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import {
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid
} from 'drizzle-orm/pg-core';
import { users } from './auth';
import { workspaces } from './workspaces';

export const usersToWorkspaces = pgTable(
    'users_to_workspaces',
    {
        workspaceId: uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id, { onDelete: 'cascade' }),

        userId: text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),

        assignedAt: timestamp('assigned_at', { withTimezone: true })
            .defaultNow()
            .notNull()
    },
    (table) => [primaryKey({ columns: [table.userId, table.workspaceId] })]
);

export const usersToWorkspacesRelations = relations(
    usersToWorkspaces,
    ({ one }) => ({
        workspace: one(workspaces, {
            fields: [usersToWorkspaces.workspaceId],
            references: [workspaces.id]
        }),
        user: one(users, {
            fields: [usersToWorkspaces.userId],
            references: [users.id]
        })
    })
);

export type SelectUserToWorkspace = InferSelectModel<typeof usersToWorkspaces>;
export type InsertUserToWorkspace = InferInsertModel<typeof usersToWorkspaces>;
