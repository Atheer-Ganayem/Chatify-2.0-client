import List from "@/components/conversations/List";
import Conversation from "@/models/Conversation";
import authOptions from "@/utils/authOptions";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const UserListParallelRoute = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  await connectDB();
  const conversations = await Conversation.find({ participants: session.user.id })
    .populate({
      path: "participants",
      select: "name avatar",
    })
    .populate({ path: "lastMessage", populate: { path: "sender", select: "name createdAt" } })
    .sort({ updatedAt: -1 })
    .lean();

  return (
    <div>
      <List conversations={conversations} />
    </div>
  );
};

export default UserListParallelRoute;
