import { getUserById } from "@/actions/users/get-user";
import { EditRoleUserForm } from "@/components/ui-custom/forms/edit-role-user-form";

const UserRolesPage = async ({ params }: { params: { userId: string } }) => {
  const { data } = await getUserById(Number(params.userId));

  if (!data) return null;

  return (
    <div className="w-full">
      <EditRoleUserForm data={data} />
    </div>
  );
};

export default UserRolesPage;
