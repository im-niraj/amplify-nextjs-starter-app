"use client";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import CreateTag from "./create-tag";
import { columnMutate } from "./table/columns";
import { TagType } from "@/types/tags";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

type Props = {};

const Tag = (props: Props) => {
    const { data, isLoading, mutate } = useSWR("/api/master-data/tag", fetcher);
    let tableData = data?.data;
    return (
        <div>
            <CreateTag mutate={mutate} />
            <hr className="my-3" />
            {tableData && <DataTable columns={columnMutate(mutate)} data={tableData} />}
        </div>
    );
};

export default Tag;
