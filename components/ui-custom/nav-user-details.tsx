"use client";

import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Info, KeyRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavUserDetails = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="mb-5">
      <ul className="flex items-center gap-1 flex-wrap">
        <li>
          <Link
            href={`/dashboard/users/${user?.id}`}
            className={cn(
              "flex items-center py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300",
              pathname.match(/^\/dashboard\/users\/\d+$/) && "bg-secondary"
            )}
          >
            <Info className="w-4 h-4 mr-3" />
            Información
          </Link>
        </li>
        <li>
          <Link
            href={`/dashboard/users/${user?.id}/roles`}
            className={cn(
              "flex items-center py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300",
              pathname.match(/^\/dashboard\/users\/\d+\/roles$/) &&
                "bg-secondary"
            )}
          >
            <KeyRound className="w-4 h-4 mr-3" />
            Roles y permisos
          </Link>
        </li>
      </ul>
    </nav>
  );
};
