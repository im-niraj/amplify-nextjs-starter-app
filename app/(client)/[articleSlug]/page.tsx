import Article from "@/components/client/article";
import { Card } from "@/types/card";
import React from "react";

type Props = {
  params: { articleSlug: string };
};

const getArticleBySlug = async (slug: string) => {
  let res = await fetch(`${process.env.API_URI}/api/article/slug/${slug}`, { next: { revalidate: 60 } });
  if (res.ok) {
    let response = await res.json();
    return response.data;
  }
  return null;
};

const ArticlePage = async (props: Props) => {
  let data = await getArticleBySlug(props.params.articleSlug);
  if (data) {
    return (
      <div className="mt-2">
        <Article data={data as Card} />
      </div>
    );
  }
  return (
    <div className="mt-2">
      <p>Page not found</p>
    </div>
  );
};

export default ArticlePage;
