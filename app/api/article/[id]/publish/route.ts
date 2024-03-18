import { prismaDB } from "@/lib/connect";
import { roleValidate } from "@/lib/roleValidate";
import { Methods } from "@/types/method";
import { revalidatePath } from "next/cache";

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    let isLoggedIn = await roleValidate({ apiPath: "/api/article/[id]/publish", method: Methods.PATCH });
    if (!isLoggedIn.status) {
      return Response.json({ message: "You don't have permission" }, { status: 401 });
    }
    let { id } = params;
    let articleExists = await prismaDB.article.findUnique({ where: { id, isDeleted: false } });
    if (!articleExists) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }
    let article = await prismaDB.article.update({ where: { id, isDeleted: false }, data: { published: !articleExists.published } });
    // revalidatePath("/(client)", "page");
    // revalidatePath("/(client)/[articleSlug]", "page");
    revalidatePath("/", "layout");
    return Response.json({ message: "success", data: article }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
};
