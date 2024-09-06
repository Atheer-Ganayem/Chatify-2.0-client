"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  email: string;
  name: string;
  avatar: string;
}

const AvatarDropdown: React.FC<Props> = ({ avatar, email, name }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          color="primary"
          isBordered
          as="button"
          className="transition-transform"
          src={process.env.AWS + "chatify-2.0/" + avatar}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="gap-2">
          <p className="font-semibold">{name}</p>
          <p className="font-semibold">{email}</p>
          <hr className="mt-2" />
        </DropdownItem>
        <DropdownItem key="settings" as={Link} href="/profile">
          My Settings
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger duration-200"
          onClick={() => {
            signOut({ redirect: true, callbackUrl: "/login" });
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarDropdown;
