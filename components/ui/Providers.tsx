"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastProvider } from "@/context/ToastContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" themes={["light", "dark"]}>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
