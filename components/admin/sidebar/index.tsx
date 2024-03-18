"use client";
import { sidebar } from "@/utils/master-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const SidebarAdmin = (props: Props) => {
  const path = usePathname();
  return (
    <div className="h-[calc(100vh_-_64px)] mt-16 z-20 fixed overflow-y-auto scrollbar-hide w-[250px] bg-teal-800">
      <ul className="p-3">
        {sidebar.map((el) => (
          <li key={el.id} className={` rounded-md ${path == el.href && "bg-teal-900"}`}>
            <Link className="p-3 text-white hover:text-yellow-400 block" href={el.href}>
              {el.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
