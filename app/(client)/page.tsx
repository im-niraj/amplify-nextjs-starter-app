import BlogCard from "@/components/client/blog-card";
import { fetcher } from "@/lib/fetcher";
import { Card } from "@/types/card";
import { Icons } from "@/utils/icons";
import React from "react";
import useSWR from "swr";

type Props = {};
const getArticles = async () => {
  let res = await fetch(`${process.env.API_URI}/api/article/public`, { next: { revalidate: 60 } });
  if (res.ok) {
    let response = await res.json();
    return response.data;
  }
  return null;
};
const BlogHome = async (props: Props) => {
  let data = await getArticles();
  // let { data, isLoading } = useSWR(`/api/article/public`, fetcher);
  // if (isLoading) {
  //   <div className="mt-2">
  //     <Icons.loading className="animate-spin h-6 w-6" />
  //   </div>;
  // }
  // console.log(data)
  if (data) {
    return (
      <div className="mt-3 sm:mt-5">
        <div className="flex flex-wrap gap-y-12 mt-10">
          {data?.data.map((el: any) => (
            <BlogCard key={el.id} data={{ ...el, cardType: "small" } as Card} bannerVisible />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-2">
      <p>Article not available</p>
    </div>
  );
};

export default BlogHome;
