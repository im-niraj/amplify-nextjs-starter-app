"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TagType } from "@/types/tags";
import { Icons } from "@/utils/icons";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
export const columnMutate = (mutate?: () => void): ColumnDef<TagType>[] => {
    const handleDelete = async (id: string) => {
        let tstId = toast.loading("Please wait...");
        let res = await fetch(`/api/master-data/tag/${id}`, {
            method: "DELETE",
        });
        let response = await res.json();
        toast.dismiss(tstId);
        if (res.ok) {
            toast.success(response.message);
            if (mutate) mutate();
        } else {
            toast.error(response.message);
        }
    };
    const columns: ColumnDef<TagType>[] = [
        {
            header: "#",
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "label",
            header: "Tag",
        },
        {
            header: "status",
            cell: ({ row }) => <Badge>{row.original.isActive ? "Active" : "Disabled"}</Badge>,
        },
        {
            header: "Action",
            cell: ({ row }) => {
                return (
                    <>
                        <Button onClick={() => handleDelete(row.original.id)} size={"icon"} className="bg-red-400 hover:bg-red-600">
                            <Icons.trash className="h-4 w-4" />
                        </Button>
                    </>
                );
            },
        },
    ];
    return columns;
};
