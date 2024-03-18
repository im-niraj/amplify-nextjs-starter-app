"use client";
import { Icons } from "@/utils/icons";
import { categoryList } from "@/utils/master-data";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 antialiased mt-5">
      <div className="p-4 py-6 mx-auto max-w-7xl md:p-8 lg:p-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <Link href="#" className=" hover:underline">
                  About
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Gallery
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Category</h2>

            <ul className="text-gray-500 dark:text-gray-400">
              {categoryList.map(
                (el) =>
                  el.isActive && (
                    <li key={el.id} className="mb-4">
                      <Link href={el.href} className="hover:underline">
                        {el.label}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Licensing
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-1 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col md:flex-row gap-y-4 items-center justify-between mt-5">
          <div className="flex items-center flex-col md:flex-row justify-center gap-y-2">
            <Link href={"/"}>
              <Icons.logo2 className="h-8 w-[150px]  md:mr-2 fill-black dark:fill-white" />
            </Link>
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              &copy; 2024{" "}
              <a href="https://hindinews9.com" className="hover:underline">
                HindiNews9.com
              </a>
              . All Rights Reserved.
            </span>
          </div>
          <ul className="flex justify-center space-x-5">
            <li>
              <Link href={"#"} className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                <Icons.facebook className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                <Icons.twitterX className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                <Icons.whatsapp className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
