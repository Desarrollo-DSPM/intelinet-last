import { getInvestigationsById } from "@/actions/investigations/get-investigation-by-id";
import { EditInvestigationForm } from "@/components/ui-custom/forms/edit-investigation/edit-investigation";
import { Title } from "@/components/ui-custom/title";
import { redirect } from "next/navigation";

export default async function InvestigationsPage({
  params,
}: {
  params: { investigationId: string };
}) {
  const { data } = await getInvestigationsById({
    id: Number(params.investigationId),
  });

  if (!data) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-10">
      <Title>Editar Investigación</Title>
      <EditInvestigationForm investigation={data} />
    </div>
  );
}
