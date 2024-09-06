import MainCard from "@/components/conversations/MainCard";
import ConversationLoader from "@/components/loaders/ConversationLoader";
import UserListLoader from "@/components/loaders/UserListLoader";
import LastMessageProvider from "@/context/LastMessagesProvider";
import SocketWrapper from "@/context/SocketProvider";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const layout = async ({
  chat,
  users,
}: Readonly<{
  chat: React.ReactNode;
  users: React.ReactNode;
}>) => {
  unstable_noStore();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const token = cookies().get("next-auth.session-token")?.value;

  return (
    <SocketWrapper token={token as string}>
      <LastMessageProvider>
        <MainCard>
          <Suspense fallback={<UserListLoader />}>{users}</Suspense>
          <Suspense fallback={<ConversationLoader />}>
            <div className="col-span-2">{chat}</div>
          </Suspense>
        </MainCard>
      </LastMessageProvider>
    </SocketWrapper>
  );
};

export default layout;
