import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    error: "/", // 내가 아닐떄는 그냥 원래대로
  },
  callbacks: {
    async signIn({ user, profile }) {
      const myEmail = "kai@mocha-company.com";
      // GitHub는 이메일이 null일 수 있음.
      const email =
        user?.email ||
        profile?.email ||
        null;

      if (!email) return false; // 이메일 없는 계정 로그인 차단

      return email === myEmail;
    },

    async session({ session }) {
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
