import { prismaDB } from "@/lib/connect";

export const GET = async (req: Request) => {
  try {
    let categories = await prismaDB.category.findMany({ where: { isActive: true, isDeleted: false } });
    return Response.json({ message: "Success", data: categories }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error", error: error }, { status: 500 });
  }
};
