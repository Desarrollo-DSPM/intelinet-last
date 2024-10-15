import { CreateInvestigationForm } from "@/components/ui-custom/forms/create-investigation";
import { Title } from "@/components/ui-custom/title";
import { UserValidation } from "@/components/ui-custom/user-validation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function NewInvestigationPage() {
  return (
    <div>
      <UserValidation />
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Nueva investigación</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/investigations">
                Investigaciones
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nueva investigación</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full">
        <CreateInvestigationForm />
      </div>
    </div>
  );
}
