"use client";
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-for-editor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  FileJson2,
  ImageIcon,
  ImagesIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  SeparatorHorizontal,
  Sheet,
  Strikethrough,
  Unlink,
  WrapText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddImageForm from "./add-image-form";
import { Gallery } from "@prisma/client";
import GalleryModel from "@/components/galleryModel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icons } from "@/utils/icons";
const labelToggle = ({ value, editor }: { value: string; editor: Editor | null }) => {
  let val = Number(value);

  if (val === 1) {
    editor?.chain().focus().setHeading({ level: 1 }).run();
  } else if (val === 2) {
    editor?.chain().focus().setHeading({ level: 2 }).run();
  } else if (val === 3) {
    editor?.chain().focus().setHeading({ level: 3 }).run();
  } else if (val === 4) {
    editor?.chain().focus().setHeading({ level: 4 }).run();
  } else if (val === 5) {
    editor?.chain().focus().setHeading({ level: 5 }).run();
  } else if (val === 6) {
    editor?.chain().focus().setHeading({ level: 6 }).run();
  } else {
    editor?.chain().focus().setParagraph().run();
  }
};
const labelToggleDefault = (editor: Editor | null): string => {
  if (editor?.isActive("heading", { level: 1 })) {
    return "1";
  } else if (editor?.isActive("heading", { level: 2 })) {
    return "2";
  } else if (editor?.isActive("heading", { level: 3 })) {
    return "3";
  } else if (editor?.isActive("heading", { level: 4 })) {
    return "4";
  } else if (editor?.isActive("heading", { level: 5 })) {
    return "5";
  } else if (editor?.isActive("heading", { level: 6 })) {
    return "6";
  } else {
    return "0";
  }
};

