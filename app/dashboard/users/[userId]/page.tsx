import { getUserById } from "@/actions/users/get-user";
import { EditUserForm } from "@/components/ui-custom/forms/edit-user-form";

const UserDetailsPage = async ({ params }: { params: { userId: string } }) => {
  const { data } = await getUserById(Number(params.userId));

  if (!data) return null;

  return (
    <div className="w-full">
      <EditUserForm data={data} />
    </div>
  );
};

export default UserDetailsPage;
