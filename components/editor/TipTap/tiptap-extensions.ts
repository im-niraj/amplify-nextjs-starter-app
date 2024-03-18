import React from "react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { Image } from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
export const TipTapExtensions = [
  Placeholder.configure({
    placeholder: "Write something...",
  }),
  StarterKit.configure({
    codeBlock: false,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Image,
];
