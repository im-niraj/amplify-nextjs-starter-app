import React from "react";
import HeadingParse from "./heading";
import ParagraphParse from "./paragraph";
import OrderListParse from "./ordered-list";
import UnOrderListParse from "./un-ordered-list";
import BlockquoteParse from "./blockquote";
import HorizontalRule from "./horizontal-rule";
import ImageComponent from "./image";
import { v4 } from "uuid";
import { JSONContent } from "@tiptap/react";
import TableParse from "./table";

const RenderJsonToHtml = ({ content }: { content: JSONContent[] }) => {
  const demo = (obj: JSONContent) => {
    switch (obj.type) {
      case "heading":
        return <HeadingParse data={obj} />;
      case "paragraph":
        return <ParagraphParse data={obj} />;
      case "orderedList":
        return <OrderListParse data={obj} />;
      case "bulletList":
        return <UnOrderListParse data={obj} />;
      case "blockquote":
        return <BlockquoteParse data={obj} />;
      case "horizontalRule":
        return <HorizontalRule />;
      case "image":
        return <ImageComponent data={obj} />;
      case "table":
        return <TableParse data={obj} />;
      default:
        return <p className="line-through font-bold">case not matched</p>;
    }
  };

  return (
    <>
      {content.map((el) => (
        <React.Fragment key={v4()}>{demo(el)}</React.Fragment>
      ))}
    </>
  );
};

export default RenderJsonToHtml;
