"use client";

import { IConversation } from "@/models/Conversation";
import { IUser } from "@/models/User";
import React, { useContext, useState } from "react";
import SingleUserItem from "./SingleUserItem";
import { IMessage } from "@/models/Message";
import { useSession } from "next-auth/react";
import Input from "../ui/Input";
import { LastMessagesContext } from "@/context/LastMessagesProvider";

interface Props {
  conversations: IConversation[];
}

const List: React.FC<Props> = ({ conversations }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: session } = useSession();
  const { getLastMessage } = useContext(LastMessagesContext);

  conversations.sort(
    (a, b) =>
      new Date(
        getLastMessage(b._id as string)?.createdAt ||
          (b.lastMessage as unknown as IMessage)?.createdAt ||
          b.createdAt
      ).getTime() -
      new Date(
        getLastMessage(a._id as string)?.createdAt ||
          (a.lastMessage as unknown as IMessage)?.createdAt ||
          a.createdAt
      ).getTime()
  );

  return (
    <div className="border-r-2 border-r-foreground-300 h-[80vh] flex flex-col">
      <div className="p-2">
        <Input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
      </div>
      <ul className="overflow-y-scroll">
        {conversations
          .filter(cnv => {
            const otherUserIndex = cnv.participants.findIndex(
              (user: IUser) => (user._id as any).toString() !== session?.user.id
            );

            return cnv.participants[otherUserIndex].name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map(cnv => {
            const otherUserIndex = cnv.participants.findIndex(
              (user: IUser) => (user._id as any).toString() !== session?.user.id
            );

            return (
              <SingleUserItem
                key={cnv._id as string}
                userId={cnv.participants[otherUserIndex]._id as string}
                avatar={cnv.participants[otherUserIndex].avatar}
                name={cnv.participants[otherUserIndex].name}
                lastMessage={cnv.lastMessage as unknown as IMessage}
                cnvId={cnv._id as string}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default List;
