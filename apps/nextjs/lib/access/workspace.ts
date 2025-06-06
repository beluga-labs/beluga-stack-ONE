import { redirect } from 'next/navigation';
import { getUserWorkspaces } from '@/lib/api/user';
import { requireAuth, type RequireAuthOptions } from './auth';

export interface RequireWorkspaceOptions extends RequireAuthOptions {
    workspaceId: string;
}

/**
 * Requires user authentication and workspace access.
 * Redirects to signin if not authenticated or to workspaces if no access.
 */
export async function requireWorkspaceAccess({
    locale,
    workspaceId,
    callbackUrl
}: RequireWorkspaceOptions) {
    const user = await requireAuth({ locale, callbackUrl });

    if (!user.id) {
        redirect(`/${locale}/signin`);
    }

    const userWorkspaces = await getUserWorkspaces(user.id);

    const hasAccess = userWorkspaces?.some(
        (workspace) => workspace.workspace.id === workspaceId
    );

    if (!hasAccess) {
        redirect(`/${locale}/account/workspaces`);
    }

    return { user, userWorkspaces };
}
