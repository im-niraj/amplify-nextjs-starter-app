"use client";
import React from "react";
import CreateCategory from "./create-category";
import { DataTable } from "@/components/ui/data-table";
import { columnMutate } from "./table/columns";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

type Props = {};
const Category = (props: Props) => {
  const { data, isLoading, mutate } = useSWR("/api/master-data/category", fetcher);
  let tableData = data?.data;
  return (
    <div>
      <CreateCategory mutate={mutate} />
      <hr className="my-3" />
      {tableData && <DataTable columns={columnMutate(mutate)} data={tableData} />}
    </div>
  );
};

export default Category;
