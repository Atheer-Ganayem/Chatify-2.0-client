"use client";

import { useReceiveMessage } from "@/hooks/useReceiveMessage";
import { IMessage } from "@/models/Message";
import { IUser } from "@/models/User";
import { getDate } from "@/utils/get-date";
import { Avatar, Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";

interface Props {
  messages: IMessage[];
  conversationId: string;
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const Messages: React.FC<Props> = ({ messages, setMessages, conversationId }) => {
  const session = useSession();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { latestMessage } = useReceiveMessage();

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (latestMessage !== null && latestMessage.conversationId.toString() === conversationId) {
      setMessages(prev => [...prev, latestMessage]);
    }
  }, [latestMessage, conversationId, setMessages]);

  return (
    <div className="p-3 overflow-y-scroll">
      {messages.map(msg => (
        <Card
          key={msg.id}
          className={`p-2 my-5 max-w-[80%] w-4/5 lg:w-fit ${
            (msg.sender as unknown as IUser)._id === session.data?.user.id
              ? "dark:bg-primary bg-primary-500 text-white ms-auto"
              : "dark:bg-foreground-100 bg-foreground-200"
          }`}
        >
          <div className="lg:flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Avatar
                src={process.env.AWS + "chatify-2.0/" + (msg.sender as unknown as IUser).avatar}
                size="sm"
              />
              <h1 className="font-bold lg:text-xl">{(msg.sender as unknown as IUser).name}</h1>
            </div>
            <span className="px-2">{getDate(new Date(msg.createdAt))}</span>
          </div>
          <div className="p-2">
            {msg.content.split("\n").map((line, index) => (
              <p
                key={`line-${index}-${conversationId}`}
                className="break-words whitespace-pre-wrap"
              >
                {line === "" ? <br /> : line}
              </p>
            ))}
          </div>
        </Card>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Messages;
