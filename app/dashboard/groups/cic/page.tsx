import { CardGroup } from "@/components/ui-custom/groups/card-group";

const GroupCICPage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div className="hidden lg:block" />
      <CardGroup
        title="Dashboard"
        href="/dashboard/groups/cic/dashboard"
        imageSrc="/icons/dashboard.svg"
        buttonText="Ir a dashboard"
      />
      <CardGroup
        title="Investigaciones"
        href="/dashboard/groups/cic/investigations"
        imageSrc="/icons/investigations.png"
        buttonText="Ir a investigaciones"
      />
      <div className="hidden lg:block" />
    </div>
  );
};

export default GroupCICPage;
