import NextAuth from "next-auth/next";
import AuthOptions from "next-auth/next"
import type { AuthOptions as NextAuthOptions } from "next-auth/next"

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials-provider-practice",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;
        const response = await fetch(`${process.env.NEXTAUTH_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const user = await response.json();

        if (response.ok && user) {
          // Return user object for the session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
};
