import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './auth';
import { workspaces } from './workspace';

export const usersToWorkspaces = pgTable('user_to_workspace', {
    workspaceId: text('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});

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
