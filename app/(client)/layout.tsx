"use client";
import Footer from "@/components/client/footer";
import Navbar from "@/components/client/navbar";
import { fetcher } from "@/lib/fetcher";
import { Icons } from "@/utils/icons";
import React from "react";
import useSWR from "swr";

const getCategory = async () => {
  let res = await fetch(`${process.env.API_URI}/api/category`);
  if (res.ok) {
    let response = await res.json();
    return response.data;
  }
  return [];
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  // let category = await getCategory();
  let { data, isLoading } = useSWR(`/api/category`, fetcher);

  let category = data?.data;
  return (
    <div className="">
      <Navbar categories={category} />
      <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
};
export default BlogLayout;
