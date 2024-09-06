import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/chat");
  } else {
    redirect("/login");
  }

  return <div>Hello</div>;
}
