import {getUser} from "@/actions/users/get-me";
import {CardGroup} from "@/components/ui-custom/groups/card-group";

const GroupPage = async ({params}: {params: Promise<{group: string}>}) => {
  const {group} = await params;
  const user = await getUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div className="hidden lg:block" />
      <CardGroup
        title="Dashboard"
        href={`/dashboard/groups/${group}/dashboard`}
        imageSrc="/icons/dashboard.svg"
        buttonText="Ir a dashboard"
      />
      <CardGroup
        title="Investigaciones"
        href={`/dashboard/groups/${group}/investigations`}
        imageSrc="/icons/investigations.png"
        buttonText="Ir a investigaciones"
      />
      <div className="hidden lg:block" />
      <div className="hidden lg:block" />
      {user?.role === "admin" || user?.modules.includes("uap") ? (
        <CardGroup
          title="Pandillas"
          href="/dashboard/groups/uap/gangs"
          imageSrc="/icons/gangs.png"
          buttonText="Pandillas"
        />
      ) : null}
    </div>
  );
};

export default GroupPage;
