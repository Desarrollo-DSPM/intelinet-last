"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/actions/sign-out";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoaderComponent } from "@/components/ui-custom/loader";
import { LogOut, Settings, User } from "lucide-react";

export const UserNav = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { auth, setAuth } = useAuth();

  async function handleSignOut() {
    setIsLoading(true);
    setAuth(null);
    await signOut();
    router.push("/auth/login");

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  if (isLoading) return <LoaderComponent />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent py-2 px-2 flex items-center gap-3"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="/avatar.png"
              className="object-cover"
              alt="@templatemarketnet"
            />
            <AvatarFallback className="uppercase">
              {auth?.name?.charAt(0)}
              {auth?.name?.charAt(1)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{auth?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Ajustes</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
