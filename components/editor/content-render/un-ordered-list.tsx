import React from "react";
import { JSONContent } from "@tiptap/react";
import ParagraphParse from "./paragraph";
import { v4 } from "uuid";

type Props = {};

const UnOrderListParse = ({ data }: { data: JSONContent }) => {
  const renderData = (data: JSONContent) => {
    let arr = [];
    if (data.content) {
      for (let x of data.content) {
        if (x.type === "listItem" && x.content) {
          for (let item of x.content) {
            arr.push(React.createElement("li", { key: v4() }, ParagraphParse({ data: item })));
          }
        }
      }
    }
    return React.createElement("ul", { className: "my-2 ps-6 list-disc", key: v4() }, arr);
  };
  return renderData(data);
};

export default UnOrderListParse;
