"use client";

import { Spinner } from "@nextui-org/react";
import React from "react";

const ConversationLoader = () => {
  return (
    <div className="col-span-2 h-[80vh] flex justify-center items-center flex-col gap-5">
      <Spinner color="primary" size="lg" />
      <p>Please wait...</p>
    </div>
  );
};

export default ConversationLoader;
