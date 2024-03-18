import React from "react";
import { JSONContent } from "@tiptap/react";
import ParagraphParse from "./paragraph";
import { v4 } from "uuid";

const OrderListParse = ({ data }: { data: JSONContent }) => {
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
    return React.createElement("ol", { className: "my-2 ps-7 list-decimal",key: v4()  }, arr);
  };
  return renderData(data);
};

export default OrderListParse;
