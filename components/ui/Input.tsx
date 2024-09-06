"use client";

import { Dot } from "lucide-react";
import { InputProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface Props extends InputProps {
  type: "text" | "email" | "password";
  name?: string;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

function Input(props: Props) {
  const { pending } = useFormStatus();
  const lightCSS = "bg-gray-100 focus:bg-gray-200 focus:border-black";
  const darkCSS = "dark:bg-neutral-800 dark:focus:bg-neutral-700 dark:focus:border-white";
  const errorCSS = "focus:border-red-500 focus:border-red-600";
  const classes = props.error
    ? errorCSS + " " + lightCSS + " " + darkCSS
    : lightCSS + " " + darkCSS;

  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <label htmlFor={props.name} className={props.error ? "text-red-500" : undefined}>
          {props.label}
        </label>
      )}
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`${classes} border-transparent border-2 py-2 px-4 min-w-72 rounded-lg outline-none shadow-sm duration-150 disabled:opacity-75 ${props.className}`}
        defaultValue={props.defaultValue}
        disabled={pending || props.isDisabled}
      />
      {props.error && props.errorMessage && (
        <p className="flex gap-1 text-red-500">
          <Dot /> {props.errorMessage}
        </p>
      )}
    </div>
  );
}

export default Input;
