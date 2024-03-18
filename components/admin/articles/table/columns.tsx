import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/types/category";
import { Icons } from "@/utils/icons";
import { Article } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import toast from "react-hot-toast";

export const columnMutate = (mutate?: () => void): ColumnDef<Article>[] => {
  const handleDelete = async (id: string) => {
    let tstId = toast.loading("Please wait...");
    let res = await fetch(`/api/article/${id}`, {
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
  const articlePublishHandle = async (id: string) => {
    let tstId = toast.loading("Please wait...");
    let res = await fetch(`/api/article/${id}/publish`, {
      method: "PATCH",
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
  const columns: ColumnDef<Article>[] = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-start justify-start">
          <Image src={row.original.banner} sizes="100vw" height={0} width={0} className="h-10 w-fit mr-2 object-contain" alt="" />
          <div>{row.original.title}</div>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      header: "CreatedAt",
      cell: ({ row }) => format(row.original.createdAt, "dd-MM-yyyy hh:mm a"),
    },
    {
      header: "status",
      cell: ({ row }) => (
        <button onClick={() => articlePublishHandle(row.original.id)}>
          <Badge>{row.original.published ? "Published" : "Draft"}</Badge>
        </button>
      ),
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
