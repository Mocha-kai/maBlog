import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { env } from 'process';

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    pages: {
        error: '/',
    },
    callbacks: {
        async signIn({ user, profile }) {
            const myEmail = env.GIT_EMAIL;

            const email = user?.email || profile?.email || null;

            if (!email) return false;

            return email === myEmail;
        },

        async session({ session }) {
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
