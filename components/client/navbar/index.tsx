"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CategoryType } from "@/types/category";
import { Icons } from "@/utils/icons";
import { categoryList, pageList } from "@/utils/master-data";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  categories?: CategoryType[];
};

const Navbar = (props: Props) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [styleTop, setStyleTop] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    let lastScrollTop = 0;
    let scrollSpeed = 0;
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset;
      scrollSpeed = Math.abs(currentScrollPos - lastScrollTop);
      lastScrollTop = currentScrollPos;
      if (prevScrollPos > currentScrollPos) {
        if (scrollSpeed > 20) {
          setStyleTop(true);
        }
      } else {
        setStyleTop(false);
      }
      prevScrollPos = currentScrollPos;
    };
  }, [prevScrollPos]);
  return (
    <>
      <nav className={`bg-gray-600 dark:bg-gray-900 z-30 transition-all duration-700 sticky ${styleTop ? "top-0" : "-top-16"}`}>
        <div className="mx-auto max-w-7xl px-2 sm:px-8">
          <div className="relative flex h-16 items-center justify-start sm:justify-between">
            <Button type="button" size={"icon"} variant={"ghost"} className="hover:bg-transparent sm:hidden mr-2">
              <Icons.bar className="rotate-90 h-8 w-8 text-white" />
            </Button>
            <div className="flex items-center justify-start  flex-nowrap overflow-x-hidden">
              <Link href={"/"}>
                <Icons.logo2 className="h-9 min-h-9 w-[150px] fill-white" />
              </Link>
              <div className="hidden sm:ml-6 sm:inline-flex items-center">
                <div className="flex items-center space-x-4">
                  {pageList.map(
                    (el) =>
                      el.isActive && (
                        <Link key={el.id} href={el.href} className="px-3 py-2 font-medium text-paletteFive">
                          {el.label}
                        </Link>
                      )
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      {props.categories && (
        <nav className={`bg-white dark:bg-gray-800 shadow-md transition-all duration-700 sticky z-30 ${styleTop ? "top-16" : "top-0"} `}>
          <div className="mx-auto max-w-7xl sm:px-6">
            <div className="flex items-center justify-start sm:items-stretch overflow-x-auto scrollbar-hide">
              <div className="flex items-center text-sm">
                {props.categories?.map(
                  (el) =>
                    el.isActive && (
                      <Link key={el.id} href={el.href} className="px-3 py-2 font-medium">
                        {el.label}
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
