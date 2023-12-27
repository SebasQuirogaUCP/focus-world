import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET_ID ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user, session, trigger }) {
      if (user) {
        return {
          ...token,
          userId: user.id,
        };
      }
      return { ...token, userId: undefined };
    },

    async session({ session, token, user }) {
      return session;
    },
  },
  // pages: {
  //   signIn: "/",
  // },
  session: {
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
