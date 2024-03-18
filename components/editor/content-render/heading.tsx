import React from "react";
import { v4 } from "uuid";
import { bold, italic, link, markComponent, strike } from "./mark-component";
import { JSONContent } from "@tiptap/react";
import { cn } from "@/lib/utils";

const HeadingParse = ({ data }: { data: JSONContent }) => {
  let headingStyle = "";
  if (data.attrs?.level === 1) {
    headingStyle = "text-4xl font-semibold";
  }
  if (data.attrs?.level === 2) {
    headingStyle = "text-2xl font-semibold";
  }
  if (data.attrs?.level === 3) {
    headingStyle = "text-xl font-semibold";
  }
  if (data.attrs?.level === 4) {
    headingStyle = "text-lg font-semibold";
  }
  let arr = [];
  if (data.content) {
    for (let element of data.content) {
      arr.push(markComponent(element));
    }
  }
  return React.createElement(`h${data.attrs?.level}`, { key: v4(), className: cn("py-1", headingStyle) }, arr);
};

export default HeadingParse;
