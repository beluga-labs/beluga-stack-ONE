'use server';

import {
    selectActiveSessionsByUserId,
    selectSessionsByUserId
} from '@beluga/db';

export const getActiveUserSessions = async (userId: string) => {
    try {
        const sessions = await selectActiveSessionsByUserId(userId);

        console.log('sessions', sessions);
        if (!sessions) {
            return null;
        }

        return sessions;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        return null;
    }
};

export const getUserSessions = async (userId: string) => {
    try {
        const sessions = await selectSessionsByUserId(userId);

        console.log('sessions', sessions);
        if (!sessions) {
            return null;
        }

        return sessions;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        return null;
    }
};
