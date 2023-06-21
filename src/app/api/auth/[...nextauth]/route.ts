import { Patch } from '@/constants/common.constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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

        const res = await fetch('https://nisnas.synology.me:3001/apiv3/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await res.json();

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
  ],
  pages: {
    signIn: Patch.signIn,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const result = await fetch('https://nisnas.synology.me:3001/apiv3/register-provider', {
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

      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const activeSession = session;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      activeSession.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

declare module 'next-auth' {
  interface Session {
    user: {
      avatarUrl: string | null;
      bio: string | null;
      bookmarks: string | null;
      email: string;
      id: string;
      instagram: string | null;
      mail: string | null;
      name: string | null;
      twitter: string | null;
    };
  }
}

export { handler as GET, handler as POST };
