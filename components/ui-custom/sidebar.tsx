"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  Building2,
  CircleDot,
  Folder,
  GitBranch,
  House,
  Users,
} from "lucide-react";

import { Logo } from "@/components/ui-custom/logo";

export const Sidebar = () => {
  const { auth, isOpenMenu, setIsOpenMenu } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "w-64 xl:w-2/12 h-full border-r border-border fixed xl:sticky left-0 top-0 xl:translate-x-0 bg-background p-5 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out overflow-auto",
          isOpenMenu ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <section>
          <Logo className="mb-8 ml-4" />
          <ul>
            <li>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm flex items-center gap-4 py-2 px-4 mb-1 rounded-lg hover:bg-secondary transition-colors duration-300",
                  pathname === "/dashboard" && "bg-secondary font-medium"
                )}
              >
                <House className="h-4 w-4" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/organigrama"
                className={cn(
                  "text-sm flex items-center gap-4 py-2 px-4 mb-1 rounded-lg hover:bg-secondary transition-colors duration-300",
                  pathname === "/dashboard/organigrama" &&
                    "bg-secondary font-medium"
                )}
              >
                <GitBranch className="h-4 w-4" />
                <span>Organigrama</span>
              </Link>
            </li>
            {auth?.role === "admin" && (
              <>
                <li className="my-4 text-xs uppercase font-bold text-muted-foreground">
                  Administradores
                </li>
                <li>
                  <Link
                    href="/dashboard/users"
                    className={cn(
                      "text-sm flex items-center gap-4 py-2 px-4 mb-1 rounded-lg hover:bg-secondary transition-colors duration-300",
                      pathname.startsWith("/dashboard/users") &&
                        "bg-secondary font-medium"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    <span>Usuarios</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/departments"
                    className={cn(
                      "text-sm flex items-center gap-4 py-2 px-4 mb-1 rounded-lg hover:bg-secondary transition-colors duration-300",
                      pathname.startsWith("/dashboard/departments") &&
                        "bg-secondary font-medium"
                    )}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Departamentos</span>
                  </Link>
                </li>
              </>
            )}
            {auth?.role === "admin" ? (
              <>
                <li className="my-4 text-xs uppercase font-bold text-muted-foreground">
                  Coordinación de inteligencia
                </li>
                <li>
                  <Link
                    href="/dashboard/investigations"
                    className={cn(
                      "text-sm flex items-center gap-4 py-2 px-4 mb-1 rounded-lg hover:bg-secondary transition-colors duration-300",
                      pathname.startsWith("/dashboard/investigations") &&
                        "bg-secondary font-medium"
                    )}
                  >
                    <Folder className="h-4 w-4" />
                    <span>Investigaciones</span>
                  </Link>
                </li>
              </>
            ) : null}
            {auth?.role === "admin" || auth?.modules.includes("uap") ? (
              <>
                <li className="my-4 ml-4 text-xs uppercase font-bold text-muted-foreground">
                  Grupos especiales
                </li>
                <li>
                  <Link
                    href="/dashboard/groups/uap"
                    className={cn(
                      "text-sm flex items-center gap-4 py-2 px-4 mb-1 rounded-lg hover:bg-secondary transition-colors duration-300",
                      pathname.startsWith("/dashboard/groups/uap") &&
                        "bg-secondary font-medium"
                    )}
                  >
                    <CircleDot className="h-4 w-4" />
                    <span>UAP</span>
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </section>
      </aside>
      <div
        role="button"
        onClick={() => setIsOpenMenu(false)}
        className={cn(
          "fixed left-0 top-0 w-full h-full bg-black/40 backdrop-blur-sm z-40",
          !isOpenMenu && "hidden"
        )}
      />
    </>
  );
};
