"use client";
import React, { useState } from "react";
import "./tiptap-style.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import TipTapMenuHeader from "./menu-header";
import { TipTapExtensions } from "./tiptap-extensions";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { OptionType } from "@/types/options";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import slugify from "slugify";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePreviewStore } from "@/utils/store";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImageUp } from "lucide-react";
import HrLabel from "@/components/ui/horizontal-with-label";
type ArticleType = {
  title: string;
  slug: string;
  description: string;
  banner: string;
  categoryIds: OptionType[];
  tags: OptionType[];
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  ogImage: string;
  ogPageUrl: string;
  twitterLargeImage: string;
};

const Tiptap = () => {
  const { data, isLoading } = useSWR("/api/master-data", fetcher);
  const { push } = useRouter();
  const { add, previewData, clearPreviewData } = usePreviewStore();
  const [saveLoading, setSaveLoading] = useState(false);
  let categoryList = data?.data?.category.map((el: any) => {
    return { value: el.id, label: el.label };
  });
  let tagList = data?.data?.tag.map((el: any) => {
    return { value: el.id, label: el.label };
  });
  let galleryList = data?.data?.gallery;
  const [articleHead, setArticleHead] = useState<ArticleType>({
    title: "",
    slug: "",
    description: "",
    banner: "",
    categoryIds: [],
    tags: [],
    metaTitle: "",
    metaDescription: "",
    metaKeyword: "",
    ogImage: "",
    ogPageUrl: "",
    twitterLargeImage: "",
  });
  const editor = useEditor({
    extensions: TipTapExtensions,
    onUpdate({ editor }) {
      add(editor.getJSON());
    },
    content: previewData,
  });
  const divRef = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);
  const [divWidth, setDivWidth] = React.useState(0);
  const onScroll = React.useCallback(() => {
    const { scrollY } = window;
    setScrollY(scrollY);
  }, []);

  const observeDiv = () => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDivWidth(entry.contentRect.width);
      }
    });
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      observer.disconnect();
    };
  };
  const multiSelectCategoryHandler = (values: any) => {
    setArticleHead((old) => {
      return {
        ...old,
        categoryIds: values,
      };
    });
  };
  const multiSelectTagHandler = (values: any) => {
    setArticleHead((old) => {
      return {
        ...old,
        tags: values,
      };
    });
  };
  const saveHandler = async () => {
    if (articleHead.banner === "" || articleHead.categoryIds.length === 0 || articleHead.title === "") {
      toast.error("All fields are required");
    } else {
      let articleDataObj = {
        title: articleHead.title,
        slug: slugify(articleHead.slug, { remove: /[*+~.()'"!:,@]/g, lower: true }),
        banner: articleHead.banner,
        content: editor?.getJSON(),
        description: articleHead.description,
        categoryIds: articleHead.categoryIds.map((el) => {
          return el.value;
        }),
        tagIds: articleHead.tags.map((el) => {
          return el.value;
        }),
        metaTitle: articleHead.metaTitle,
        metaDescription: articleHead.metaDescription,
        metaKeyword: articleHead.metaKeyword,
        ogImage: articleHead.ogImage,
        ogPageUrl: articleHead.ogPageUrl,
        twitterLargeImage: articleHead.twitterLargeImage,
      };
      setSaveLoading(true);
      let res = await fetch("/api/article", {
        method: "POST",
        body: JSON.stringify(articleDataObj),
      });
      let response = await res.json();
      setSaveLoading(false);
      if (res.ok) {
        toast.success(response.message);
        clearPreviewData();
        editor?.commands.clearNodes();
      } else {
        toast.error(response.message);
      }
    }
  };
  React.useEffect(() => {
    observeDiv();
    return observeDiv();
  }, [divRef]);
  React.useEffect(() => {
    window.addEventListener("scroll", onScroll, false);
    return () => {
      window.removeEventListener("scroll", onScroll, false);
    };
  }, [onScroll]);

  return (
    <div className="grid grid-cols-3">
      <div className="relative col-span-2 h-[calc(100vh_-_80px)] overflow-y-auto scrollbar-hide pr-2" ref={divRef} onClick={() => editor?.view.dom.focus()}>
        <div className={`border sticky z-10 top-0 w-full overflow-hidden scrollbar-hide bg-white dark:bg-slate-900 h-8 px-2`} style={{ width: `${divWidth}px` }}>
          <TipTapMenuHeader editor={editor} gallery={galleryList} />
        </div>
        <EditorContent editor={editor} className=" mt-0" />
      </div>
      <div className="border">
        <div className="border-b p-2 shadow-md">
          <Button disabled={saveLoading} className="bg-blue-700" onClick={saveHandler}>
            {saveLoading ? "Please wait..." : "Save"}
          </Button>
        </div>

        <div className=" h-[calc(100vh_-_150px)] mt-2 overflow-y-auto  scrollbar-hide p-2">
          <div className="mb-5">
            <div className="h-[250px] border border-dashed flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-950">
              {articleHead.banner !== "" ? (
                <Image src={articleHead.banner} sizes="100vw" height={0} width={0} alt="hindinews9.com" className="h-fit max-h-full w-fit" />
              ) : (
                <>
                  <ImageUp className="h-10 w-10" />
                  <p className="mt-2">Use a valid image url</p>
                </>
              )}
            </div>
            <input
              onChange={(e) =>
                setArticleHead((old) => {
                  return { ...old, banner: e.target.value };
                })
              }
              placeholder="Article banner url"
              type="text"
              className="outline-none focus:ring-0 p-2 w-full text-xs border border-t-0 border-dashed"
            />
          </div>
          <div className="">
            <div className="space-y-3">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, title: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, slug: e.target.value };
                    })
                  }
                />
                <p className="text-xs text-gray-500 py-0 ps-2">{slugify(articleHead.slug, { remove: /[*+~.()'"!:,@]/g, lower: true })}</p>
              </div>
              <div>
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, description: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="banner">Category</Label>
                <MultiSelect options={categoryList} onChange={multiSelectCategoryHandler} selected={articleHead.categoryIds} />
              </div>
              <div>
                <Label htmlFor="banner">Tag</Label>
                <MultiSelect options={tagList} onChange={multiSelectTagHandler} selected={articleHead.tags} />
              </div>
              <HrLabel label="SEO" />
              <div>
                <Label>Meta Description</Label>
                <Textarea
                  rows={5}
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, metaDescription: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Label>Meta keywords (,) comma separated</Label>
                <Textarea
                  rows={5}
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, metaKeyword: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Label>OG meta title</Label>
                <Input
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, metaTitle: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Label>OG meta Image url</Label>
                <Input
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, ogImage: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Label>Twitter Large Image url</Label>
                <Input
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, twitterLargeImage: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Label>OG meta page url</Label>
                <Input
                  onChange={(e) =>
                    setArticleHead((old) => {
                      return { ...old, ogPageUrl: e.target.value };
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
