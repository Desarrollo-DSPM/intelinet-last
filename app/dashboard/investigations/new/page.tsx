import {CreateInvestigationForm} from "@/components/ui-custom/forms/create-investigation";
import {TitleNewInvestigation} from "@/components/ui-custom/title-new-investigation";

export default function NewInvestigationPage() {
  return (
    <div>
      <TitleNewInvestigation />
      <div className="w-full">
        <CreateInvestigationForm />
      </div>
    </div>
  );
}
