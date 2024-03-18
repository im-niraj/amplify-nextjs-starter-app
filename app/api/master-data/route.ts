import { prismaDB } from "@/lib/connect";
import { roleValidate } from "@/lib/roleValidate";
import { Methods } from "@/types/method";

export const GET = async () => {
  try {
    let isRoleExists = await roleValidate({ apiPath: "/api/master-data", method: Methods.GET });
    if (!isRoleExists.status) {
      return Response.json({ message: "You don't have permission" }, { status: isRoleExists.statusCode });
    }
    let categories = await prismaDB.category.findMany({ where: { isDeleted: false } });
    let gallery = await prismaDB.gallery.findMany({ where: { isDeleted: false } });
    let tags = await prismaDB.tag.findMany({ where: { isDeleted: false } });
    return Response.json({ message: "Success", data: { category: categories, gallery, tag: tags } }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server Error", error }, { status: 500 });
  }
};
