import { JSONContent } from "@tiptap/react";
import React from "react";

type Props = {};
type AttrsOfLinkType = {
  href: string;
  rel: string;
  target: string;
};
const textStyleParse = (content: JSONContent[]) => {
  const marksObj = {
    "link-bold-italic-strike": (text: string, href: string, target: string, rel: string) =>
      React.createElement(
        "a",
        { className: "text-blue-400 text-underline", href, target: target, rel },
        React.createElement("strong", null, React.createElement("i", null, React.createElement("s", null, text)))
      ),
    "link-bold-italic": (text: string, href: string, target: string, rel: string) =>
      React.createElement("a", { className: "text-blue-400 text-underline", href, target: target, rel }, React.createElement("strong", null, React.createElement("i", null, text))),
    "link-bold-strike": (text: string, href: string, target: string, rel: string) =>
      React.createElement("a", { className: "text-blue-400 text-underline", href, target: target, rel }, React.createElement("strong", null, React.createElement("s", null, text))),
    "link-italic-strike": (text: string, href: string, target: string, rel: string) =>
      React.createElement("a", { className: "text-blue-400 text-underline", href, target: target, rel }, React.createElement("i", null, React.createElement("s", null, text))),
    "link-italic": (text: string, href: string, target: string, rel: string) =>
      React.createElement("a", { className: "text-blue-400 text-underline", href, target: target, rel }, React.createElement("i", null, text)),
    "link-bold": (text: string, href: string, target: string, rel: string) =>
      React.createElement("a", { className: "text-blue-400 text-underline", href, target: target, rel }, React.createElement("strong", null, text)),
    "link-strike": (text: string, href: string, target: string, rel: string) =>
      React.createElement("a", { className: "text-blue-400 text-underline", href, target: target, rel }, React.createElement("s", null, text)),
    "bold-italic-strike": (text: string) => React.createElement("strong", null, React.createElement("i", null, React.createElement("s", null, text))),
    "bold-strike": (text: string) => React.createElement("strong", null, React.createElement("s", null, text)),
    "bold-italic": (text: string) => React.createElement("strong", null, React.createElement("i", null, text)),
    "italic-strike": (text: string) => React.createElement("i", null, React.createElement("s", null, text)),
    bold: (text: string) => React.createElement("strong", null, text),
    link: (text: string, href: string, target: string, rel: string) => React.createElement("a", { className: "text-blue-400 text-underline", href, target: target, rel }, text),
    italic: (text: string) => React.createElement("i", null, text),
    strike: (text: string) => React.createElement("s", null, text),
    code: (text: string) => React.createElement("code", { className: "bg-yellow-300 px-2 py-[2px] rounded-lg" }, text),
  };
  let arr = [];
  for (let x of content) {
    if (x.type === "text") {
      if (x.marks) {
        let bold = x.marks.some((el) => el.type === "bold");
        let italic = x.marks.some((el) => el.type === "italic");
        let strike = x.marks.some((el) => el.type === "strike");
        let link = x.marks.some((el) => el.type === "link");
        let attrsOfLink: AttrsOfLinkType | undefined = undefined;
        if (link) {
          let founded = x.marks.find((el) => el.type === "link");
          if (founded !== undefined && founded.attrs) {
            attrsOfLink = founded.attrs as AttrsOfLinkType;
          }
        }
        let code = x.marks.some((el) => el.type === "code");
        if (x.text) {
          if (bold && link && italic && strike && attrsOfLink) {
            arr.push(marksObj["link-bold-italic-strike"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (bold && link && italic && attrsOfLink) {
            arr.push(marksObj["link-bold-italic"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (bold && link && strike && attrsOfLink) {
            arr.push(marksObj["link-bold-strike"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (italic && link && strike && attrsOfLink) {
            arr.push(marksObj["link-italic-strike"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (italic && link && attrsOfLink) {
            arr.push(marksObj["link-italic"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (bold && link && attrsOfLink) {
            arr.push(marksObj["link-bold"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (strike && link && attrsOfLink) {
            arr.push(marksObj["link-strike"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (bold && italic && strike) {
            arr.push(marksObj["bold-italic-strike"](x.text));
          } else if (bold && strike) {
            arr.push(marksObj["bold-strike"](x.text));
          } else if (bold && italic) {
            arr.push(marksObj["bold-italic"](x.text));
          } else if (italic && strike) {
            arr.push(marksObj["italic-strike"](x.text));
          } else if (bold) {
            arr.push(marksObj["bold"](x.text));
          } else if (italic) {
            arr.push(marksObj["italic"](x.text));
          } else if (strike) {
            arr.push(marksObj["strike"](x.text));
          } else if (link && attrsOfLink) {
            arr.push(marksObj["link"](x.text, attrsOfLink.href, attrsOfLink.target, attrsOfLink.rel));
          } else if (code) {
            arr.push(marksObj["code"](x.text));
          }
        }
      } else {
        arr.push(x.text);
      }
    } else if (x.type === "hardBreak") {
      arr.push(React.createElement("br"));
    }
  }
  return arr;
};

export default textStyleParse;
