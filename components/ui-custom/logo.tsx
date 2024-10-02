import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="logo"
        width={500}
        height={500}
        className={cn("w-6 h-6 object-cover", className)}
      />
    </Link>
  );
};
