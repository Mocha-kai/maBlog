import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

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
        async jwt({ token, profile, account }) {
        if (account?.provider === 'github' && profile) {
            const githubProfile = profile as { id: number };
            token.isAdmin =
            githubProfile.id === Number(process.env.GITHUB_ADMIN_ID);
        }

        // 👇 이미 설정된 값 유지
        token.isAdmin = token.isAdmin ?? false;

        return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.isAdmin = token.isAdmin as boolean;
            }
            return session;
        },
    },


    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };


//https://api.github.com/users/Mocha-kai