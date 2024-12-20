import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;
console.log(email,password,"tetetetetet")
        // Make API request to validate credentials (custom backend or authentication logic)
        const response = await fetch(`${process.env.NEXTAUTH_URL}/pages/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const user = await response.json();

        // If the authentication is successful
        if (response.ok && user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        // If authentication fails, throw error
        throw new Error("Invalid email or password");
      },
    }),
  ],
  // pages: {
  //   signIn: '/auth/login', // Custom login page
  //   error: '/auth/error',  // Custom error page
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
};
