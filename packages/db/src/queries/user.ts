import { db } from '../index';

export async function selectUserById(id: string) {
    return db.query.users.findFirst({
        where: (u, { eq }) => eq(u.id, id),
        columns: {
            id: true,
            email: true,
            name: true,
            image: true,
            emailVerified: true
        }
    });
}

export async function selectUserByEmail(email: string) {
    return db.query.users.findFirst({
        where: (u, { eq }) => eq(u.email, email),
        columns: {
            id: true,
            email: true,
            name: true,
            image: true,
            emailVerified: true
        }
    });
}

export async function selectUserWorkspacesByUserId(userId: string) {
    return db.query.users.findFirst({
        where: (u, { eq }) => eq(u.id, userId),
        with: {
            workspaces: {
                with: {
                    workspace: {
                        columns: {
                            id: true,
                            name: true,
                            description: true,
                            image: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    }
                }
            }
        }
    });
}
