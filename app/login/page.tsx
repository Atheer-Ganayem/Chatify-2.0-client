import Login from "@/components/auth/Login";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-full mt-10">
      <title>Chatify | Login</title>
      <Login />
    </div>
  );
}

export default page;
