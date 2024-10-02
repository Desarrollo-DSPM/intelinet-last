import { Header } from "@/components/ui-custom/header";
import { Sidebar } from "@/components/ui-custom/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-[100dvh]">
      <Sidebar />
      <div className="w-full xl:w-10/12">
        <Header />
        <main className="h-[calc(100%-80px)] overflow-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
