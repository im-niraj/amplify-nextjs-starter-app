"use client";
import { Card } from "@/types/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ data, authorVisible, bannerVisible }: { data: Card; authorVisible?: boolean; bannerVisible?: boolean }) => {
  if (data.cardType === "small") {
    return (
      <article className="flex w-full sm:w-1/2 lg:w-1/3 flex-col items-start justify-between px-1 sm:px-5">
        {bannerVisible && data.banner && (
          <figure className="mb-1 relative">
            <Link href={`/${data.slug}`}>
              <Image className="rounded-md" src={data.banner} style={{ height: "100%", width: "100%" }} alt={data.bannerCaption || ""} sizes="100vw" width={0} height={0} />
            </Link>
            {/* {data.bannerCaption && <figcaption className="text-xs absolute">{data.bannerCaption}</figcaption>} */}
          </figure>
        )}
        <div className="flex items-center gap-x-4 text-sm">
          <time dateTime={data.author.article_createdAt.toString()} className="text-gray-500  text-sm">
            {format(data.author.article_createdAt, "EE, dd MMM yyyy hh:mm aa")}
          </time>
          {data.categoryList.map((el) => (
            <Link href={el.href} key={el.id} className="relative z-10 rounded-full bg-red-500 dark:bg-red-700 px-3 py-1 font-medium text-white hover:bg-red-600 dark:hover:bg-red-800">
              {el.label}
            </Link>
          ))}
        </div>
        <div>
          <h3 className="mt-1 line-clamp-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-300 group-hover:text-gray-600">
            <Link href={`/${data.slug}`}>{data.title}</Link>
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{data.description}</p>
        </div>
        {authorVisible && (
          <div className="relative mt-3 flex items-center gap-x-4">
            <Image src={data.author.image} width={0} height={0} sizes="100vw" className="h-10 w-10 rounded-full bg-gray-50" alt="" />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900 dark:text-gray-300">
                <Link href={`/author`}>
                  {data.author.firstName}
                  {data.author.lastName && " " + data.author.lastName}
                </Link>
              </p>
              <p className="text-gray-600">{data.author.designation}</p>
            </div>
          </div>
        )}
      </article>
    );
  } else if (data.cardType === "large") {
    return (
      <div></div>
      // <div className="flex flex-col-reverse sm:flex-row px-1 sm:px-5">
      //     <div className="w-full sm:w-1/2">
      //         <div className="flex items-center gap-x-4 text-xs">
      //             <time dateTime={data.timeStamp.toDateString()} className="text-gray-500">
      //                 {format(data.timeStamp, "MMM yyyy, dd")}
      //             </time>
      //             {data.tags.map((el) => (
      //                 <Link href={el.href} key={el.id} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
      //                     {el.label}
      //                 </Link>
      //             ))}
      //         </div>
      //         <div>
      //             <h3 className="mt-1 line-clamp-3 text-2xl md:text-4xl font-semibold  text-gray-900 dark:text-gray-300 group-hover:text-gray-600">
      //                 <Link href={`/${data.slug}`}>{data.title}</Link>
      //             </h3>
      //             <p className="mt-3 line-clamp-5 text-sm leading-6 text-gray-600">{data.description}</p>
      //         </div>
      //         {authorVisible && (
      //             <div className="relative mt-3 flex items-center gap-x-4">
      //                 <Image src={data.author.image} width={0} height={0} sizes="100vw" className="h-10 w-10 rounded-full bg-gray-50" alt="" />
      //                 <div className="text-sm leading-6">
      //                     <p className="font-semibold text-gray-900 dark:text-gray-300">
      //                         <Link href={`/author/${data.author.username}`}>
      //                             {data.author.firstName}
      //                             {data.author.lastName && " " + data.author.lastName}
      //                         </Link>
      //                     </p>
      //                     <p className="text-gray-600">{data.author.designation}</p>
      //                 </div>
      //             </div>
      //         )}
      //     </div>
      //     <div className="w-full sm:w-1/2">
      //         {bannerVisible && data.banner && (
      //             <figure className="mb-1 relative">
      //                 <Image className="rounded-md" src={data.banner} style={{ height: "100%", width: "100%" }} alt={data.bannerCaption || ""} sizes="100vw" width={0} height={0} />
      //                 {/* {data.bannerCaption && <figcaption className="text-xs absolute">{data.bannerCaption}</figcaption>} */}
      //             </figure>
      //         )}
      //     </div>
      // </div>
    );
  }
  return <div>Type Error...</div>;
};

export default BlogCard;
