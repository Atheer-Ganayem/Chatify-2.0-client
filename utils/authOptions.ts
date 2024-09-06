import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./connectDB";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import User from "@/models/User";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _req) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }

          const isPwMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isPwMatch) {
            return null;
          }

          return {
            email: user.email,
            name: user.name,
            id: user.id,
            avatar: user.avatar,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session.token) {
          token.avatar = session.avatar;
        }
        if (session.name) {
          token.name = session.name;
        }
        if (session.email) {
          token.email = session.email;
        }
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.id = token.id as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
  },
  secret: process.env.authSecret,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
