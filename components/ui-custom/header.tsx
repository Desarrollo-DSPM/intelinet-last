"use client";

import { useAuth } from "@/hooks/use-auth";

import { UserNav } from "@/components/ui-custom/user-nav";
import { ToggleThemeButton } from "@/components/ui-custom/toggle-theme-button";
import { Button } from "@/components/ui/button";

import { EllipsisVertical } from "lucide-react";

export const Header = () => {
  const { auth, setIsOpenMenu } = useAuth();
  return (
    <header className="h-20 px-5 flex items-center justify-between">
      <section className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpenMenu(true)}
          className="xl:hidden"
        >
          <EllipsisVertical />
        </Button>
        <h1 className="inline-flex gap-1 text-2xl font-bold">
          Bienvenido<span className="hidden md:block">, {auth?.name}</span> 👋
        </h1>
      </section>
      <section>
        <ul className="flex items-center gap-1">
          <li>
            <ToggleThemeButton />
          </li>
          <li>
            <UserNav />
          </li>
        </ul>
      </section>
    </header>
  );
};
