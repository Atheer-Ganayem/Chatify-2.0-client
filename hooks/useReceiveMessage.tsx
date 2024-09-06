"use client";

import { LastMessagesContext } from "@/context/LastMessagesProvider";
import { SocketContext } from "@/context/SocketProvider";
import { useToast } from "@/context/ToastContext";
import { IMessage } from "@/models/Message";
import { IUser } from "@/models/User";
import { useContext, useEffect, useState } from "react";

type HookType = () => {
  latestMessage: IMessage | null;
};

export const useReceiveMessage: HookType = () => {
  const { socket } = useContext(SocketContext);
  const [latestMessage, setLatestMessages] = useState<IMessage | null>(null);
  const { insertLastMessage } = useContext(LastMessagesContext);
  const { addToast } = useToast();

  useEffect(() => {
    socket?.on("newMessage", (data: { message: IMessage; chatId: string }) => {
      setLatestMessages(data.message);
      insertLastMessage(data.message);
      addToast(`${(data.message.sender as unknown as IUser).name}: ${data.message.content}`);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, insertLastMessage, addToast]);

  return { latestMessage };
};
