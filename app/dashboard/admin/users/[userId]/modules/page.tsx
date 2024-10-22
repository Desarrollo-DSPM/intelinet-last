import { redirect } from "next/navigation";
import { getUserById } from "@/actions/users/get-user";
import { EditModulesUser } from "@/components/ui-custom/forms/edit-modules-user";

const UserModulesPage = async ({ params }: { params: { userId: string } }) => {
  const { data } = await getUserById(Number(params.userId));

  if (!data) redirect("/dashboard/users");

  return (
    <div className="w-full">
      <EditModulesUser data={data} />
    </div>
  );
};

export default UserModulesPage;
