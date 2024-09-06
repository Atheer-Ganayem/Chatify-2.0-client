"use client";

import { Card } from "@nextui-org/react";
import React, { useRef } from "react";
import Input from "../ui/Input";
import FormBtn from "../ui/FormBtn";
import Alert from "../ui/Alert";
import { useFormState } from "react-dom";
import { updatePassword } from "@/actions/user";

const ChangePassword = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(updatePassword, {
    code: 200,
    ok: true,
    message: "",
  });

  if (state.ok && state.message) {
    formRef.current?.reset();
  }

  return (
    <Card className="p-5 max-w-md w-full">
      <h1 className="w-full font-bold text-center text-2xl mb-5">Update Password</h1>
      <form action={formAction} className="flex flex-col gap-5" noValidate ref={formRef}>
        <Input type="password" placeholder="Current password" name="currentPassword" />
        <Input type="password" placeholder="New password" name="newPassword" />
        <Input type="password" placeholder="Confirm new password" name="confirmNewPassword" />
        {state.message && <Alert variat={state.ok ? "success" : "error"}>{state.message}</Alert>}
        <FormBtn color="primary">Update</FormBtn>
      </form>
    </Card>
  );
};

export default ChangePassword;
