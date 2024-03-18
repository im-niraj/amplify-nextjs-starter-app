"use client";
import { Card } from "@/types/card";
import Image from "next/image";
import React from "react";
import "./article.css";
import ArticleHeader from "@/components/article-component/article-header";
import RenderJsonToHtml from "@/components/editor/content-render/render-page";

type Props = {
  data: Card;
};

const Article = ({ data }: Props) => {
  return (
    <article>
      <ArticleHeader title={data.title} slug={data.slug} banner={data.banner} author={data.author} tagList={data.tagList} description={data.description} />
      <div className="flex flex-col md:flex-row gap-x-8 mt-3 md:mt-5">
        <div className="w-full md:w-[70%]">
          {data.banner && (
            <figure>
              <Image className="rounded-md mb-2" src={data.banner} style={{ height: "100%", width: "100%" }} alt={data.bannerCaption || ""} sizes="100vw" width={0} height={0} />
            </figure>
          )}
          <RenderJsonToHtml content={data.content.content} />
        </div>
        <div className="w-full md:w-[30%] border mt-10 md:mt-0 flex flex-col gap-5 items-center md:items-start justify-center md:justify-start">
          {/* <div className="relative h-[1000px]">
            <div className="h-[350px] w-[350px] border sticky top-20">ad</div>
          </div>
          <div className="h-[350px] w-[350px] border">ad</div>
          <div className="h-[350px] w-[350px] border">ad</div> */}
        </div>
      </div>
    </article>
  );
};

export default Article;
