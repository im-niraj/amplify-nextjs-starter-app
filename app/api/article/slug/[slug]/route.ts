import { prismaDB } from "@/lib/connect";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    let { slug } = params;
    let article = await prismaDB.article.findUnique({
      where: { slug, isDeleted: false, published: true },
      include: { SeoModel: true, articleCategory: { include: { categoryModel: true } }, ArticleTag: { include: { tagModel: true } } },
    });
    if (!article) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }
    let categoryList = article?.articleCategory?.map((el) => {
      return { id: el.categoryModel.id, href: el.categoryModel.href, label: el.categoryModel.label, isActive: el.categoryModel.isActive };
    });
    let tagList = article?.ArticleTag.map((el) => {
      return { id: el.tagModel.id, href: el.tagModel.href, label: el.tagModel.label, isActive: el.tagModel.isActive };
    });
    let author = await prismaDB.user.findUnique({ where: { id: article?.createdById }, include: { Authentication: true } });
    let data = {
      id: article?.id,
      slug: article?.slug,
      title: article?.title,
      banner: article?.banner,
      description: article?.description,
      content: article?.content,
      categoryList,
      tagList,
      author: {
        id: author?.id,
        firstName: author?.firstName,
        lastName: author?.lastName,
        salutation: author?.salutation,
        image: author?.image,
        designation: author?.designation,
        gender: author?.gender,
        email: author?.Authentication.email,
        article_createdAt: article?.createdAt,
      },
    };
    return Response.json({ message: "success", data }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
};
