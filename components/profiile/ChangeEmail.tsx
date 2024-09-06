"use client";

import { updateEmail } from "@/actions/user";
import { Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Input from "../ui/Input";
import Alert from "../ui/Alert";
import FormBtn from "../ui/FormBtn";

const ChangeEmail = () => {
  const { data, update } = useSession();
  const [val, setVal] = useState<string>("");
  const [state, formAction] = useFormState(updateEmail, {
    code: 200,
    ok: true,
    message: "",
  });

  useEffect(() => {
    setVal(data?.user.email || "");
  }, [data?.user.email]);

  useEffect(() => {
    if (state.ok && state.email) {
      update({ email: state.email });
    }
  }, [state.email, state.ok]);

  return (
    <Card className="p-5 max-w-md w-full">
      <h1 className="w-full font-bold text-center text-2xl mb-5">Update Email</h1>
      <form action={formAction} className="flex flex-col gap-5" noValidate>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={data?.user.email}
          onChange={e => setVal(e.target.value)}
        />
        {state.message && <Alert variat={state.ok ? "success" : "error"}>{state.message}</Alert>}
        <FormBtn color="primary" isDisabled={val === data?.user.email}>
          Update
        </FormBtn>
      </form>
    </Card>
  );
};

export default ChangeEmail;
