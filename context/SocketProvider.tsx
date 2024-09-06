"use client";

import { IMessage } from "@/models/Message";
import React, { createContext, useEffect, useState } from "react";
import openSocket, { Socket } from "socket.io-client";

export const SocketContext = createContext<{
  socket: Socket | null;
  onlineUsers: string[];
}>({
  socket: null,
  onlineUsers: [],
});

interface Props {
  children: React.ReactNode;
  token: string;
}

const SocketWrapper: React.FC<Props> = ({ children, token }) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = openSocket(process.env.API as string, { query: { token } });
    setSocket(socket);

    socket.on("getOnlineUsers", users => {
      setOnlineUsers(users);
    });

    return () => {
      socket.close();
    };
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketWrapper;
