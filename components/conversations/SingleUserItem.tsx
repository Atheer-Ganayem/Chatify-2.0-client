"use client";

import { LastMessagesContext } from "@/context/LastMessagesProvider";
import { SocketContext } from "@/context/SocketProvider";
import { IMessage } from "@/models/Message";
import { IUser } from "@/models/User";
import { getDate } from "@/utils/get-date";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

interface Props {
  avatar: string;
  name: string;
  lastMessage: IMessage;
  userId: string;
  cnvId: string;
}

const SingleUserItem: React.FC<Props> = props => {
  const { chatId } = useParams();
  const { getLastMessage } = useContext(LastMessagesContext);
  const { onlineUsers } = useContext(SocketContext);
  const lastMessage = getLastMessage(props.cnvId) || props.lastMessage;

  return (
    <Link href={`/chat/${props.cnvId}`}>
      <li
        className={`${
          chatId === props.cnvId && "bg-neutral-200 dark:bg-neutral-700"
        } flex items-center justify-between p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer duration-200`}
      >
        <div className="flex items-center gap-4">
          <Avatar
            src={process.env.AWS + "chatify-2.0/" + props.avatar}
            size="lg"
            color={onlineUsers.includes(props.userId) ? "success" : "danger"}
            isBordered
          />
          <div>
            <h3 className="font-bold text-lg">{props.name}</h3>
            {lastMessage && (
              <>
                <p className="text-xs text-foreground-600">
                  {(lastMessage.sender as unknown as IUser).name}:{" "}
                  {lastMessage.content.length < 25
                    ? lastMessage.content
                    : lastMessage.content.slice(0, 25) + "..."}
                </p>
                <p className="text-xs text-foreground-600">
                  {getDate(new Date(lastMessage.createdAt))}
                </p>
              </>
            )}
          </div>
        </div>
      </li>
    </Link>
  );
};

export default SingleUserItem;
