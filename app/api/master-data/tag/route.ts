import { TagType } from "@/types/tags";
import { prismaDB } from "@/lib/connect";

export const GET = async (req: Request) => {
    try {
        let tags = await prismaDB.tag.findMany({ where: { isDeleted: false } });
        return Response.json({ message: "Success", data: tags }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Error", error: error }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        let { href, label, isActive }: Omit<TagType, "id"> = await req.json();
        if (!href || !label) {
            return Response.json({ message: "All fields required" }, { status: 400 });
        }
        let tag = await prismaDB.tag.findUnique({ where: { label } });
        if (tag) {
            return Response.json({ message: "Tag already created" }, { status: 400 });
        }
        tag = await prismaDB.tag.create({ data: { label, isActive, href } });
        if (!tag) {
            return Response.json({ message: "Error in creating tag" }, { status: 400 });
        }
        return Response.json({ message: "Tag successfully created", data: tag }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Error", error: error }, { status: 500 });
    }
};
