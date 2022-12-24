import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

/*
 *
 * GUARD
 *
 */
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw new Error("Failed to initialize Google authentication");

/*
 *
 * NEXT AUTH OPTIONS
 *
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.email,
      },
    }),
  },
};

export default NextAuth(authOptions);
