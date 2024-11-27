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

const GroupUAPPage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div className="hidden lg:block" />
      <Card>
        <CardHeader className="flex items-center">
          <CardTitle>Investigaciones</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Image
            src="/icons/investigations.png"
            alt="Investigaciones"
            width={500}
            height={500}
            className="w-40 h-40 object-cover"
          />
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link
              href="/dashboard/groups/uap/investigations"
              className="w-full"
            >
              Ir a investigaciones
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <div className="hidden lg:block" />
    </div>
  );
};

export default GroupUAPPage;
