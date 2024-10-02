import Link from "next/link";
import { FormLogin } from "./_components/form-login";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-10">
        Iniciar sesión
      </h1>
      <div className="w-full">
        <FormLogin />
      </div>
      <div className="mt-5">
        <p className="text-center text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register" className="font-medium underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
