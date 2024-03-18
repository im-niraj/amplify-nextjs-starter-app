import { cn } from "@/lib/utils";
import { Author } from "@/types/author";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  author: Author;
  onlyName?: boolean;
  className?: string;
};

const AuthorCard = ({ author, onlyName, className }: Props) => {
  if (onlyName) {
    return (
      <div className={cn("flex items-center gap-x-2", className)}>
        <p className="font-semibold text-gray-900 dark:text-gray-300">
          <Link href={`/author`}>
            {author.firstName} {author.lastName ?? ""}
          </Link>
        </p>
        <div className="h-2 w-2 bg-black rounded-full"></div>
        <time dateTime={author.article_createdAt.toString()} className="text-gray-700 text-sm">
          {format(author.article_createdAt, "EE, dd MMM yyyy hh:mm aa")}
        </time>
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-x-4", className)}>
      <Image src={author.image} width={0} height={0} sizes="100vw" className="h-10 w-10 rounded-full object-cover bg-gray-50" alt="" />
      <div className="text-sm leading-6">
        <p className="font-semibold text-gray-900 dark:text-gray-300">
          <Link href={`/author`}>
            {author.firstName} {author.lastName ?? ""}
          </Link>
        </p>
        <time dateTime={author.article_createdAt.toString()} className="text-gray-700">
          {format(author.article_createdAt, "EE, dd MMM yyyy hh:mm aa")}
        </time>
      </div>
    </div>
  );
};

export default AuthorCard;
