import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center px-5">
      {children}
    </div>
  );
};

export default AuthLayout;