const TipTapMenuHeader = ({ editor, gallery }: { editor: Editor | null; gallery?: Gallery[] }) => {
  const [isOpenImageModel, setIsOpenImageModel] = React.useState(false);
  const [isOpenGalleryModel, setIsOpenGalleryModel] = React.useState(false);

  const addImage = ({ url, title, alt }: { url: string; title: string; alt: string }) => {
    if (url) {
      editor
        ?.chain()
        .focus()
        .setImage({ src: url, title: title || "", alt: alt || "" })
        .run();
    }
  };

  const setLink = React.useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <div className="w-full h-full inline-flex gap-4 items-center px-1 overflow-x-auto scrollbar-hide">
      <Select defaultValue="0" value={labelToggleDefault(editor)} onValueChange={(e) => labelToggle({ value: e, editor: editor })}>
        <SelectTrigger className="w-28 min-w-28 h-7 ps-1 min-h-7">
          <SelectValue placeholder="Select Heading" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={"0"}>Normal Text</SelectItem>
            <SelectItem value={"1"}>Heading 1</SelectItem>
            <SelectItem value={"2"}>Heading 2</SelectItem>
            <SelectItem value={"3"}>Heading 3</SelectItem>
            <SelectItem value={"4"}>Heading 4</SelectItem>
            <SelectItem value={"5"}>Heading 5</SelectItem>
            <SelectItem value={"6"}>Heading 6</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        title="Bold Text"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <Bold size={14} />
      </Button>
      <Button
        title="Italic Text"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <Italic size={14} />
      </Button>
      <Button
        title="Strike Text"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <Strikethrough size={14} />
      </Button>
      <Button
        title="Left align"
        onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        disabled={!editor.can().chain().focus().setTextAlign("left").run()}
        variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <AlignLeft size={14} />
      </Button>
      <Button
        title="Center align"
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        disabled={!editor.can().chain().focus().setTextAlign("center").run()}
        variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <AlignCenter size={14} />
      </Button>
      <Button
        title="Right align"
        onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        disabled={!editor.can().chain().focus().setTextAlign("right").run()}
        variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <AlignRight size={14} />
      </Button>
      <Button title="Line Break" onClick={() => editor?.chain().focus().setHardBreak().run()} variant={"ghost"} size={"icon"} className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]">
        <WrapText size={14} />
      </Button>
      <Button title="Horizontal Line" onClick={() => editor?.chain().focus().setHorizontalRule().run()} size={"icon"} className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]" variant={"ghost"}>
        <SeparatorHorizontal size={14} />
      </Button>
      <Button
        title="Ordered List"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <ListOrdered size={14} />
      </Button>
      <Button
        title="Bullet List"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <List size={14} />
      </Button>
      <Button title="Link Add" onClick={setLink} variant={editor.isActive("link") ? "default" : "ghost"} size={"icon"} className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]">
        <Link2 size={14} className="-rotate-45" />
      </Button>
      <Button
        title="Link Remove"
        variant={"ghost"}
        onClick={() => editor?.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <Unlink size={14} />
      </Button>
      <Button
        title="Blockquote"
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive("blockquote") ? "default" : "ghost"}
        size={"icon"}
        className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]"
      >
        <Quote size={14} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild title="Table">
          <Button title="Table" variant={editor.isActive("blockquote") ? "default" : "ghost"} size={"icon"} className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]">
            <Sheet size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="grid grid-cols-4 gap-1">
            <Button
              title="Add Table"
              onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              size={"icon"}
              className="h-7 w-7 rounded-sm"
              variant={"ghost"}
            >
              <Icons.tableAdd className="h-4 w-4" />
            </Button>
            <Button title="Delete Table" onClick={() => editor?.chain().focus().deleteTable().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableRemove className="h-4 w-4" />
            </Button>
            <Button title="Add Column Before" onClick={() => editor?.chain().focus().addColumnBefore().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableColumnPlus className="h-4 w-4 rotate-180" />
            </Button>
            <Button title="Add Column After" onClick={() => editor?.chain().focus().addColumnAfter().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableColumnPlus className="h-4 w-4" />
            </Button>
            <Button title="Add Row Before" onClick={() => editor?.chain().focus().addRowBefore().run()} size={"icon"} className="h-7 w-7 rounded-sm " variant={"ghost"}>
              <Icons.tableRowPlus className="h-4 w-4" />
            </Button>
            <Button title="Add Row After" onClick={() => editor?.chain().focus().addRowAfter().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableRowPlus className="h-4 w-4 rotate-180" />
            </Button>
            <Button title="Remove Column" onClick={() => editor?.chain().focus().deleteColumn().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableColumnRemove className="h-4 w-4" />
            </Button>
            <Button title="Remove Row" onClick={() => editor?.chain().focus().deleteRow().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableRowRemove className="h-4 w-4" />
            </Button>
            <Button title="Merge/Split Cell" onClick={() => editor?.chain().focus().mergeOrSplit().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableMerge className="h-4 w-4" />
            </Button>
            <Button title="Toggle Header Row" onClick={() => editor?.chain().focus().toggleHeaderRow().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableHeaderRow className="h-4 w-4" />
            </Button>
            <Button title="Toggle Header Column" onClick={() => editor?.chain().focus().toggleHeaderColumn().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableHeaderColumn className="h-4 w-4" />
            </Button>
            <Button title="Toggle Header Cell" onClick={() => editor?.chain().focus().toggleHeaderCell().run()} size={"icon"} className="h-7 w-7 rounded-sm" variant={"ghost"}>
              <Icons.tableCell className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button title="Json" onClick={() => console.log(editor?.getJSON())} size={"icon"} className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]" variant={"ghost"}>
        <FileJson2 size={14} />
      </Button>
      <Dialog open={isOpenImageModel} onOpenChange={setIsOpenImageModel}>
        <DialogTrigger asChild title="Add Image">
          <Button title="Add Image" variant={"ghost"} size={"icon"} className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]">
            <ImageIcon size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] top-[40%]">
          <DialogHeader>
            <DialogTitle>Image URL</DialogTitle>
          </DialogHeader>
          <AddImageForm close={setIsOpenImageModel} addImage={addImage} />
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenGalleryModel} onOpenChange={setIsOpenGalleryModel}>
        <DialogTrigger asChild title="Gallery">
          <Button title="Gallery" variant={"ghost"} size={"icon"} className="h-7 w-7 min-h-7 min-w-7  rounded-sm my-[1px]">
            <ImagesIcon size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] top-[40%]">
          <DialogHeader>
            <DialogTitle>Gallery</DialogTitle>
          </DialogHeader>
          <div className="max-h-[300px] md:max-h-[600px] overflow-y-auto">
            <GalleryModel gallery={gallery} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TipTapMenuHeader;
