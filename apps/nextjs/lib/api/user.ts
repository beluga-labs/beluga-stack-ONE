'use server';

import { auth } from '@beluga/auth';
import { selectUserById, selectUserWorkspacesByUserId } from '@beluga/db';

export const getCurrentUser = async () => {
    try {
        const session = await auth();
        if (!session?.user) {
            return null;
        }

        return session.user;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await selectUserById(userId);
        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

export const getUserWorkspaces = async (userId: string) => {
    try {
        const userWorkspaces = await selectUserWorkspacesByUserId(userId);
        if (!userWorkspaces) {
            return null;
        }

        return userWorkspaces.workspaces;
    } catch (error) {
        console.error('Error fetching user workspaces:', error);
        return null;
    }
};
