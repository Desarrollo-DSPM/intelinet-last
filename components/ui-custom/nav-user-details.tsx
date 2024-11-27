"use client";

import { User } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Info, KeyRound, ScanEye } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavUserDetailsProps {
  data: User;
}

export const NavUserDetails = ({ data }: NavUserDetailsProps) => {
  const pathname = usePathname();

  return (
    <nav className="mb-5">
      <ul className="flex items-center gap-1 flex-wrap">
        <li>
          <Link
            href={`/dashboard/admin/users/${data?.id}`}
            className={cn(
              "flex items-center py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300",
              pathname.match(/^\/dashboard\/admin\/users\/\d+$/) &&
                "bg-secondary"
            )}
          >
            <Info className="w-4 h-4 mr-3" />
            Información
          </Link>
        </li>
        <li>
          <Link
            href={`/dashboard/admin/users/${data?.id}/roles`}
            className={cn(
              "flex items-center py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300",
              pathname.match(/^\/dashboard\/admin\/users\/\d+\/roles$/) &&
                "bg-secondary"
            )}
          >
            <KeyRound className="w-4 h-4 mr-3" />
            Roles y permisos
          </Link>
        </li>
        <li>
          <Link
            href={`/dashboard/admin/users/${data?.id}/modules`}
            className={cn(
              "flex items-center py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300",
              pathname.match(/^\/dashboard\/admin\/users\/\d+\/modules$/) &&
                "bg-secondary"
            )}
          >
            <ScanEye className="w-4 h-4 mr-3" />
            Acceso a módulos
          </Link>
        </li>
      </ul>
    </nav>
  );
};
