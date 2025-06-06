import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { Provider } from 'next-auth/providers';
import { db, selectUserByEmail } from '@beluga/db';
import bcrypt from 'bcryptjs';

type CredentialsType = {
    email: string;
    password: string;
};

const providers: Provider[] = [
    // Credentials({
    //     name: 'credentials',
    //     credentials: {
    //         email: { label: 'E-Mail', type: 'email' },
    //         password: { label: 'Password', type: 'password' }
    //     },
    //     async authorize(credentials) {
    //         if (!credentials) return null;
    //         const { email, password } = credentials as CredentialsType;

    //         console.log('credentials', credentials);

    //         const user = await db.query.users.findFirst({
    //             where: (u, { eq }) => eq(u.email, email)
    //         });
    //         if (!user) return null;
    //         if (!user?.hashedPassword) return null;

    //         const valid = await bcrypt.compare(password, user.hashedPassword);
    //         if (!valid) return null;

    //         return {
    //             ...user,
    //             emailVerified: null
    //         };
    //     }
    // }),
    GitHub({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!
    })
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers,
    pages: {
        signIn: '/signin',
        signOut: '/signout',
        error: '/error'
    },
    secret: process.env.AUTH_SECRET!,
    trustHost: true,
    callbacks: {
        async session({ session, token }) {
            if (session.user?.email) {
                const user = await selectUserByEmail(session.user.email);
                if (user) {
                    session.user = {
                        id: user.id,
                        name: user.name || session.user.name,
                        email: user.email || session.user.email,
                        image: user.image || session.user.image,
                        emailVerified: user.emailVerified || null
                    };
                }
            }
            return session;
        }
    }
});

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === 'function') {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    })
    .filter((provider) => provider.id !== 'credentials');
