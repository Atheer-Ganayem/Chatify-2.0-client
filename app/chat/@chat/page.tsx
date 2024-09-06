"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-5 h-[80vh]">
      <p className="text-xl">{"You don't have friend ? Lol"}</p>
      <Button as={Link} href="/add-friend" color="primary" size="lg">
        Add Friend
      </Button>
    </div>
  );
};

export default page;
