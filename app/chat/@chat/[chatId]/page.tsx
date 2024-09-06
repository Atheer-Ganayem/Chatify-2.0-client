import connectDB from "@/utils/connectDB";
import { cookies } from "next/headers";
import Message from "@/models/Message";
import ConversationContainer from "@/components/conversations/ConversationContainer";
import Conversation from "@/models/Conversation";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import { isValidObjectId } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { unstable_noStore } from "next/cache";

const page = async ({ params }: { params: { chatId: string } }) => {
  unstable_noStore();
  const session = await getServerSession(authOptions);
  if (!session || !isValidObjectId(params.chatId)) {
    redirect("/login");
  }

  await connectDB();
  const conversation = await Conversation.findById(params.chatId);
  if (
    !conversation ||
    (conversation.participants[0].toString() !== session.user.id &&
      conversation.participants[1].toString() !== session.user.id)
  ) {
    notFound();
  }

  const messages = await Message.find({ conversationId: params.chatId })
    .populate({
      path: "sender",
      select: "name avatar",
    })
    .lean();

  const token =
    cookies().get("__Secure-next-auth.session-token")?.value ||
    cookies().get("next-auth.session-token")?.value;

  return (
    <div className="h-[80vh] flex flex-col justify-between">
      <ConversationContainer
        conversationId={params.chatId}
        initMessages={messages}
        token={token as string}
      />
    </div>
  );
};

export default page;
