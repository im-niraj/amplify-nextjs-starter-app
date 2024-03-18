import { JSONContent } from "@tiptap/react";
import React from "react";
import { v4 } from "uuid";

export const bold = (text: string) => React.createElement("strong", null, text);
export const italic = (text: string) => React.createElement("i", null, text);
export const strike = (text: string) => React.createElement("s", null, text);
export const link = (text: string, href: string, target: string, rel: string) => React.createElement("a", { href, target: target, rel, key: v4() }, text);
export const markComponent = (content: JSONContent) => {
  let arr = [];
  if (content.type === "text") {
    let text = content.text;
    if (content.marks && text) {
      for (let mark of content.marks) {
        let formattedText: React.ReactNode = text;
        if (mark.type === "bold") formattedText = bold(formattedText as string);
        if (mark.type === "italic") formattedText = italic(formattedText as string);
        if (mark.type === "strike") formattedText = strike(formattedText as string);
        if (mark.type === "link") formattedText = link(formattedText as string, mark.attrs?.href ?? "", mark.attrs?.target ?? "", mark.attrs?.rel ?? "");
        text = formattedText as string;
      }
    }
    arr.push(text);
  } else if (content.type === "hardBreak") {
    arr.push(React.createElement("br", { key: v4() }));
  }
  return arr;
};
