import React from "react";

import { Loader } from "lucide-react";

export const LoaderComponent = () => {
  return (
    <div className="fixed w-full h-full bg-background left-0 top-0 flex items-center justify-center z-[9999]">
      <Loader className="w-6 h-6 animate-spin" />
    </div>
  );
};
