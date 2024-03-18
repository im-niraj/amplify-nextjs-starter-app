import { prismaDB } from "@/lib/connect";
import { roleValidate } from "@/lib/roleValidate";
import { Methods } from "@/types/method";
import { revalidatePath } from "next/cache";

export const GET = async (req: Request) => {
  try {
    let isLoggedIn = await roleValidate({ apiPath: "/api/article", method: Methods.POST });
    if (!isLoggedIn.status) {
      return Response.json({ message: "You don't have permission" });
    }
    let article = await prismaDB.article.findMany({ where: { isDeleted: false }, orderBy: { createdAt: "desc" } });
    return Response.json({ message: "success", data: article }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    let isLoggedIn = await roleValidate({ apiPath: "/api/article", method: Methods.POST });
    if (!isLoggedIn.status) {
      return Response.json({ message: "You don't have permission" });
    }
    let { title, description, banner, slug, content, categoryIds, tagIds, metaTitle, metaDescription, metaKeyword, ogImage, ogPageUrl, twitterLargeImage } = await req.json();
    let existsSlug = await prismaDB.article.findUnique({ where: { slug } });
    if (existsSlug) {
      return Response.json({ message: "Slug already exists" });
    }
    let article = await prismaDB.article.create({
      data: {
        title,
        slug,
        description,
        banner,
        published: false,
        content,
        createdById: isLoggedIn.loggedInUserId as string,
      },
    });
    if (!article) {
      return Response.json({ message: "error in create article" }, { status: 400 });
    }
    const articleCategoryData = categoryIds.map((categoryId: string) => ({
      categoryId,
      articleId: article.id,
    }));
    let articleCategory = await prismaDB.articleCategory.createMany({
      data: articleCategoryData,
    });
    if (!articleCategory) {
      return Response.json({ message: "error in article category" }, { status: 400 });
    }
    if (tagIds && tagIds.length > 0) {
      let articleTagData = tagIds.map((tagId: string) => ({
        tagId,
        articleId: article.id,
      }));
      let articleTag = await prismaDB.articleTag.createMany({
        data: articleTagData,
      });
    }

    let seoData = {
      metaTitle: metaTitle as string,
      metaDescription: metaDescription as string,
      metaKeyword: metaKeyword as string,
      ogImage: ogImage as string,
      ogPageUrl: ogPageUrl as string,
      twitterLargeImage: twitterLargeImage as string,
      twitterImage: ogImage as string,
      articleId: article.id as string,
    };
    let seo = await prismaDB.seoModel.create({ data: seoData });
    if (!seo) {
      return Response.json({ message: "error,seo not added" }, { status: 400 });
    }
    // revalidatePath("/(client)", "page");
    // revalidatePath("/(client)/[articleSlug]", "page");
    revalidatePath("/", "layout");
    return Response.json({ message: "success", article }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
};
