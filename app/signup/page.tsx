import Signup from "@/components/auth/Signup";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-full mt-10 p-4">
      <title>Chatify | Signup</title>
      <Signup />
    </div>
  );
}

export default page;
