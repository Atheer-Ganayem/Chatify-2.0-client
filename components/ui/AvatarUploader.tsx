"use client";

import React, { useState } from "react";
import DefaultAvatar from "@/public/default-avatar.webp";
import Image from "next/image";
import { Dot, Plus } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface Props {
  error?: boolean;
  errorMessage?: string;
  initAvatar?: string;
  children?: React.ReactNode;
}

const AvatarUploader: React.FC<Props> = ({ error, errorMessage, initAvatar, children }) => {
  const [preview, setPreview] = useState<string>("");
  const { pending } = useFormStatus();

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="relative">
      <Image
        src={
          initAvatar && !preview
            ? process.env.AWS + "chatify-2.0/" + initAvatar
            : preview || DefaultAvatar
        }
        alt="Avatar"
        height={100}
        width={100}
        className={`${error && "border-4 border-red-500"} rounded-full mx-auto z-10`}
      />
      {error && (
        <p className="flex gap-1 text-red-500 justify-center mt-2">
          <Dot /> {errorMessage}
        </p>
      )}
      {!pending && (
        <label
          htmlFor="file"
          className={`${
            preview || initAvatar ? "opacity-0 hover:opacity-50" : "opacity-50"
          } absolute w-[100px] h-[100px] bg-neutral-600 hover:bg-neutral-800 z-40 rounded-full flex justify-center items-center inset-0 left-1/2 -translate-x-1/2 cursor-pointer duration-200`}
        >
          <Plus size={50} />
        </label>
      )}
      {pending && (
        <span
          className={`absolute w-[100px] h-[100px] bg-neutral-600 bg-opacity-70 z-50 rounded-full flex justify-center items-center inset-0 left-1/2 -translate-x-1/2 cursor-pointer duration-200`}
        >
          <Spinner size="lg" />
        </span>
      )}
      {children}
      <input type="file" name="file" id="file" hidden onChange={onSelect} accept="image/*" />
    </div>
  );
};

export default AvatarUploader;
