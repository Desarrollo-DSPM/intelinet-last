import Link from "next/link";

import {cn} from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({className}: LogoProps) => {
  return (
    <Link href="/">
      <h1 className={cn("text-3xl font-bold", className)}>
        INTELINET<span>.</span>
      </h1>
    </Link>
  );
};
