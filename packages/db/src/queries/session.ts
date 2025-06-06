import { eq, and, gt } from 'drizzle-orm';
import { sessions } from '../schema/auth';
import { db } from '../index';

export async function selectSessionsByUserId(userId: string) {
    return await db.select().from(sessions).where(eq(sessions.userId, userId));
}

export async function selectActiveSessionsByUserId(userId: string) {
    const now = new Date();
    return await db
        .select()
        .from(sessions)
        .where(and(eq(sessions.userId, userId), gt(sessions.expires, now)));
}
