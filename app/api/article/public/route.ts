import { prismaDB } from "@/lib/connect";

export const GET = async (req: Request) => {
  try {
    let articles = await prismaDB.article.findMany({
      where: { published: true, isDeleted: false },
      include: { articleCategory: { include: { categoryModel: true } }, createdBy: { include: { Authentication: true } } },
      orderBy: { createdAt: "desc" },
    });

    let articleList = [];
    for (let article of articles) {
      let categoryList = article?.articleCategory?.map((el) => {
        return { id: el.categoryModel.id, href: el.categoryModel.href, label: el.categoryModel.label, isActive: el.categoryModel.isActive };
      });
      let data = {
        id: article?.id,
        slug: article?.slug,
        title: article?.title,
        banner: article?.banner,
        description: article?.description,
        content: article?.content,
        categoryList,
        tagList: [],
        author: {
          id: article.createdBy?.id,
          firstName: article.createdBy?.firstName,
          lastName: article.createdBy?.lastName,
          salutation: article.createdBy?.salutation,
          image: article.createdBy?.image,
          designation: article.createdBy?.designation,
          gender: article.createdBy?.gender,
          email: article.createdBy?.Authentication.email,
          article_createdAt: article?.createdAt,
        },
      };
      articleList.push(data);
    }
    return Response.json({ message: "success", data: articleList }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
};
