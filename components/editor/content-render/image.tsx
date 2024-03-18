import { JSONContent } from "@tiptap/react";
import React from "react";
import { v4 } from "uuid";

const ImageComponent = ({ data }: { data: JSONContent }) => {
  if (data.attrs) {
    return React.createElement("img", { src: data.attrs.src, className: "rounded-md my-2", alt: data.attrs.alt, title: data.attrs.title, key: v4() });
  }
  return null;
};

export default ImageComponent;
