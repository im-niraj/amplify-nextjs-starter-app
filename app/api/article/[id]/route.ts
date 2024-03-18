import { prismaDB } from "@/lib/connect";
import { roleValidate } from "@/lib/roleValidate";
import { Methods } from "@/types/method";
import { revalidatePath } from "next/cache";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    let isLoggedIn = await roleValidate({ apiPath: "/api/article/[id]", method: Methods.GET });
    if (!isLoggedIn.status) {
      return Response.json({ message: "You don't have permission" });
    }
    let { id } = params;
    let article = await prismaDB.article.findUnique({ where: { id, isDeleted: false }, include: { SeoModel: true } });
    return Response.json({ message: "success", data: article }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    let isLoggedIn = await roleValidate({ apiPath: "/api/article/[id]", method: Methods.GET });
    if (!isLoggedIn.status) {
      return Response.json({ message: "You don't have permission" });
    }
    let { id } = params;
    let article = await prismaDB.article.update({ where: { id, isDeleted: false }, data: { isDeleted: true } });
    // revalidatePath("/(client)",'page');
    // revalidatePath("/(client)/[articleSlug]", "page");
    revalidatePath("/", "layout");
    return Response.json({ message: "success", data: article }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
};
