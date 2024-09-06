import NextAuth, { DefaultSession } from "next-auth";
import authOptions from "@/utils/authOptions";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
