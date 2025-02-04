"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CardGroupProps {
  title: string;
  href: string;
  imageSrc: string;
  buttonText: string;
}

export const CardGroup = ({
  title,
  href,
  imageSrc,
  buttonText,
}: CardGroupProps) => {
  return (
    <Card className="group">
      <CardHeader className="flex items-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src={imageSrc}
          alt={title}
          width={500}
          height={500}
          className="w-40 h-40 object-cover group-hover:rotate-6 transition-all duration-300"
        />
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={href} className="w-full">
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
