"use client";

import { IMessage } from "@/models/Message";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import SendMessageInput from "./SendMessageInput";
import { fetchMessages } from "@/actions/Message";
import { useSession } from "next-auth/react";

interface Props {
  initMessages: IMessage[];
  conversationId: string;
  token: string;
}

const ConversationContainer: React.FC<Props> = ({ conversationId, initMessages, token }) => {
  const [messages, setMessages] = useState<IMessage[]>(initMessages);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMessages(conversationId, session?.user.id as string);
      if (response.ok) {
        setMessages(response.messages);
      }
    };
    fetchData();
  }, [conversationId, session?.user.id]);

  return (
    <>
      <Messages messages={messages} conversationId={conversationId} setMessages={setMessages} />
      <SendMessageInput token={token as string} setMessages={setMessages} />
    </>
  );
};

export default ConversationContainer;
