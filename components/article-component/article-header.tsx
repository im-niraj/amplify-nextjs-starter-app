import { Icons } from "@/utils/icons";
import Link from "next/link";
import React from "react";
import AuthorCard from "./author-card";
import TagChip from "../client/tag";
import { TagType } from "@/types/tags";
import { Author } from "@/types/author";

type Props = {
  tagList: TagType[];
  slug: string;
  title: string;
  banner?: string;
  description: string;
  author: Author;
};

const ArticleHeader = ({ tagList, slug, title, banner, description, author }: Props) => {
  return (
    <header>
      <div className="flex gap-2">
        {tagList.map((el) => (
          <TagChip key={el.id} label={el.label} href={el.href} />
        ))}
      </div>
      <h1 className="mt-1 text-xl md:text-3xl font-bold text-gray-900 dark:text-gray-300 group-hover:text-gray-600">
        <Link href={`/${slug}`}>{title}</Link>
      </h1>
      <h2 className=" text-gray-600 py-2">{description}</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <AuthorCard className="mt-5" author={author} onlyName />
        <div className="inline-flex items-center gap-3 rounded-md bg-teal-50 md:bg-transparent mt-2 py-1 ps-2 md:ps-0 md:mt-0 md:py-0">
          <div className="inline-flex items-center">
            <Icons.share className="h-5" />
            <span className="text-xs">Share</span>
          </div>
          <Link href="https://www.facebook.com/sharer/sharer.php?u=#url" title="Share on Facebook">
            <Icons.facebookColor className="h-6 w-6" />
          </Link>
          <Link href={"#"} title="Share on Twitter">
            <Icons.twitter className="h-5 w-5" />
          </Link>
          <Link href={"#"} title="Share on Whatsapp">
            <Icons.whatsapp className="h-7 w-7" />
          </Link>
          <Link href={"#"} title="Share on Telegram">
            <Icons.telegramColor className="h-5 w-5" />
          </Link>
          <Link href={"#"} title="Copy link" className="rounded-full bg-teal-200 p-1">
            <Icons.link className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
