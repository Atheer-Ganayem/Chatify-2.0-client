"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import Link from "next/link";
import ThemeController from "./ThemeController";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILionk,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AvatarDropdown from "./AvatarDropdown";
import { usePathname } from "next/navigation";

function NavbarComponent() {
  const session = useSession();
  const path = usePathname();

  return (
    <Navbar isBordered>
      <NavbarBrand as={Link} href="/chat" className="flex gap-2">
        <Image src={logo} width={50} height={50} alt="logo" />
        <p className="font-bold text-inherit">Chatify</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={path.startsWith("/chat")}>
          <NextUILionk
            href="/chat"
            as={Link}
            aria-current="page"
            color={path.startsWith("/chat") ? "primary" : "foreground"}
          >
            Chat
          </NextUILionk>
        </NavbarItem>
        <NavbarItem isActive={path.startsWith("/add-friend")}>
          <NextUILionk
            href="/add-friend"
            as={Link}
            aria-current="page"
            color={path.startsWith("/add-friend") ? "primary" : "foreground"}
          >
            Add Friend
          </NextUILionk>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {session.status !== "loading" &&
          (!session.data ? (
            <NavbarItem>
              <Button as={Link} color="primary" href="/login" variant="solid">
                Login
              </Button>
            </NavbarItem>
          ) : (
            <AvatarDropdown
              avatar={session.data.user.avatar}
              name={session.data.user.name}
              email={session.data.user.email}
            />
          ))}
        <ThemeController />
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarComponent;
