import ChangeAvatar from "@/components/profiile/ChangeAvatar";
import ChangeEmail from "@/components/profiile/ChangeEmail";
import ChangeName from "@/components/profiile/ChangeName";
import ChangePassword from "@/components/profiile/ChangePassword";
import User from "@/models/User";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const user = await User.findById(session.user.id).select("-password").lean();
  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-full mt-10 p-4">
      <title>Chatify | Profile</title>
      <ChangeAvatar initAvatar={user.avatar} />
      <ChangeName />
      <ChangeEmail />
      <ChangePassword />
    </div>
  );
}

export default page;
