"use server";

import Conversation from "@/models/Conversation";
import Message, { IMessage } from "@/models/Message";
import connectDB from "@/utils/connectDB";
import { notFound, redirect } from "next/navigation";

export async function fetchMessages(
  cnvId: string,
  userId: string
): Promise<{ ok: boolean; messages: IMessage[] }> {
  try {
    await connectDB();
    const conversation = await Conversation.findById(cnvId);
    if (
      !conversation ||
      (conversation.participants[0].toString() !== userId &&
        conversation.participants[1].toString() !== userId)
    ) {
      notFound();
    }

    const messages = await Message.find({ conversationId: cnvId })
      .populate({
        path: "sender",
        select: "name avatar",
      })
      .lean();

    return { ok: true, messages };
  } catch (error) {
    return { ok: false, messages: [] };
  }
}
