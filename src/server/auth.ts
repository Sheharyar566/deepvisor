import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { hash, verify } from "@node-rs/argon2";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            email: email as string,
          },
        });

        if (!user) {
          throw new Error("User not found");
        } else if (!user.password) {
          throw new Error("This email is already attached to another account. Please check other login options");
        }

        const isMatching = await verify(user.password, password as string);

        if (!isMatching) {
          throw new Error("Invalid password");
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  }
})