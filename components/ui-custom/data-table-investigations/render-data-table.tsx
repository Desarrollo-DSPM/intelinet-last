"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui-custom/data-table-investigations/data-table";
import { columns } from "@/components/ui-custom/data-table-investigations/columns";

export const RenderDataTable = ({
  data,
  group,
}: {
  data: any[];
  group: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <DataTable data={data} columns={columns(group)} />;
};
