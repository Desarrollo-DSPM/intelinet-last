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

  // Mapa de navegación dinámico
  const navItems = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: House,
      visible: true, // Siempre visible
    },
    {
      label: "Organigrama",
      href: "/dashboard/organigrama",
      icon: GitBranch,
      visible: true, // Siempre visible
    },
    {
      label: "Usuarios",
      href: "/dashboard/admin/users",
      icon: Users,
      section: "Admin",
      visible: auth?.role === "admin", // Solo para admin
    },
    {
      label: "Departamentos",
      href: "/dashboard/admin/departments",
      icon: Building2,
      section: "Admin",
      visible: auth?.role === "admin", // Solo para admin
    },
    {
      label: "Investigaciones",
      href: "/dashboard/admin/investigations",
      icon: Folder,
      section: "Coordinación de inteligencia",
      visible: auth?.role === "admin", // Solo para admin
    },
    {
      label: "UAP",
      href: "/dashboard/groups/uap",
      icon: CircleDot,
      section: "Grupos especiales",
      visible: auth?.role === "admin" || auth?.modules.includes("uap"), // Admin o módulo UAP
    },
    {
      label: "CIC",
      href: "/dashboard/groups/cic",
      icon: CircleDot,
      section: "Grupos especiales",
      visible: auth?.role === "admin" || auth?.modules.includes("cic"), // Admin o módulo CIC
    },
  ];

  // Agrupa las secciones para renderizar
  const groupedNav = navItems.reduce((acc, item) => {
    if (!item.visible) return acc; // Ignorar items no visibles
    const section = item.section || "General";
    acc[section] = acc[section] || [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

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
            {Object.entries(groupedNav).map(([section, items]) => (
              <div key={section}>
                {section !== "General" && (
                  <li className="my-4 text-xs uppercase font-bold text-muted-foreground">
                    {section}
                  </li>
                )}
                {items.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "text-sm flex items-center gap-4 py-2 px-4 mb-1 rounded-lg hover:bg-secondary transition-colors duration-300",
                        pathname === href && "bg-secondary font-medium"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </div>
            ))}
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
