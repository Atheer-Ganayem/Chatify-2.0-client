"use server";

import Conversation from "@/models/Conversation";
import User from "@/models/User";
import authOptions from "@/utils/authOptions";
import connectDB from "@/utils/connectDB";
import { notAuthenticated, notFound, Res, serverSideError } from "@/utils/http-helpers";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createConveration(targetUserId: string): Promise<Res> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return notAuthenticated();
    }

    await connectDB();

    const targetUser = await User.findById(targetUserId).select("_id");
    if (!targetUser) {
      return notFound();
    }

    const exestingConversation = await Conversation.findOne({
      participants: { $all: [session.user.id, targetUser.id] },
    });
    if (exestingConversation) {
      return { ok: false, code: 422, message: "Conversation already exists." };
    }

    await Conversation.create({ participants: [session.user.id, targetUser._id] });

    revalidatePath("/chat");

    return { ok: true, code: 201, message: "Converation has been created successfully." };
  } catch (error) {
    return serverSideError();
  }
}
