import React from "react";
import { JSONContent } from "@tiptap/react";
import ParagraphParse from "./paragraph";
import { v4 } from "uuid";

type Props = {};

const BlockquoteParse = ({ data }: { data: JSONContent }) => {
  const renderData = (data: JSONContent) => {
    let arr = [];
    if (data.content) {
      for (let x of data.content) {
        if (x.content) {
          arr.push(ParagraphParse({ data: x }));
        }
      }
    }
    return React.createElement("blockquote", { className: "p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800", key: v4() }, arr);
  };
  return renderData(data);
};

export default BlockquoteParse;
