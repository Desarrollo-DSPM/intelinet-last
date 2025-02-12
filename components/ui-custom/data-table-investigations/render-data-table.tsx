"use client";

import {useEffect, useState} from "react";

import {DataTable} from "@/components/ui-custom/data-table-investigations/data-table";
import {columns} from "@/components/ui-custom/data-table-investigations/columns";
import {InvestigationWithDetails} from "@/lib/db/schema";

export const RenderDataTable = ({
  data,
  group
}: {
  data: InvestigationWithDetails[];
  group: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <DataTable data={data} columns={columns(group)} group={group} />;
};
