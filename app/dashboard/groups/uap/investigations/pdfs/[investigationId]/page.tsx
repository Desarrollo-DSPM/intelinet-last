import { getInvestigationsById } from "@/actions/investigations/get-investigation-by-id";
import { InvestigationDocument } from "@/components/ui-custom/investigation-document";
import { redirect } from "next/navigation";

const InvestigationPDFId = async ({
  params,
}: {
  params: { investigationId: string };
}) => {
  const { data } = await getInvestigationsById({
    id: Number(params.investigationId),
  });

  if (!data) return redirect("/dashboard/groups/uap/investigations");

  return <InvestigationDocument data={data} />;
};

export default InvestigationPDFId;
