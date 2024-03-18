import { CategoryType } from "@/types/category";
import { prismaDB } from "@/lib/connect";

export const GET = async (req: Request) => {
    try {
        let categories = await prismaDB.category.findMany({ where: { isDeleted: false } });
        return Response.json({ message: "Success", data: categories }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Error", error: error }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        let { href, label, isActive }: Omit<CategoryType, "id"> = await req.json();
        if (!href || !label) {
            return Response.json({ message: "All fields required" }, { status: 400 });
        }
        let category = await prismaDB.category.findUnique({ where: { label } });
        if (category) {
            return Response.json({ message: "Category already created" }, { status: 400 });
        }
        category = await prismaDB.category.create({ data: { label, isActive, href } });
        if (!category) {
            return Response.json({ message: "Error in creating category" }, { status: 400 });
        }
        return Response.json({ message: "Category successfully created", data: category }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Error", error: error }, { status: 500 });
    }
};
