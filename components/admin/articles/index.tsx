"use client";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columnMutate } from "./table/columns";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

type Props = {};

const ArticleList = (props: Props) => {
  const { data, isLoading, mutate } = useSWR("/api/article", fetcher);
  let tableData = data?.data;
  return <div>{tableData && <DataTable columns={columnMutate(mutate)} data={tableData} />}</div>;
};

export default ArticleList;
