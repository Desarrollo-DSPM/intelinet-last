import Image from "next/image";

const NotAccessPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <Image
        src="/icons/not-access.png"
        alt="Sin acceso"
        width={500}
        height={500}
        className="w-40 h-40 object-cover"
      />
      <h3 className="text-2xl font-bold">Sin acceso</h3>
    </div>
  );
};

export default NotAccessPage;
