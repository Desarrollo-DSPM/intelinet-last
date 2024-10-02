import Link from "next/link";

import { RegisterUserForm } from "@/components/ui-custom/forms/register-user-form";

const RegisterPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-10">
        Registrarse
      </h1>
      <div className="w-full">
        <RegisterUserForm fromPage="auth-register" />
      </div>
      <div className="mt-5">
        <p className="text-center text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="font-medium underline">
            Ingresa
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
