"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@nextui-org/react";

function ThemeController() {
  const [didMount, setDidMount] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setDidMount(true);
    localStorage.getItem("theme");
  }, []);

  if (!didMount) {
    return null;
  }

  function onChangeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button onClick={onChangeTheme} variant="light" size="sm">
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}

export default ThemeController;
