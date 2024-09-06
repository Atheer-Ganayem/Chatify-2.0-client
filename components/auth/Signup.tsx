"use client";

import React from "react";
import Input from "../ui/Input";
import SwitchAuthFooter from "./SwitchAuthFooter";
import { useFormState } from "react-dom";
import { signup } from "@/actions/signup";
import { Card } from "@nextui-org/react";
import Alert from "../ui/Alert";
import AvatarUploader from "../ui/AvatarUploader";
import { signIn } from "next-auth/react";
import FormBtn from "../ui/FormBtn";

function Signup() {
  const [state, formAction] = useFormState(signup, {
    code: 200,
    ok: true,
    message: "",
  });

  if (state && state.ok && state.code === 201) {
    signIn("credentials", {
      redirect: true,
      callbackUrl: "/chat",
      email: state.email,
      password: state.password,
    });
  }

  return (
    <Card className="rounded-xl p-8 max-w-md w-full">
      <h1 className="font-bold text-2xl text-center mb-5">Signup</h1>
      <form action={formAction} className="flex flex-col gap-4 mt-3">
        <AvatarUploader
          error={state.validationResult?.errors.includes("file")}
          errorMessage={
            state.validationResult?.messages[state.validationResult?.errors.indexOf("file")]
          }
        />
        <Input
          type="text"
          name="name"
          placeholder="Username"
          label="Username:"
          error={state.validationResult?.errors.includes("name")}
          errorMessage={
            state.validationResult?.messages[state.validationResult?.errors.indexOf("name")]
          }
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          label="Email Address:"
          error={state.validationResult?.errors.includes("email")}
          errorMessage={
            state.validationResult?.messages[state.validationResult?.errors.indexOf("email")]
          }
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          label="Password:"
          error={state.validationResult?.errors.includes("password")}
          errorMessage={
            state.validationResult?.messages[state.validationResult?.errors.indexOf("password")]
          }
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          label="Confirm Password:"
          error={state.validationResult?.errors.includes("confirmPassword")}
          errorMessage={
            state.validationResult?.messages[
              state.validationResult?.errors.indexOf("confirmPassword")
            ]
          }
        />
        <SwitchAuthFooter currentMode="signup" />
        {!state.ok && state.message && <Alert variat="error">{state.message}</Alert>}
        <FormBtn variant="solid" color="primary" radius="sm">
          Signup
        </FormBtn>
      </form>
    </Card>
  );
}

export default Signup;
