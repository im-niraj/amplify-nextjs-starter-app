"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Icons } from "@/utils/icons";
import React from "react";
import UserBtnAdmin from "./user.btn";

type Props = {};

const NavbarAdmin = (props: Props) => {
  return (
    <nav className={`bg-gray-800 dark:bg-gray-900 z-30 fixed top-0 left-0 right-0`}>
      <div className="px-2">
        <div className="relative flex h-16 items-center justify-start sm:justify-between">
          <Button type="button" size={"icon"} variant={"ghost"} className="hover:bg-transparent sm:hidden mr-2">
            <Icons.bar className="rotate-90 h-8 w-8 text-white" />
          </Button>
          <div className="flex items-center justify-start  flex-nowrap overflow-x-hidden">
            <Icons.logo2 className="h-8 min-h-8 w-[150px] fill-[#f6f6f6]" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
            <ModeToggle />
            <UserBtnAdmin />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
