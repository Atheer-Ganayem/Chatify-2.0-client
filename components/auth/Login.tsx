"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import SwitchAuthFooter from "./SwitchAuthFooter";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Alert from "../ui/Alert";
import FormBtn from "../ui/FormBtn";

function Login() {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  async function onSubmitHandler(formData: FormData) {
    setEmailError(false);
    setPasswordError(false);
    setMessage("");

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    if (!result?.ok) {
      setEmailError(true);
      setPasswordError(true);
      setMessage("Invalid email or password.");
    } else if (result.ok) {
      redirect("/");
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 max-w-md w-full">
      <Image src={logo} width={125} height={125} alt="logo" className="mx-auto" />
      <h1 className="font-bold text-2xl text-center mt-5">Login</h1>
      <form action={onSubmitHandler} className="flex flex-col gap-5 mt-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          label="Email Address:"
          error={emailError}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          label="Password:"
          error={passwordError}
        />
        <SwitchAuthFooter currentMode="login" />
        {message && <Alert variat="error">{message}</Alert>}
        <FormBtn variant="solid" color="primary" radius="sm">
          Login
        </FormBtn>
      </form>
    </div>
  );
}

export default Login;
