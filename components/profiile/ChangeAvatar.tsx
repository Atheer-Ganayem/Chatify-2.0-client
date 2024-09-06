"use client";

import React, { useEffect } from "react";
import AvatarUploader from "../ui/AvatarUploader";
import { updateAvatar } from "@/actions/user";
import { useFormState } from "react-dom";
import Alert from "../ui/Alert";
import FormBtn from "../ui/FormBtn";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";

const ChangeAvatar = ({ initAvatar }: { initAvatar: string }) => {
  const { update } = useSession();
  const [state, formAction] = useFormState(updateAvatar, {
    code: 200,
    ok: true,
    message: "",
    newAvatar: "",
  });

  useEffect(() => {
    if (state.ok && state.newAvatar) {
      update({ avatar: state.newAvatar });
    }
  }, [state.newAvatar, state.ok]);

  return (
    <>
      <form action={formAction} className="w-fit mx-auto">
        <AvatarUploader initAvatar={initAvatar}>
          <FormBtn
            size="sm"
            className="h-fit max-w-fit w-fit min-w-fit rounded-full px-0 absolute right-0 top-0"
          >
            <Check className="text-success" />
          </FormBtn>
        </AvatarUploader>
      </form>
      {state.message && <Alert variat={state.ok ? "success" : "error"}>{state.message}</Alert>}
    </>
  );
};

export default ChangeAvatar;
