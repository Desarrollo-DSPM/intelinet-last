import { redirect } from "next/navigation";
import { User } from "@/lib/db/schema";

interface PermissionOptions {
  requiredRole?: string;
  requiredModules?: string[];
}

export const validatePermissions = (
  user: User | null,
  options: PermissionOptions
) => {
  if (!user) {
    redirect("/auth/login");
  }

  // Los administradores tienen acceso a todo
  if (user.role === "admin") {
    return;
  }

  const { requiredRole, requiredModules } = options;

  // Validar rol específico (si no es admin)
  if (requiredRole && user.role !== requiredRole) {
    redirect("/dashboard/not-access");
  }

  // Validar módulos específicos (si no es admin)
  if (
    requiredModules &&
    !requiredModules.some((module) => user.modules.includes(module))
  ) {
    redirect("/dashboard/not-access");
  }
};
