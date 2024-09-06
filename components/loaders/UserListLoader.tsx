"use client";

import { Skeleton } from "@nextui-org/react";
import Input from "../ui/Input";

const UserListLoader = () => {
  return (
    <div className="flex flex-col">
      <div className="p-2">
        <Input type="text" placeholder="Search..." />
      </div>
      {[...Array(5)].map((_, i) => (
        <li key={i} className="flex items-center justify-between p-2 duration-200 ">
          <div className="flex items-center gap-4 w-full">
            <Skeleton className="rounded-full w-16 h-14" />
            <div className="w-full flex flex-col gap-3">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default UserListLoader;
