import { Patch } from '@/constants/common.constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();
        console.log(res.status, user);

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string
    // })
  ],
  pages: {
    signIn: Patch.signIn,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const result = await fetch('http://localhost:3001/api/register-provider', {
          method: 'POST',
          body: JSON.stringify({
            email: encodeURIComponent(user.email as string),
            id: user.id,
            avatarUrl: user.image,
            provider: account?.provider,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (result.status !== 200) {
          return false;
        }
      }

      // if (account?.provider === 'github') {
      //   const result = await fetch("http://localhost:3001/api/register-provider", {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       email: encodeURIComponent(user.email as string),
      //       id: user.id,
      //       avatarUrl: user.image,
      //       provider: account?.provider
      //     }),
      //     headers: { "Content-Type": "application/json" }
      //   })

      //   if (result.status !== 200) {
      //     return false;
      //   }
      // }

      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const activeSession = session;
      activeSession.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
