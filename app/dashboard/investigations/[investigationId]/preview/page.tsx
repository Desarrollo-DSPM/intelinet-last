import { getInvestigationsById } from "@/actions/investigations/get-investigation-by-id";
import { InvestigationDocument } from "@/components/ui-custom/investigation-document";
import { redirect } from "next/navigation";

import { Title } from "@/components/ui-custom/title";

const InvestigationPreviewPage = async ({
  params,
}: {
  params: { investigationId: string };
}) => {
  const { data } = await getInvestigationsById({
    id: Number(params.investigationId),
  });

  if (!data) return redirect("/dashboard/groups/uap/investigations");

  return (
    <div className="space-y-10">
      <Title>Vista previa</Title>
      <InvestigationDocument
        data={data}
        className="max-w-2xl shadow-md mx-auto p-4 border border-border rounded-lg"
      />
    </div>
  );
};

export default InvestigationPreviewPage;
