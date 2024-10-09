import { CreateInitFormatForm } from "@/components/ui-custom/forms/create-init-format-form";
import { Title } from "@/components/ui-custom/title";
import { UserValidation } from "@/components/ui-custom/user-validation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function initPage() {
    return (
        <div>
            <UserValidation />
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
                <Title>Formato de Inicio</Title>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Formato de Inicio</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="w-full">
                <CreateInitFormatForm />
            </div>
        </div>
    )
}