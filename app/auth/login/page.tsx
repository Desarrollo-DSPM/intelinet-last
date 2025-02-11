import {FormLogin} from "./_components/form-login";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-10">
        Iniciar sesión
      </h1>
      <div className="w-full">
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginPage;
