import React from "react";
import { v4 } from "uuid";
import { markComponent } from "./mark-component";
import { JSONContent } from "@tiptap/react";

const ParagraphParse = ({ data }: { data: JSONContent }) => {
  let arr = [];
  if (data.content) {
    for (let content of data.content) {
      arr.push(markComponent(content));
    }
  }
  return React.createElement("p", { key: v4(), className: `text-${data?.attrs?.textAlign} pb-1` }, arr);
};
export default ParagraphParse;
