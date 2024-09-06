"use client";

import { Mail } from "lucide-react";
import React from "react";
import FormBtn from "../ui/FormBtn";
import { createConveration } from "@/actions/conversation";
import { useRouter } from "next/navigation";

interface Props {
  targetUserId: string;
}

const CreateConversationButton: React.FC<Props> = ({ targetUserId }) => {
  const router = useRouter();

  return (
    <form
      action={async () => {
        const response = await createConveration(targetUserId);
        if (response.ok) {
          router.push("/chat");
        }
        if (response.code === 422) {
          router.push(`/chat/${targetUserId}`);
        }
      }}
    >
      <FormBtn color="primary">
        <Mail />
      </FormBtn>
    </form>
  );
};

export default CreateConversationButton;
