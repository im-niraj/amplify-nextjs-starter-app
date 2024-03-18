import { JSONContent } from "@tiptap/react";
import React from "react";
import { v4 } from "uuid";
import ParagraphParse from "./paragraph";

const TableParse = ({ data }: { data: JSONContent }) => {
  let tableBodyRows = [];
  let tableHeaderRows = [];
  if (data.content) {
    for (let row of data.content) {
      if (row.type === "tableRow") {
        let tableBodyCells = [];
        let tableHeaderCells = [];
        if (row.content) {
          for (let column of row.content) {
            if (column.type === "tableCell") {
              for (let y of column.content || []) {
                let cell = React.createElement(
                  "td",
                  { key: v4(), colSpan: column.attrs?.colspan ?? 1, rowSpan: column.attrs?.rowspan ?? 1, className: "px-6 py-4" },
                  y.content ? ParagraphParse({ data: y }) : null
                );
                tableBodyCells.push(cell);
              }
            } else if (column.type === "tableHeader") {
              for (let y of column.content || []) {
                let cell = React.createElement("th", { key: v4(), className: "px-6 py-4" }, y.content ? ParagraphParse({ data: y }) : null);
                tableHeaderCells.push(cell);
              }
            }
          }
        }
        if (tableHeaderCells.length > 0) {
          let tableRow = React.createElement("tr", { key: v4() }, tableHeaderCells);
          tableHeaderRows.push(tableRow);
        }
        let tableRow = React.createElement("tr", { key: v4(), className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700" }, tableBodyCells);
        tableBodyRows.push(tableRow);
      }
    }
  }
  let tableHead = React.createElement("thead", { key: v4(), className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" }, tableHeaderRows);
  let tableBody = React.createElement("tbody", { key: v4() }, tableBodyRows);
  return React.createElement("table", { key: v4(), className: `w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400` }, tableHead, tableBody);
};

export default TableParse;
