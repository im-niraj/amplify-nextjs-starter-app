import { prismaDB } from "@/lib/connect";
import { cryptoAuth, random } from "@/lib/cryptoAuth";
import { JWT, NextAuthOptions, Session, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        let auth = await prismaDB.authentication.findUnique({ where: { email: credentials.email } });
        if (!auth) {
          throw new Error("Invalid Email ID");
        }
        const expectedHash = cryptoAuth(auth.salt, credentials.password);
        if (auth.password !== expectedHash) {
          throw new Error("Invalid credentials");
        }
        let salt = random();
        let user = await prismaDB.user.findUnique({ where: { authenticationId: auth.id } });
        if (!user) {
          throw new Error("Record not found for this credential");
        }
        let updated = await prismaDB.authentication.update({ where: { id: auth.id }, data: { sessionToken: cryptoAuth(salt, user.id) } });
        if (updated) {
          let data = {
            id: user.id,
            name: { firstName: user.firstName, lastName: user.lastName },
            email: auth.email,
            image: user.image,
            role: auth.role,
            designation: user.designation,
            token: updated.sessionToken,
          };
          return data as User;
        } else {
          throw new Error("Session token not updated, Server Error!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin-login",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = token.user;
        if (token.user?.token) {
          session.token = token.user?.token;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
