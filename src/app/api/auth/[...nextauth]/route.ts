import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string,
          password: string,
        };
        
        const res = await fetch("http://localhost:3001/api/login", {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        if (res.ok && user) {
          return user
        };

        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string
    // })
  ],
  pages: {
    signIn: "/signin" 
  },
  callbacks: {
    async signIn({ user, account }) {
      if(account?.provider === 'google') {
        await fetch("http://localhost:3001/api/register-google", {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            id: user.id
          }),
          headers: { "Content-Type": "application/json" }
        })
      }
      return true;
    },
    async jwt({ token, user }) {
      return {...token, ...user}
    },
    async session({ session, token }) {
      const activeSession = session;
      activeSession.user = token;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
