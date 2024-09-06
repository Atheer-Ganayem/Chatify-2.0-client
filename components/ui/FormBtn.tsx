"use client";

import { Button } from "@nextui-org/react";
import { ButtonVariantProps } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props extends ButtonVariantProps {
  children: React.ReactNode | string;
  className?: string;
}

const FormBtn: React.FC<Props> = props => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" {...props} isLoading={pending} className={props.className}>
      {props.children}
    </Button>
  );
};

export default FormBtn;
