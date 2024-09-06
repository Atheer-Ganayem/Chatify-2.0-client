"use client";

import React, { useContext, useRef, useState } from "react";
import { Textarea } from "@nextui-org/react";
import { SendHorizonal } from "lucide-react";
import { useParams } from "next/navigation";
import { IMessage } from "@/models/Message";
import FormBtn from "../ui/FormBtn";
import { LastMessagesContext } from "@/context/LastMessagesProvider";

interface Props {
  token: string;
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const SendMessageInput: React.FC<Props> = ({ token, setMessages }) => {
  const { chatId } = useParams();
  const [content, setContent] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const { insertLastMessage } = useContext(LastMessagesContext);

  async function onSendMessage() {
    try {
      const response = await fetch(`${process.env.API}/conversation/${chatId}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const responseData = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, responseData.newMessage]);
        insertLastMessage(responseData.newMessage);
      }
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && content && content.trim()) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form className="p-3" action={onSendMessage} ref={formRef}>
      <Textarea
        onKeyDown={onKeyDownHandler}
        value={content}
        onChange={e => {
          setContent(e.target.value);
        }}
        variant="bordered"
        placeholder="Message"
        classNames={{ input: "text-lg" }}
        endContent={
          <FormBtn color="primary">
            <SendHorizonal />
          </FormBtn>
        }
        rows={1}
        minRows={1}
      />
    </form>
  );
};

export default SendMessageInput;
