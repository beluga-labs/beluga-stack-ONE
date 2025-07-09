import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { usersToWorkspaces } from './users-to-workspaces';

export const workspaces = pgTable('workspaces', {
    id: text('id')
        .primaryKey()
        .notNull()
        .default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    description: text('description'),
    image: text('image'),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
    members: many(usersToWorkspaces)
}));
