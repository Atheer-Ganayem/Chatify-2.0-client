"use client";

import { IMessage } from "@/models/Message";
import React, { createContext, useState } from "react";
type LastMessage = { [key: string]: IMessage };

export const LastMessagesContext = createContext<{
  lastMessages: LastMessage;
  insertLastMessage: (message: IMessage) => void;
  getLastMessage: (cnvId: string) => IMessage | undefined;
}>({
  lastMessages: {},
  insertLastMessage: (message: IMessage) => {},
  getLastMessage: (cnvId: string) => {
    return undefined;
  },
});

interface Props {
  children: React.ReactNode;
}

const LastMessageProvider: React.FC<Props> = ({ children }) => {
  const [lastMessages, setLastMessages] = useState<LastMessage>({});

  function insertLastMessage(message: IMessage) {
    setLastMessages(prev => {
      const copy = { ...prev };
      copy[message.conversationId.toString()] = message;
      return copy;
    });
  }

  function getLastMessage(cnvId: string): IMessage | undefined {
    return lastMessages[cnvId];
  }

  return (
    <LastMessagesContext.Provider
      value={{
        lastMessages,
        getLastMessage,
        insertLastMessage,
      }}
    >
      {children}
    </LastMessagesContext.Provider>
  );
};

export default LastMessageProvider;
