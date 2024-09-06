"use client";

import { updateUsername } from "@/actions/user";
import { Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Alert from "../ui/Alert";
import Input from "../ui/Input";
import FormBtn from "../ui/FormBtn";

const ChangeName = () => {
  const { data, update } = useSession();
  const [val, setVal] = useState<string>("");
  const [state, formAction] = useFormState(updateUsername, {
    code: 200,
    ok: true,
    message: "",
  });

  useEffect(() => {
    setVal(data?.user.name || "");
  }, [data?.user.name]);

  useEffect(() => {
    if (state.ok && state.name) {
      update({ name: state.name });
    }
  }, [state.name, state.ok]);

  return (
    <Card className="p-5 max-w-md w-full">
      <h1 className="w-full font-bold text-center text-2xl mb-5">Update username</h1>
      <form action={formAction} className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Username"
          name="name"
          defaultValue={data?.user.name}
          onChange={e => setVal(e.target.value)}
        />
        {state.message && <Alert variat={state.ok ? "success" : "error"}>{state.message}</Alert>}
        <FormBtn color="primary" isDisabled={val === data?.user.name}>
          Update
        </FormBtn>
      </form>
    </Card>
  );
};

export default ChangeName;
