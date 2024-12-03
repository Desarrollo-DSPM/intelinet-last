import { getInvestigationsById } from "@/actions/investigations/get-investigation-by-id";
import { InvestigationDocument } from "@/components/ui-custom/investigation-document";
import { Title } from "@/components/ui-custom/title";
import { redirect } from "next/navigation";

const SharedInvestigation = async ({
  params,
}: {
  params: { investigationId: string };
}) => {
  const { data } = await getInvestigationsById({
    id: Number(params.investigationId),
  });

  if (
    !data ||
    data.investigation.shared === 0 ||
    data.investigation.status === "cancelled"
  )
    return redirect("/dashboard");

  return (
    <>
      <Title>Investigación compartida</Title>
      <InvestigationDocument
        data={data}
        className="max-w-2xl shadow-md mx-auto p-4 border border-border rounded-lg"
      />
    </>
  );
};

export default SharedInvestigation;
